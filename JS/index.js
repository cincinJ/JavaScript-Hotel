const token = 'nWPYAcCfrSm1CzO5gDZgCgEhmdYoz1tjLjahCsyhxusE2bujYIhkLsRATXzx';
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
const content = document.querySelector('.content_index-right-room-name');

let roomsData = [];
const getData = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get(url + 'rooms').then((res) => {
    roomsData = res.data.items;
    console.log(res);
    RenderRoomDatail();
  });
};
getData();
let imageurll = '';
function RenderRoomDatail() {
  let str = '';
  roomsData.forEach((i, index) => {
    let roomdetail = `
              <li data-room=${i.id}><a href="single_room.html?roomid=${i.id}">${i.name}</a></li>
              `;
    str += roomdetail;
    imageurll = i.imageUrl;
  });
  content.innerHTML = str;
}
// 滑鼠移至房名上更改渲染資料
const room_num = document.querySelector('.num');
const room_type = document.getElementById('room_type');
const img = document.querySelector('.background_image');
function changephoto(target) {
  roomsData.forEach((i, index) => {
    if (target.room == i.id) {
      img.style['background-image'] = `url(${i.imageUrl})`;
      room_type.textContent = i.name;
      room_num.textContent = index + 1;
    }
  });
}
// 滑鼠移至房名上會更換背景圖片
content.addEventListener('mouseover', printback);
function printback(e) {
  let target = e.target.dataset;
  changephoto(target);
}
