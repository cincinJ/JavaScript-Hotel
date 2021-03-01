// room Conect 
const single_room = document.getElementById('single_room');
const deluxeS_room = document.getElementById('deluxeS_room');
const double_room = document.getElementById('double_room');
const deluxeD_room = document.getElementById('deluxeD_room');
const twin_room = document.getElementById('twin_room');
const deluxeT_room = document.getElementById('deluxeT_room');

// DOM
const body_img = document.querySelector('.background_image');
const room_num = document.querySelector('.num');
const room_type = document.getElementById('room_type');

// 監聽 
single_room.addEventListener('mouseover',sRoom);
deluxeS_room.addEventListener('mouseover',dsRoom);
double_room.addEventListener('mouseover',dbRoom);
deluxeD_room.addEventListener('mouseover',ddRoom);
twin_room.addEventListener('mouseover',tRoom);
deluxeT_room.addEventListener('mouseover',dtRoom);

// 點擊監聽
single_room.addEventListener(`click`,to_room_page)

// 轉址
function to_room_page(){
  window.localStorage.setItem('room','single');
  window.location.href = `single_room.html`;
}



//change background
function sRoom(){
  room_num.textContent = '01';
  room_type.textContent = 'Single Room';
  body_img.style[`background-image`] = `url(/image/11.jpg)`
  
}
function dsRoom(){
  room_num.textContent = '02';
  room_type.textContent = 'Deluxe Single Room';
  body_img.style[`background-image`] = `url(/image/4.jpg)`

}
function dbRoom(){
  room_num.textContent = '03';
  room_type.textContent = 'Double Room';
  body_img.style[`background-image`] = `url(/image/photo-1558976825-6b1b03a03719.jpeg)`
 
}
function ddRoom(){
  room_num.textContent = '04';
  room_type.textContent = 'Deluxe Double Room';
  body_img.style[`background-image`] = `url(/image/photo-1501876725168-00c445821c9e.jpeg)`;
  // body_img.style[`transition`]=`all 1s`;
 
}
function tRoom(){
  room_num.textContent = '05';
  room_type.textContent = 'Twin Room';
  body_img.style[`background-image`] = `url(/image/2.jpg)`

}
function dtRoom(){
  room_num.textContent = '06';
  room_type.textContent = 'Deluxe Twin Room';
  body_img.style[`background-image`] = `url(/image/photo-1519974719765-e6559eac2575.jpeg)`

}