"use strict"
window.addEventListener('load',function(){
    init();
})

let dragged = {
    el:null,
    src:null
};
let dragging = 0;
let dragOverImageSrc;

function init(){
    displayList();
}
// 리스트의 생성, 삭제에 관한 함수들
function displayList(imageList) {
    let html= ` <li>
                    <input type="text" class="tear" placeholder="이름을 입력하세요" maxlength="6" >
                    <ul class="image-list">
                        <li ><img src="image/자연1.jpg" alt="" class="image"></li>
                    </ul>
                    <div class="btn-box" >
                        <i class="far fa-plus-square btn plus"></i>
                    </div>
                </li>`;

    if(imageList!==undefined){
        html = imageList;
    }
    let imageListBox = document.querySelector('.image-list-box');
    imageListBox.insertAdjacentHTML("beforeend",html);
    
    setEventListener();
}

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
    displayList(imageList);
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
// 1. 드래그 시작 할 때 데이터 저장
// 2. 드래그 중이면 원래 위치한 아이템 삭제하여 해당 아이템을 드래그중인거 보여주기

// 드롭존
// 1. 드롭존에 드래그 엔터 될때 드래그중인 아이템을 0.5 opacity로 보여주기
// 2. 드롭존에 드래그 오버 될때 
// 3. 드롭존에 드래그 리브 될때 보여주던 드래그중인 아이템 삭제하기
// 4. 드롭존에 드롭시 class="item-list"에 새 <li> 추가한뒤 아이템을 넣는다.

// 드래그 대상에게 쓰는 함수
// 드래그 대상의 src를 text/plain 형태로 저장
// 드래그 할때 현재 있던 대상은 삭제
// 드래그 대상 함수에서 event.target은 드래그 한 대상을 의미한다.
// 드래그 중인 대상이 아님
function dragStart(event){
    event.dataTransfer.setData('text/plain',event.target.src);
    let src = event.dataTransfer.getData('text/plain');
    dragOverImageSrc = src;
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
    let item = `<li><img src=${dragOverImageSrc} class="image dragenter"></li>`
    event.target.insertAdjacentHTML('beforeend',item);
}

function dragOver(event){
    event.preventDefault();
    // console.log('over');
}

// 드롭존을 떠났을때 미리보기를 삭제한다.
function dragLeave(event){
    event.target.removeChild(event.target.lastChild);
}

// 드롭 했을때 미리보기를 삭제하고 이미지를 아이템 리스트에 추가한다.
function drop(event){
    event.preventDefault();
    let droppedImage = event.target.lastChild.children[0];
    droppedImage.classList.remove('dragenter');
    event.dataTransfer.clearData();
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