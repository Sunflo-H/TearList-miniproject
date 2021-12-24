"use strict"
window.addEventListener('load',function(){
    displayList();
    
})
let imageInTheItemListBoolean = 0;
let dragOverImageSrc;
let dragOverCount = 0;
function displayList(itemList) {
    let html= ` <li>
                    <input type="text" class="tear" placeholder="이름을 입력하세요" maxlength="6" >
                    <ul class="item-list">
                    </ul>
                    <div class="btn-box" >
                        <i class="far fa-plus-square btn plus"></i>
                    </div>
                </li> `;

    if(itemList!==undefined){
        html = itemList;
    }
    let itemListBox = document.querySelector('.item-list-box');
    itemListBox.insertAdjacentHTML("beforeend",html);
    setEventListener();
}

function addList() {
    let itemList= ` <li>
                            <input type="text" class="tear" placeholder="이름을 입력하세요" maxlength="6" >
                            <ul class="item-list">
                            </ul>
                            <div class="btn-box" >
                                <i class="far fa-minus-square btn minus"></i>
                            </div>
                        </li> ` 
    displayList(itemList);
}

function delList(event) {
    let currentList = event.target.parentNode.parentNode;
    currentList.remove();
}

function delList_handler(event){
    delList(event);
}
// 드래그 함수 
// 1. 드래그 할때 데이터 저장
// 2. 드롭존에 드래그 오버 될때 드래그중인 아이템을 0.5 opacity로 보여주기, 이때 위치는 lastchild면 될듯
// 3. 드롭존에 드래그 리브 될때 보여주던 드래그중인 아이템 삭제하기
// 4. 드롭존에 드롭시 class="item-list"에 새 <li> 추가한뒤 아이템을 넣는다.

// 드래그 대상에게 쓰는 함수
// 드래그 대상의 src를 text/plain 형태로 저장
// 드래그 할때 현재 있던 대상은 삭제
function dragStart(event){
    event.dataTransfer.setData('text/plain',event.target.src);
    let src = event.dataTransfer.getData('text/plain');
    dragOverImageSrc = src;
    imageInTheItemListBoolean=1;
    if(imageInTheItemListBoolean===1){
        let imageList = document.querySelector('.image-list');
        console.log(event.target);
        imageList.removeChild(event.target);
        // event.target.remove();
        imageInTheItemListBoolean = 0;
    }
    
}

// 이미지 드롭을 완료했다면 원래 있던 imageList안의 해당 이미지를 삭제하고
// 아니라면 아무일도 일어나지 않는다.
function dragend(event){
    
}


// 드롭존에 쓰는 함수
// 드롭존에 드래그오보중일때 미리보기를 추가한다. 이때 dragovercount전역변수를 이용한다.
function dragOver(event){
    event.preventDefault();
    if(dragOverCount===0){
        let item = `<img src=${dragOverImageSrc} class="item dragover">`
        event.target.insertAdjacentHTML('beforeend',item);
        dragOverCount = 1;
    }
    
    // let src = event.dataTransfer.getData('text');
    // console.log(src);
}
// 드롭존을 떠났을때 미리보기를 삭제한다. 이때 dragovercount전역변수를 이용한다.
function dragLeave(event){
    let itemList = event.target;
    itemList.removeChild(itemList.lastChild);
    dragOverCount = 0;
}
// 드롭 했을때 미리보기를 삭제하고 이미지를 아이템 리스트에 추가한다.
function drop(event){
    event.preventDefault();
    let itemList = event.target;
    let src = event.dataTransfer.getData('text/plain');
    let item = `<img src=${src} class="item">`

    itemList.removeChild(itemList.lastChild);
    event.target.insertAdjacentHTML('beforeend',item);
    imageInTheItemListBoolean = 1;
    event.dataTransfer.clearData();
}



function setEventListener(){
    let plusBtn = document.querySelector('.plus');
    let minusBtn = document.querySelectorAll('.minus')
    let imageUploadBtn = document.querySelector('#image-upload-btn');
    let images = document.querySelectorAll('.image'); //업로드한 이미지파일들
    let itemList = document.querySelectorAll('.item-list'); // 이미지파일을 드래그하는 드롭존
    let imageList = document.querySelector('.image-list'); // 이미지 파일 리스트
    

    plusBtn.addEventListener('click',addList);
    
    if(minusBtn.length!=0){
        minusBtn.forEach(minusBtn=>minusBtn.addEventListener('click',delList_handler));
    }

    imageUploadBtn.addEventListener('change',loadFile);

    images.forEach(image=>image.addEventListener('dragstart',dragStart));    

    itemList.forEach(itemList=>itemList.addEventListener('dragover',dragOver));
    itemList.forEach(itemList=>itemList.addEventListener('drop',drop));
    itemList.forEach(itemList=>itemList.addEventListener('dragleave',dragLeave));
    
    imageList.addEventListener('dragend',dragend);
}


function loadFile(event) {
    let file = event.target.files[0];	//선택된 파일 가져오기
    let src = URL.createObjectURL(file);
    let image = `<li><img src=${src} alt="" dragable="true" class="image"></li>`

    //이미지를 이미지 리스트에 추가
    var imageList = document.querySelector('.image-list');
    imageList.insertAdjacentHTML("beforeend",image);
};