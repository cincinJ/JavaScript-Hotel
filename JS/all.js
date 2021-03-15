const token = 'nWPYAcCfrSm1CzO5gDZgCgEhmdYoz1tjLjahCsyhxusE2bujYIhkLsRATXzx';
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
const name = document.querySelector('.info--room-infomation-a');
const price = document.querySelector('.info--room-price');
const imgLeft = document.querySelector('.info__header--left');
const imgRT = document.querySelector('.info__header--right-top');
const imgRB = document.querySelector('.info__header--right-button');
const roomlist = document.querySelector('.room--facilities'); // 選取用來渲染房間功能
let getUrl = new URL(location.href);
let roomId = getUrl.searchParams.get('roomid');

// 取得API資料
let bookingDate = []; // 已預約時間存放空間
const RenderPage = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get(url + 'room/' + `${roomId}`).then((res) => {
    let details = '';
    details = res.data.room[0]; // 取得房間詳細
    bookingDate = res.data.booking; // 已預約時間
    RenderHeadImg(details); // 呼叫渲染header圖片
    RenderRoomDetail(details); // 呼叫渲染房間描述
    RenderRoomFeatures(details); //呼叫渲染房間功能函式
    ShowCalendlar(bookingDate, details); // 呼叫日曆
  });
};

// 比對房間功能true||false渲染功能
function RenderRoomFeatures(details) {
  const amenitiesIcon = document.querySelectorAll('.icon');
  let amenities = details.amenities;
  for (const key in amenities) {
    if (amenities.hasOwnProperty(key)) {
      const element = amenities[key];
      let index = Object.keys(amenities).indexOf(key); // 取物件索引值
      if (element) {
        amenitiesIcon[index].style.opacity = '1';
      } else {
        amenitiesIcon[index].style.opacity = '0.3';
      }
    }
  }
}
RenderPage();
// 渲染header圖片
function RenderHeadImg(details) {
  imgLeft.style['background-image'] = `url(${details.imageUrl[0]})`;
  imgRT.style['background-image'] = `url(${details.imageUrl[1]})`;
  imgRB.style['background-image'] = `url(${details.imageUrl[2]})`;
}
// 渲染房間描述函式
function RenderRoomDetail(details) {
  descriptionShort = details.descriptionShort; // 取得房間描述來渲染
  strName = `
    <h2 class='info--room-name'>${details.name}
        </h2>
        <p class='room--people-limit room--infos'>房客人數限制： ${descriptionShort.GuestMin}~${descriptionShort.GuestMax} 人</p>
        <p class='room--bed-type room--infos'>床型：${descriptionShort.Bed[0]}</p>
        <p class='room--bath-num room--infos'>衛浴數量： ${descriptionShort['Private-Bath']} 間</p>
        <p class='room--room-size room--infos'>房間大小： ${descriptionShort.Footage} 平方公尺</p>
        <p class='room--type-info'>
          ${details.description}
        </p>
        <h5 class="border_decoretion">＼＼＼
        </h5>
        <div class="room--check-group">
          <div class="checkIn-group">
            <h3>Check In</h3>
            <h4>15:00　−　21:00</h3>
          </div>
          <div class="checkOut-group">
            <h3>Check Out</h3>
            <h4>10:00</h3>
          </div>`;
  strPrice = ` <h3 class='normal-day-peice'>NT.${details.normalDayPrice}</h3>
    <p class='day-info normal-day'>平日(一~四)</p>
    <h4 class="weekend-day-price">NT.${details.holidayPrice}</h4>
    <p class="day-info weekend-day">假日(五~日)</p>`;
  name.innerHTML = strName;
  price.innerHTML = strPrice;
}
// 填寫姓名、電話、送出
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const showTotalPrice = document.querySelector('.price');
let booking = {
  name: '',
  tel: '',
  date: [],
};
function BookingRoom() {
  if (inputName.value === '' || inputPhone.value === '') {
    console.log('請填寫姓名&電話');
    swal({
      title: '請填寫正確資料(`･∀･)b',
      icon: 'warning',
      dangerMode: true,
    });
  } else {
    booking.name = inputName.value;
    booking.tel = inputPhone.value;
    swal({
      title: '要預約嗎d(`･∀･)b?',
      icon: 'warning',
      buttons: ['否', '是'],
      dangerMode: true,
    }).then(() => {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios.post(url + 'room/' + `${roomId}`, booking).then((res) => {
        console.log(res);
        inputName.value = '';
        inputPhone.value = '';
        start.textContent = '';
        end.textContent = '';
        showTotalPrice.textContent = '';
        RenderPage();
        swal('您已預約成功(*´∀`)~♥謝謝！', { icon: 'success' });
      });
    });
  }
}
const btnBookingRoom = document.getElementById('btn');
btnBookingRoom.addEventListener('click', BookingRoom);
// 確認是否取消預約提示-套件，確認後執行deleteList函式，刪除遠端預約資料並回傳。
function CheckCancel() {
  swal({
    title: '確定要取消預約嗎?',
    icon: 'warning',
    buttons: ['否', '是'],
    dangerMode: true,
  }).then((confirmDelete) => {
    ClearAllBooking();
    if (confirmDelete) {
      swal('您已成功取消預約，感謝您！', {
        icon: 'success',
      });
    } else {
      swal('很抱歉，您取消預約失敗。');
    }
  });
}
// 清除全部預約資料
function ClearAllBooking() {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.delete(`${url}rooms`, { data: { success: true } }).then((res) => {
    RenderPage();
  });
}
const btnCancel = document.getElementById('cancel');
btnCancel.addEventListener('click', CheckCancel);
function havedays(haveBookingDetails) {
  let haveBookingDate = [];
  haveBookingDetails.forEach((i) => {
    haveBookingDate.push(i.date);
  });
  return haveBookingDate;
}
// 日期選擇測試 ,  建立一包物件 / 呼叫？
function ShowCalendlar(bookingDate, details) {
  let disableArray = havedays(bookingDate);
  let datechoose = flatpickr('#dateTest', {
    minDate: 'today',
    maxDate: new Date().fp_incr(180),
    mode: 'range',
    inline: true,
    dateFormat: 'Y-m-d',
    disable: disableArray,
    startDate: '',
    endDate: '',
    onClose: function (selectedDates, dateStr) {
      startDate = selectedDates[0].getTime();
      endDate = selectedDates[1].getTime();
      start.textContent = dateStr.split('to')[0];
      end.textContent = dateStr.split('to')[1];
      let medianDate = (endDate - startDate) / (1000 * 60 * 60 * 24); // 將秒數轉回天數
      booking.date = []; // 防止再次選擇日期時累加,所以要清空
      let totalPrice = 0;
      // 跑迴圈列出所有日期,並做價錢加總
      for (let i = 0; i <= medianDate; i++) {
        let day = new Date(startDate + 8 * 3600 * 1000); // +8*3600*1000是因為台灣時區比ISO快8H,這樣才能解決相差1天的日期
        day.setDate(day.getDate() + i);
        // 將字串做切割成規定格式 YYYY-MM-DD
        booking.date.push(day.toISOString().split('T')[0]);
        // 價錢加總,判斷平假日金額不同做總和
        if (day.getDay() == 6 || day.getDay() == 0) {
          // console.log('假日');
          totalPrice += details.holidayPrice;
        } else {
          // console.log('平日');
          totalPrice += details.normalDayPrice;
        }
      }
      showTotalPrice.textContent = totalPrice;
    },
  });
}
