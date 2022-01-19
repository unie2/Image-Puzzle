const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const tileCount = 16;

let tiles = [];
const dragged = {
    el: null, // 드래그된 element를 담기 위한 프로퍼티
    class: null, 
    index: null,
}
let isPlaying = false; // 게임이 끝났는지 여부
let timeInterval = null;
let time = 0;

/* function */

// 게임 시작 (타일 배치)
function setGame() {
    isPlaying = true;
    time = 0;
    container.innerHTML = '';
    gameText.style.display = 'none'
    clearInterval(timeInterval);

    tiles = createImageTiles();
    tiles.forEach(tile => {
        container.appendChild(tile)
    })
    setTimeout(() => {
        container.innerHTML = '';
        shuffle(tiles).forEach(tile => container.appendChild(tile))
        timeInterval = setInterval(() => { // 시간 1초씩 증가
            playTime.innerText = time;
            time ++;
        }, 1000)
    }, 5000) // 5초 뒤에 셔플 작동
}

// 16 크기의 배열 생성 후 li 태그 정의
function createImageTiles() {
    const tempArray = [];
    
    Array(tileCount).fill().forEach( (_, i) => { 
        const li = document.createElement('li'); // li 태그 생성
        li.setAttribute('data-index', i);
        li.setAttribute('draggable', 'true');
        li.classList.add(`list${i}`);
        tempArray.push(li)
    }) 
    return tempArray;
}

// 타일 셔플
function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]]  = [array[randomIndex], array[index]];
        index --;
    }
    return array;
}


/* events */
// 드래그 
container.addEventListener('dragstart', e => {
    if (!isPlaying) return; // isPlaying이 false면 리턴
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj) // 인덱스를 도출하기 위해 배열로 변환
})

// 드래그 오버
container.addEventListener('dragover', e => {
    e.preventDefault() // 이벤트가 발생하지 않도록 
})

// 상태 체크 (타일이 모두 일치했는지)
function checkStatus() {
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((child, index) => { // 특정한 조건에 만족하는 요소만 return
        return Number(child.getAttribute("data-index")) !== index
    }) 
    if (unMatchedList.length === 0) {
        gameText.style.display = "block";
        isPlaying = false;
        clearInterval(timeInterval);
    }
}

// 드롭
container.addEventListener('drop', e => {
    if (!isPlaying) return; // isPlaying이 false면 리턴
    const obj = e.target;

    if (obj.className !== dragged.class) {
        let originPlace;
        let isLast = false; // 마지막 요소인지 확인

        if (dragged.el.nextSibling) {
            originPlace = dragged.el.nextSibling
        } else {
            originPlace = dragged.el.previousSibling
            isLast = true; // 마지막 값이 없다라는 의미
        }

        const droppedInex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedInex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj)
    }

    checkStatus();
})

startButton.addEventListener('click', () => {
    setGame()
})