const roomName = document.querySelector('.info--room-name');
const normalDayPrice = document.querySelector('.normal-day-peice');
const holidayPrice = document.querySelector('.weekend-day-price');
const imgLeft = document.querySelector('.info__header--left');
const imgTop = document.querySelector('.info__header--right-top');
const imgBot = document.querySelector('.info__header--right-button');
const logoimg = document.querySelector('.logoimg');
const getUrl = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token = 'H48kKVj4z4eRe5KzoFUVSVa1iFj3rJsZdTXrIo418I1Nn8xMvRLmwq39LyWQ';
let roomsData = [];
function render(roomsData){
    roomsData.forEach((item)=>{
    roomName.textContent = item.name
    console.log(item.name)
    normalPrice.textContent = items[index].normalDayPrice
    weekendPrice.textContent = items[index].holidayPrice
    imgLeft.style[`background-image`]=`url(room[i].imageUrl[0])`
    imgTop.style[`background-image`]=``
    imgBot.style[`background-image`]=``
    })
    roomName.textContent = roomsData.name
    console.log(roomsData.name)
}
const getData = ()=>{
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    axios.get(getUrl)
        .then(res=>{
            roomsData = res.data.items
            console.log(res)
            render(roomsData)
        })
}
getData();

// 點選logo會轉回首頁
function switchhref(){
    location.href=`index.html`
}
logoimg.addEventListener('click',switchhref);
