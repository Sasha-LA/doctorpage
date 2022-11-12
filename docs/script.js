document.addEventListener('DOMContentLoaded', () => {

    
    
    document.querySelectorAll(".nav__link").forEach(el=>{    ///nav links
        el.onclick = event=>{
            document.querySelectorAll(".nav__link").forEach(ev=>{
                ev.style.color = '#2F2F2F';                
            });
            document.querySelectorAll("section").forEach(ev=>{
                ev.classList.add('displayNone');
            });
            document.querySelector(`#${event.target.id}`).style.color = '#58C0A6';
            document.querySelector(`section.${el.dataset.page}`).classList.remove('displayNone');
        };
    });

    
    

 
    document.querySelector(".left__icon").onclick = ()=>{   ///main page icon top-left corner
        document.querySelectorAll(".nav__link").forEach(ev=>{
            ev.style.color = '#2F2F2F';                
        });    
        document.querySelectorAll("section").forEach(ev=>{
            ev.classList.add('displayNone');
            document.querySelector(`.main__page`).classList.remove('displayNone');
        });

    }

    document.querySelectorAll(".topic_title").forEach(el=>{   ///topic links on the main page
        el.onclick = event=>{
            document.querySelectorAll("section").forEach(ev=>{
                ev.classList.add('displayNone');
            });

            document.querySelector(`section.${el.dataset.page}`).classList.remove('displayNone');
            window.scrollTo(0, 0);
        };
    });


    document.querySelector(".uygulamalar__container>div").onclick = ()=>{   ///uygulamar topic on the main page
        document.querySelectorAll("section").forEach(ev=>{
            ev.classList.add('displayNone');
        });
        document.querySelector(".uygulamalar_page").classList.remove('displayNone');
    }

    

    document.querySelectorAll(".brain__disorders__btn").forEach(el=>{  ///tumbler ner to big image on the main page
        el.onclick = event=>{
            document.querySelectorAll(".brain__disorders__btn").forEach(ell=>{
                ell.src = 'img/brain_disorders/small button.png';
            });
            document.querySelector(`#${event.target.id}`).src = 'img/brain_disorders/big button.png';
        };
    });


    document.querySelectorAll(".sp_main_descr_pictures_mob_cont_btns_cont_img").forEach(el=>{
        el.onclick = event=>{
            document.querySelectorAll(".sp_main_descr_pictures_mob_cont_btns_cont_img").forEach(ell=>{
                ell.src = 'img/brain_disorders/small button.png';
            });
            document.querySelector(`#${event.target.id}`).src = 'img/brain_disorders/big button.png';
            
            if (event.target.id == "sp_main_descr_pictures_mob_cont_btns_cont_img_1"){
                let j = 1;
                for (let i = 1; i<7; i++){
                   document.getElementById(`sp_main_descr_pictures_mob_pic_img_${j}`).src = `img/seckond page/mobile/descrPic/${i}.png`;
                   j++;  
                }
            } else if (event.target.id == "sp_main_descr_pictures_mob_cont_btns_cont_img_2"){
                let j = 1;
                for (let i = 7; i<13; i++){
                   document.getElementById(`sp_main_descr_pictures_mob_pic_img_${j}`).src = `img/seckond page/mobile/descrPic/${i}.png`;
                   j++; 
                }
            } else if (event.target.id == "sp_main_descr_pictures_mob_cont_btns_cont_img_3"){
                let j = 1;
                for (let i = 13; i<19; i++){
                   document.getElementById(`sp_main_descr_pictures_mob_pic_img_${j}`).src = `img/seckond page/mobile/descrPic/${i}.png`;
                   j++; 
                }
            }

            };
        });
    let clicked = [];
    document.querySelectorAll(".uygulamalar_page_desease_title_bttn>img").forEach(el=>{  ///uygulamar page buttons on content
            el.onclick = ev=>{
                let element = document.getElementById("hide_" + ev.target.id);
                document.getElementById(clicked)
                
                if (clicked.indexOf(element) < 0){
                    document.getElementById(ev.target.id).src = "img/Uygulamalar page/arrow-up.png";
                    clicked.push(element);
                    element.style.opacity = 0;
                    element.style.transition = `opacity 1000ms`;
                        
                    element.classList.remove('displayNone');
                    setTimeout(() => {
                         element.style.opacity = 1;
                    }, 110);
                        
                    
                    
                    }else {
                        document.getElementById(ev.target.id).src = "img/Uygulamalar page/arrow-down.png";
                        element.style.transition =`opacity 1000ms`;
                        element.style.opacity = 0;
                        let ind = clicked.indexOf(element);
                        clicked.splice(ind, 1);
                        setTimeout(() => {
                            element.classList.add('displayNone');
                            
                        }, 500);

                        }
                        
                        
                    
                    
                    
                    
                
            };
               
            
        });


        //blog page

        let blogPages =  [];
        let visibleBlogPages =[]; //массив с информацией статей
        let activeBttn=1; //индекс открытой странички
        let activeBttnData =1
        let numOfPg;
        let visibleNumOfPage;
        
        
        
        $.getJSON('blog-data.json', function(data){
            //alert(data.text);
            blogPages = data.reverse();  // меняем порядок
            numOfPg = Math.ceil(blogPages.length / 10); //общее колличество 
            
            if (numOfPg <= 5){
                visibleNumOfPage = numOfPg;
            }else{
                visibleNumOfPage = 5;
            }
            let firstPageBttn = 1;

            

            let createBttns = ()=>{
                
                let remember = firstPageBttn;
                
                for (i=1; i<=visibleNumOfPage; i++){  //создаем кнопки внизу
                    let numPgDiv = document.createElement('div');
                    numPgDiv.classList.add("blog_page_pages_button"); 
                    numPgDiv.classList.add("bpb"); 
                    numPgDiv.dataset.bttn = firstPageBttn;
                    numPgDiv.dataset.bid = i;
                    numPgDiv.innerHTML = `${firstPageBttn}`;
                    let nextBttn = document.querySelector(".blog_page_pages_button_next");
                    nextBttn.before(numPgDiv);
                    firstPageBttn++;
                }
                firstPageBttn = remember;

            }
            createBttns();

            document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn"; //даем стиль начальной кнопке 1


            let vbpStart = (activeBttn-1) * 10; // индекс первой статьи на стр
            let vbpFinish = vbpStart + 9; // индекс последней статьи на стр
            
            if (blogPages.length <= 10){
                visibleBlogPages = blogPages;
            }else{
                for (i=vbpStart; i<=vbpFinish; i++){  //узнаем сколько статей и сколько будет страниц
                    visibleBlogPages.push(blogPages[i]);
                    
                    
                }
            }
    
    
            
            let createBlogs = ()=>{
                let openBlogPost =()=>{
                    
                    window.scrollTo(0, 0);
                    document.querySelector(".main__page").classList.add('displayNone');
                    
                    $.get('blogs/blog1.html', dataPage=>{
                        document.querySelector(".blog_page").classList.add('displayNone');
                        document.querySelector(".blog_post").classList.remove('displayNone');
                       document.querySelector(".blog_post").innerHTML = dataPage;

                        ;
                        document.querySelectorAll(".blog__article__moobile__button").forEach(el=>{
                            el.onclick = ()=>{
                                document.querySelector(".main__page").classList.add('displayNone');
                               
                                document.querySelector(".blog_page").classList.remove('displayNone');
                                window.scrollTo(0, 0);
                            };
                        }); 
                        document.querySelector(".blog_post_end_links_title_bttn").onclick = ()=>{
                            
                            document.querySelector(".blog_page").classList.remove('displayNone');                       
                            document.querySelector(".blog_post").classList.add("displayNone");
                            
                        };
                        
                        
                        document.querySelector(".blog_post_back").onclick = ()=>{
                            document.querySelector(".blog_page").classList.remove('displayNone');                       
                            document.querySelector(".blog_post").classList.add("displayNone");
                            
                        };

                        
                        
                        for (i=0; i<2; i++){   //create articles at the end of post
                            let blogDiv2 = document.createElement('div');
                            blogDiv2.id = visibleBlogPages[i].postNumber;
                            
                            blogDiv2.innerHTML =`
                                
                                    <div class="blog_page_page_img "><img src="${visibleBlogPages[i].postImg}" alt="postimg"></div>
                                    <div class="blog_page_page">
                                        <div class="bpp_title">
                                            <p >${visibleBlogPages[i].postDate}</p>
                                            <p class="blog_page_page_idea_pc">${visibleBlogPages[i].postIdea}</p>
                                        </div>
                                        <div class="bbp_description">
                                            ${visibleBlogPages[i].postDescription}
                                        </div>
                                        <div class="blog_page_page_idea_mobile">${visibleBlogPages[i].postIdea}</div>
                                        
                                    </div>
                                `;
                                document.querySelector(".blog_post_end_links_link").append(blogDiv2);
                                
                            blogDiv2.onclick = ()=>{
                                openBlogPost();
                                
                            }
                        }   


                        

                    });
                    //window.scrollTo(0, 0);
                    //document.querySelector(".main__page").classList.add('displayNone');
                    
                }
                for (i=0; i<visibleBlogPages.length; i++){   //create articles on the main blog page
                    let blogDiv = document.createElement('div');
                    blogDiv.id = visibleBlogPages[i].postNumber;
                    blogDiv.innerHTML =`
                        
                            <div class="blog_page_page_img "><img src="${visibleBlogPages[i].postImg}" alt="postimg"></div>
                            <div class="blog_page_page">
                                <div class="bpp_title">
                                    <p >${visibleBlogPages[i].postDate}</p>
                                    <p class="blog_page_page_idea_pc">${visibleBlogPages[i].postIdea}</p>
                                </div>
                                <div class="bbp_description">
                                    ${visibleBlogPages[i].postDescription}
                                </div>
                                <div class="blog_page_page_idea_mobile">${visibleBlogPages[i].postIdea}</div>
                                
                            </div>
                        `;
                    
                    blogDiv.onclick = ()=>{
                        
                        
                        openBlogPost();
                        
                    }
                            
                    document.querySelector(".blog_page_pages_container").append(blogDiv);

                }
                for (i=0; i<4; i++){   //create articles on the main page in the blog section
                    let blogDiv2 = document.createElement('div');
                    blogDiv2.id = visibleBlogPages[i].postNumber;
                    
                    blogDiv2.innerHTML =`
                        
                            <div class="blog_page_page_img "><img src="${visibleBlogPages[i].postImg}" alt="postimg"></div>
                            <div class="blog_page_page">
                                <div class="bpp_title">
                                    <p >${visibleBlogPages[i].postDate}</p>
                                    <p class="blog_page_page_idea_pc">${visibleBlogPages[i].postIdea}</p>
                                </div>
                                <div class="bbp_description">
                                    ${visibleBlogPages[i].postDescription}
                                </div>
                                <div class="blog_page_page_idea_mobile">${visibleBlogPages[i].postIdea}</div>
                                
                            </div>
                        `;
                        document.querySelector(".blog__articles").append(blogDiv2);
                       
                
                    blogDiv2.onclick = ()=>{
                        openBlogPost();
                    }
                
                    
                            
                
                } 

            };
            
            createBlogs();
            




            let bttnsBlog = document.querySelector(".blog_page_pages_buttons");
            bttnsBlog.onclick = cl=>{
                    
                    
                    if (!cl.target.matches('.bpb')) return


                    let pressedBttn = cl.target.dataset.bttn;

                    
                    


                    if (pressedBttn == 0){

                       

                        if(activeBttn<=visibleNumOfPage  & activeBttn>1){
                            if(numOfPg>visibleNumOfPage & activeBttn ==2 & activeBttnData>2){
                                    
                                document.querySelectorAll(".blog_page_pages_button").forEach(el=>{
                                    el.remove();
                                });
                                firstPageBttn--;
                                activeBttnData--;
                                createBttns();
                                document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn";
                                return

                            };

                            activeBttn--;
                            
                            activeBttnData--;
                            
                            
                            

                        }


                    }else if(pressedBttn == 6 & cl.target.classList[0] == "blog_page_pages_button_next"){
                        

                        if(activeBttn<visibleNumOfPage){
                            if(numOfPg>visibleNumOfPage & activeBttn ==4 & firstPageBttn+4<numOfPg){
                                document.querySelectorAll(".blog_page_pages_button").forEach(el=>{
                                    el.remove();
                                });
                                firstPageBttn++;
                                activeBttnData++;
                                createBttns();
                                document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn";
                                return
                            }



                            activeBttn++;
                            if (activeBttnData<=numOfPg){  ///усли 4 то актив не меняется но меняется нижние кнопки
                                activeBttnData++;
                            }



                        }
                    }else{
                            
                            activeBttn = cl.target.dataset.bid;
                            //activeBttn = cl.target.innerHTML;
                            activeBttnData= cl.target.innerHTML;
                            if (activeBttn == 5 & numOfPg>visibleNumOfPage & firstPageBttn+4<numOfPg){
                                document.querySelectorAll(".blog_page_pages_button").forEach(el=>{
                                    el.remove();
                                })
                                firstPageBttn = activeBttnData -3;
                                createBttns();
                                activeBttn =4;
                                document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn";
                                

                            }else if(numOfPg>visibleNumOfPage & activeBttn ==1 & activeBttnData>1){
                                document.querySelectorAll(".blog_page_pages_button").forEach(el=>{
                                    el.remove();
                                })
                                firstPageBttn = activeBttnData - 1;
                                createBttns();
                                activeBttn = 2;
                                document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn";
                            }


                        
                    }
                    
                    document.querySelectorAll(".blog_page_pages_button").forEach(el=>{
                        el.removeAttribute('id');
                    });
                    document.querySelectorAll(".blog_page_pages_button")[activeBttn-1].id = "activeBttn";
                    
            
                    vbpStart = (activeBttnData-1) * 10; 
                    vbpFinish = vbpStart + 9;
                    
                    visibleBlogPages =[];
                    for (i=vbpStart; i<=vbpFinish; i++){  //узнаем сколько статей и сколько будет страниц
                        if(blogPages[i]){
                            visibleBlogPages.push(blogPages[i]);
                        }
                        
                    }
                    document.querySelector(".blog_page_pages_container").innerHTML = "";
                    createBlogs();
                };


                //////////////
                
                let openBlog = ()=>{
                    document.querySelectorAll("section").forEach(ev=>{
                        ev.classList.add('displayNone');
                    });
                    document.querySelector(".blog_page").classList.remove('displayNone');
                    window.scrollTo(0, 0);
                }
                let openAdress = ()=>{
                    document.querySelectorAll("section").forEach(ev=>{
                        ev.classList.add('displayNone');
                    });
                    document.querySelectorAll(".nav__link").forEach(ev=>{
                        ev.style.color = '#2F2F2F';                
                    });
                    document.querySelector("#nav__link__5").style.color = '#58C0A6';
                    document.querySelector(".address_page").classList.remove('displayNone');
                    window.scrollTo(0, 0);
                }
                
                document.querySelector(".brain__disorders__launch").onclick = openBlog;
                document.querySelector(".blog__button").onclick = openBlog;
                document.querySelector(".blog__article__moobile__button").onclick = openBlog;

                
                document.querySelector(".online_button").onclick = openAdress; ///online button
                document.querySelector(".online_button_mobile").onclick = openAdress;

            

                /////////////


            



           
    
            
            



            
            
        }); // end of ajax

        









    });


   



  
  