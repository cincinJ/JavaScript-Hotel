const token = 'nWPYAcCfrSm1CzO5gDZgCgEhmdYoz1tjLjahCsyhxusE2bujYIhkLsRATXzx';
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
const content = document.querySelector('.ulaaa');
let roomsData = [];

const getData = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get(url + 'rooms').then((res) => {
    roomsData = res.data.items;
    // console.log(res)
    render();
  });
};
getData();
let imageurll = '';
function render() {
  let str = '';
  roomsData.forEach((i, index) => {
    let roomdetail = `
              <li><a href="single_room.html?roomid=${i.id}">${i.name}</a></li>
              `;
    str += roomdetail;
    imageurll = i.imageUrl;
    let a = index;
    ccc(a);
  });
  content.innerHTML = str;
}
// 試著抓值
const qa = document.querySelectorAll('.qa');
const img = document.querySelector('.background_image');
function changephoto() {
  img.style['background-image'] = `url(${imageurll})`;
}
function ccc(a) {
  qa[a].addEventListener('mouseover', changephoto);
}
