/*-----------공통-----------*/
// GNB
function gnbNav(){
    let layoutWrapper = document.querySelector('.layoutWrapper');
    let navCtrlBtn = document.querySelector('.navCtrlBtn');
    let navWrapper = document.querySelector('.navWrapper');

    if(layoutWrapper !== null){
        navCtrlBtn.addEventListener('click', function(){
            layoutWrapper.classList.toggle('is-active');
        });
    
        navWrapper.addEventListener('mouseenter', function(){
            layoutWrapper.classList.add('is-hover');
        });
        navWrapper.addEventListener('mouseleave', function(){
            layoutWrapper.classList.remove('is-hover');
        });
    }else{
        return;
    }
}
gnbNav();

// 우측패널
function rightPanel(){
    let rPanelList = document.querySelectorAll('.rPanel > ul > li');
    let rPanelLayer = document.querySelector('.rPanelLayer');
    let rClose = document.querySelector('.rClose');
    let contLayout = document.querySelector('.contLayout');
    let filterWrapper = document.querySelector('.filterWrapper');

    if(rPanelList !== null){
        for(let i=0; i<rPanelList.length; i++){
            rPanelList[i].addEventListener('click', function(){  
                rPanelLayer.classList.toggle('is-active');
                contLayout.classList.toggle('is-active');
                filterWrapper.classList.remove('is-active');                                       
    
                let windowWidth = window.innerWidth;
                if(windowWidth <= 1200){
                    rPanelLayer.classList.toggle('layerType');
                // }else{
                //     contLayout.classList.remove('is-active');
                }
            });
            rClose.addEventListener('click', function(){
                rPanelLayer.classList.toggle('is-active');
                contLayout.classList.remove('is-active');
                filterWrapper.classList.remove('is-active');
            });
        }  
        // 왜 여기에 있으면 적용이 안되지??
        // rClose.addEventListener('click', function(){
        //     rPanelLayer.classList.toggle('is-active');
        //     filterWrapper.classList.remove('is-active');
        // });  
    }else{
        return;
    }
}
rightPanel();

// 우측 패널 필터창
function filterLayer(){
    let filterWrapper = document.querySelector('.filterWrapper');
    let filter = document.querySelector('.rPanelLayer .filter');

    if(filterWrapper !== null){       
        filter.addEventListener('click', function(e){
            e.preventDefault();
            filterWrapper.classList.toggle('is-active');
        }); 
    }else{
        return;
    }
}
filterLayer();

// 레이어팝업(여러개ok) - overflow, 외부영역선택시 close 추가해보기, 닫기버튼 확인
function layerPop(){
    let openBtn = document.querySelectorAll(".layerOpen");
    let closeBtn = document.querySelectorAll(".layerClose");
    let layerID;
    if(openBtn !== null){
        for(let i=0; i<openBtn.length; i++){
            openBtn[i].addEventListener("click", function(){
                layerID = this.getAttribute('href');
                document.querySelector(layerID).classList.add('is-active');
            });
        }
        for(let j=0; j<closeBtn.length; j++){
            closeBtn[j].addEventListener('click', function(){
                this.parentNode.parentNode.parentNode.classList.remove('is-active');
            });
        }
    }else{
        return;
    }
}
layerPop();

// 탭메뉴(여러개 확인하기!!)
function tabMenu(){
    let tabBtn = document.querySelectorAll('.tabBtnWrap a');
    let tabCont = document.querySelectorAll('.tabContWrap > div'); 

    if(tabBtn !== null){        
        for(let i=0; i < tabBtn.length; i++){
            tabBtn[i].addEventListener('click',function(e){
                e.preventDefault();

                let tab_id = this.closest('.tabWrapper').id;
                let tabHref = e.target.getAttribute('href');    //e의 역할?????
                let tabTarget = tabHref.replace('#','');

                // for(let x=0; x < tabCont.length; x++){
                //     if (tabCont[x].closest('.tabWrapper').id == tab_id){
                //         tabCont[x].style.display='none';
                //     }
                // }
                //document.getElementById(tabTarget).style.display="block";

                for(let j=0; j < tabBtn.length; j++){
                    if (tabBtn[j].closest('.tabWrapper').id == tab_id){
                        tabBtn[j].classList.remove('is-active');
                        e.target.classList.add('is-active');
                        tabCont[j].style.display='none';   //???????? 왜 remove is-active는 안되지???? ,  ???????? 왜 i로 통일은 안되지????
                    }
                }
                document.getElementById(tabTarget).style.display="block";
            });
        }       
    }else{
        return;
    }
}
tabMenu();
/*-----------//공통-----------*/



/*-----------호출-----------*/
// SELECTBOX 일반태그 커스텀 (다른 영역 선택시 off, 체크박스 선택시 off x)
// 호출 : selDefault.onclick = selectBox();
let selDefault = document.querySelectorAll('.selDefault');   
function selectBox(){ 
    selDefault.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.optionItem');
            clickLabel(lb, optionItems);
        })
    });
    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('is-active')) {
            lb.parentNode.classList.remove('is-active');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('is-active');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        }
    }
    const handleSelect = (selDefault, item) => {
        selDefault.innerHTML = item.textContent;
        selDefault.parentNode.classList.remove('is-active');        
    }
}
//selectBox();


// 체크박스 전체선택     //??????????????? 여러개 구별하도록 수정하기
// 호출 : chkWrap.onclick = chkAll();
let chkWrap = document.querySelector('.chkWrap');
function chkAll(){
    let chkAll = document.querySelector('.chkAll');
    let chkEach = document.querySelectorAll('.chkEach');

    for(let i=0; i<chkEach.length; i++){  
        //전체 선택, 해제
        chkAll.addEventListener('click', function(){
            if(chkAll.checked == true){
                chkEach[i].checked = true;
            }else{
                /*chkEach[i].checked = false;*/ //generalMember.jsp
            }            
        });

        //개별선택시 전체 선택, 해제
        chkEach[i].addEventListener('click', function(){        
            let chked = document.querySelectorAll('.chkEach:checked');
            if(chked.length == chkEach.length){
                chkAll.checked = true;
            }else{
                chkAll.checked = false;
            }
        });
    }
}
//chkAll();


//더보기 (마이피플)
// 호출 : more.onclick = showMore();
let openMore = document.querySelectorAll(".showMore");
let btnDel = document.querySelectorAll(".square");
    
function showMore(){
    for(let i=0; i<openMore.length; i++){
        openMore[i].addEventListener("click", function(){
            btnDel[i].classList.toggle("is-active");
        });
    }
}
//showMore();


//선택된 직무유형 영역 스크롤바
//호출 : customScroll();
function customScroll(){
    window.onload = function(){
        var myScroll = new IScroll('.iscroll',{
            mouseWheel: true,
            scrollbars: true,
            scrollX: false,
            scrollY: true,
            interactiveScrollbars: true
        });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
}
// customScroll();

//스크롤 생성
//호출 : myProjJob.onclick = makeScroll();
let myProjJob = document.querySelector('.myProjJob');
function makeScroll(){            
    let yScroll = document.querySelector('.myProjJob .tabContWrap .yScroll');
    
    myProjJob.addEventListener('mousemove', function(){
        yScroll.classList.add('is-active');
    });
    myProjJob.addEventListener('mouseout', function(){
        yScroll.classList.remove('is-active');
    });

    myProjJob.addEventListener('wheel', function(){
        let myProjJob_top = myProjJob.scrollTop;
        let deltaY = event.deltaY;
        
        console.log(deltaY);

        if(deltaY < 0 && myProjJob_top == 0){
            yScroll.classList.remove('is-active');
        }else{
            yScroll.classList.add('is-active');
        }
    });
}
//makeScroll();

/*-----------//호출-----------*/


/*-----------별도 호출 없음---------*/
//Top 버튼
$(function(){
    var $goTop = $('.goTop');
    $goTop.on('click', function(e){
        e.preventDefault();                
        $('.tabCont .yScroll').animate({scrollTop : "0",}, 500);
    })
});


// 파일 다중선택
// 호출 : 
// function uploadFile(){
//     if(window.FileReader) { 
//         addEventHandler(window, 'load', function() {
//         var drop   = document.getElementsByClassName('drop')[0];
//         var list   = document.getElementsByClassName('list')[0];
//         var list_ul = document.getElementsByClassName('list_ul')[0];

//         function cancel(e) {
//             if (e.preventDefault) { 
//                 e.preventDefault(); 
//             }
//             return false;
//         }

//         // Tells the browser that we *can* drop on this target
//         addEventHandler(drop, 'dragover', cancel);
//         addEventHandler(drop, 'dragenter', cancel);
//         addEventHandler(drop, 'drop', function (e) {
//         e = e || window.event; // get window.event if e argument missing (in IE)   

//         if (e.preventDefault) { 
//             e.preventDefault(); 
//         } // stops the browser from redirecting off to the image.

//         var dt = e.dataTransfer;
//         var files = dt.files;
//         for (var i=0; i<files.length; i++) {
//             var file = files[i];
//             var reader = new FileReader();

//         //attach event handlers here...
//         reader.readAsDataURL(file);
//         addEventHandler(reader, 'loadend', function(e, file) {
//             var bin = this.result; 
//             //	div.list...
//             var newFile       = document.createElement('li');
//             newFile.innerHTML = '<i class="ico delete"></i>' + '<span class="fileName">' + file.name + '</span>' + '<span class="float_r">' + file.size +' bytes' + '</span>';
//             list_ul.appendChild(newFile);  
//             }.bindToEventHandler(file));
//         }
//         return false;
//     });
//         Function.prototype.bindToEventHandler = function bindToEventHandler() {
//             var handler = this;
//             var boundParameters = Array.prototype.slice.call(arguments);
//             //create closure
//             return function(e) {
//             e = e || window.event; // get window.event if e argument missing (in IE)   
//             boundParameters.unshift(e);
//             handler.apply(this, boundParameters);
//             };
//         };
//     });
//     } else { 
//     //document.getElementsByClassName('status')[0].innerHTML = 'Your browser does not support the HTML5 FileReader.';
//     }
//     function addEventHandler(obj, evt, handler) {
//     if(obj.addEventListener) {
//         // W3C method
//         obj.addEventListener(evt, handler, false);
//         } else if(obj.attachEvent) {
//         // IE method.
//         obj.attachEvent('on'+evt, handler);
//         } else {
//         // Old school method.
//         obj['on'+evt] = handler;
//         }
//     }  addEventHandler();
// }
// uploadFile();


/*-----------별도 호출 없음---------*/

























/* 패스워드 보이기 */
// function showPw(){
//     let showPw = document.querySelector('.showPw');
        
//     showPw.addEventListener('click', function(){
//         let inputPw = this.previousElementSibling;
//         let inputPwType = inputPw.getAttribute("type");
        
//         if(inputPwType === "password"){
//             showPw.classList.add('is-active');
//             inputPw.setAttribute("type", "text");
//         }else{
//             showPw.classList.remove('is-active');
//             inputPw.setAttribute("type", "password");
//         }
//     });
// }
// showPw();



/* 전체선택, 해제 
$(".chkWrap").on("click", "#chkAll", function () {
    $(this).parents(".chkWrap").find('input').prop("checked", $(this).is(":checked"));
});

// 체크박스 개별 선택
$(".chkWrap").on("click", ".chkEach", function() {
    var is_checked = true;

    $(".chkWrap .chkEach").each(function(){
        is_checked = is_checked && $(this).is(":checked");
    });

    $("#chkAll").prop("checked", is_checked);
});*/