"use strict"




let dragged = {
    el:null,
    src:null
};
let dragging = 0;
let dragOverImageSrc;

init();

function init(){
    setEventListener();
}
// 리스트의 생성, 삭제에 관한 함수들

// 버튼 클릭 이벤트 함수들
function addList() {
    let imageList= ` <li>
                            <input type="text" class="tear" placeholder="이름을 입력하세요" maxlength="6" >
                            <ul class="image-list">
                            </ul>
                            <div class="btn-box" >
                                <i class="far fa-minus-square btn minus"></i>
                            </div>
                        </li> ` 
    let imageListBox = document.querySelector('.image-list-box'); //이미지 리스트를 담고있는 박스
    imageListBox.insertAdjacentHTML("beforeend",imageList);
    setEventListener();
}

function delList(event) {
    let currentList = event.target.parentNode.parentNode;
    currentList.remove();
}

function delList_handler(event){
    delList(event);
}

// 드래그에 관한 함수들
// 드래그 대상
// 1. 드래그 시작 할 때 데이터 저장 (dragged)
// 2. 드래그 중이면 원래 위치한 아이템 삭제

// 드롭존
// 1. 드롭존에 드래그 엔터 될때 드래그중인 아이템을 0.3 opacity로 보여주기
// 2. 드롭존에 드래그 오버 될때는 할게 없네..
// 3. 드롭존에 드래그 리브 될때 보여주던 드래그중인 아이템 삭제하기
// 4. 드롭존에 드롭시 class="item-list"에 새 <li> 추가한뒤 아이템을 넣는다.

// 드롭될때 이미지가 겹치면 앞이나 뒤에 넣는 기능 추가해보자
// 일단 겹치면 앞에 넣는거부터 해보자
function dragStart(event){
    dragged.el = event.target;
    dragged.src = event.target.src;
    console.log(dragged);
}

// 드래그중인 아이템 삭제
function drag(event){
    // console.log('drag');
    event.target.parentNode.remove();
    setEventListener();
}

function dragend(event){
}


// 드롭존에 쓰는 함수
// 드롭존 진입시 미리보기 생성
function dragEnter(event){
    // let item = `<li><img src=${dragged.src} class="image dragenter"></li>`
    // event.target.insertAdjacentHTML('beforeend',item);
    // if(dragged.src === )
}

function dragOver(event){
    event.preventDefault();
}

// 드롭존을 떠났을때 미리보기를 삭제한다.
function dragLeave(event){
    // event.target.removeChild(event.target.lastChild);
}

// 드롭 했을때 미리보기를 삭제하고 이미지를 아이템 리스트에 추가한다.
function drop(event){
    event.preventDefault();
    console.log('drop');
    let item = `<li><img src=${dragged.src} class="image "></li>`
    //event.target.className이 image-list면 마지막에 생성하고
    //event.target.className이 image면 image의 앞에(before) 생성하라
    if(event.target.className === 'image') {
        event.target.parentNode.insertAdjacentHTML('beforebegin',item);
    } else {
        event.target.insertAdjacentHTML('beforeend',item);
    }
    

    setEventListener();
    // let droppedImage = event.target.lastChild.firstChild;
    // console.log(droppedImage);
    // droppedImage.classList.remove('dragenter');
}

function setEventListener(){
    let plusBtn = document.querySelector('.plus');
    let minusBtn = document.querySelectorAll('.minus')
    let imageUploadBtn = document.querySelector('#image-upload-btn');
    let images = document.querySelectorAll('.image'); //업로드한 이미지파일들
    let uploadedImageList = document.querySelector('.uploaded-image-list'); // 이미지 파일 리스트
    let imageList = document.querySelectorAll('.image-list'); // 이미지파일을 드래그하는 드롭존
    

    plusBtn.addEventListener('click',addList);
    
    if(minusBtn.length!=0){
        minusBtn.forEach(minusBtn=>minusBtn.addEventListener('click',delList_handler));
    }

    imageUploadBtn.addEventListener('change',loadFile);

    images.forEach(image=>image.addEventListener('dragstart',dragStart));
    images.forEach(image=>image.addEventListener('drag',drag)); 

    imageList.forEach(list=>list.addEventListener('dragenter',dragEnter));
    imageList.forEach(list=>list.addEventListener('dragover',dragOver));
    imageList.forEach(list=>list.addEventListener('drop',drop));
    imageList.forEach(list=>list.addEventListener('dragleave',dragLeave));
    
    
    uploadedImageList.addEventListener('dragenter',dragEnter);
    uploadedImageList.addEventListener('dragover',dragOver);
    uploadedImageList.addEventListener('drop',drop);
    uploadedImageList.addEventListener('dragleave',dragLeave);
}


function loadFile(event) {
    let uploadedFiles = event.target.files;	//선택된 파일 가져오기
    //uploadedFiles는 obj 형태라서 따로 배열로 만듬
    let files = [...uploadedFiles];
    let uploadedImageList = document.querySelector('.uploaded-image-list');

    files.forEach((file,index)=>{
        let src = URL.createObjectURL(file);
        let image = `<li><img src=${src} alt="" dragable="true" class="image"></li>`
        //이미지를 이미지 리스트에 추가
        uploadedImageList.insertAdjacentHTML("beforeend",image);
    })
    
    setEventListener();
};