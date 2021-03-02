const token = 'nWPYAcCfrSm1CzO5gDZgCgEhmdYoz1tjLjahCsyhxusE2bujYIhkLsRATXzx';
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
const name = document.querySelector('.info--room-infomation-a');
const price = document.querySelector('.info--room-price');
const imgLeft = document.querySelector('.info__header--left');
const imgRT = document.querySelector('.info__header--right-top');
const imgRB = document.querySelector('.info__header--right-button');
const roomlist = document.querySelector('.room--facilities'); // 選取用來渲染房間功能
let getUrl = new URL(location.href);
let roomid = getUrl.searchParams.get('roomid');

// 取得API資料
let details = '';
const getData = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.get(url + 'room/' + `${roomid}`).then((res) => {
    details = res.data.room[0];
    console.log(res);
    let funfun = res.data.booking;
    // 將房間功能物件轉成陣列 -------
    let mm = res.data.room[0].amenities;
    let obj = Object.keys(mm).map(function (_) {
      return mm[_];
    });
    FeaturesIsTrue(obj);
    //---------------------------
    descriptionShort = details.descriptionShort; // 取得房間描述來渲染
    render(details); // 呼叫渲染房間描述
    changeimg(details); // 呼叫渲染header圖片

    function renderaftercheck() {
      swal({
        title: '要預約這個時段嗎?',
        icon: 'warning',
        buttons: ['否', '是'],
        dangerMode: true,
      }).then(() => {
        funfun.forEach((i) => {
          if (inputName.value === i.name) {
            swal(`Name:${i.name}Tel:${i.tel}Date:${i.date}`, {
              icon: 'success',
            });
          }
        });
      });
    }
  });
};
getData();

// 渲染房間描述函式
function render(details) {
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
// 渲染header圖片函式
function changeimg(details) {
  imgLeft.style['background-image'] = `url(${details.imageUrl[0]})`;
  imgRT.style['background-image'] = `url(${details.imageUrl[1]})`;
  imgRB.style['background-image'] = `url(${details.imageUrl[2]})`;
}
// 比對房間功能為true時就取出值並呼叫渲染房間功能函式
function FeaturesIsTrue(obj) {
  obj.forEach(function (i, number) {
    let Features = '';
    if (i === true) {
      Features = number;
    }
    renderRoomFeatures(Features);
  });
}
// 將所有的img用dom成陣列，把true的值與amenities索引值做比對，符合的話就把icon透明度調成1顯示。
function renderRoomFeatures(Features) {
  const amenities = document.querySelectorAll('.icon');
  amenities.forEach(function (i, index) {
    if (index === Features) {
      amenities[index].style.opacity = '1';
    }
  });
}

// 填寫姓名、電話、送出
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const showTotalPrice = document.querySelector('.price');
const btn = document.getElementById('btn');
let booking = {
  name: '',
  tel: '',
  date: [],
};

function Select() {
  if (inputName.value === '' || inputPhone.value === '') {
    console.log('請填寫正確資料');
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
      axios.post(url + 'room/' + `${roomid}`, booking).then((res) => {
        console.log(res);
        inputName.value = '';
        inputPhone.value = '';
        start.textContent = '';
        end.textContent = '';
        showTotalPrice.textContent = '';
        getData();
        swal('您已預約成功(*´∀`)~♥謝謝！', { icon: 'success' });
      });
    });
  }
}

btn.addEventListener('click', Select);

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', doublecheck);

// 確認是否取消預約提示-套件，確認後執行deleteList函式，刪除遠端預約資料並回傳。
function doublecheck() {
  swal({
    title: '確定要取消預約嗎?',
    icon: 'warning',
    buttons: ['否', '是'],
    dangerMode: true,
  }).then((willDelete) => {
    deleteList();
    if (willDelete) {
      swal('您已成功取消預約，感謝您！', {
        icon: 'success',
      });
    } else {
      swal('很抱歉，您取消預約失敗。');
    }
  });
}
// 清除預約資料
function deleteList() {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.delete(`${url}rooms`, { data: { success: true } }).then((res) => {
    console.log(res);
  });
}

// 日期選擇測試 ,  建立一包物件 / 呼叫？
const datechoose = flatpickr('#dateTest', {
  minDate: 'today',
  maxDate: new Date().fp_incr(180),
  mode: 'range',
  inline: true,
  dateFormat: 'Y-m-d',
  //   disable: [
  //     function (date) {
  //       // return true to disable
  //       return date.getDay() === 0 || date.getDay() === 6;
  //     },
  //   ],
  startDate: '',
  endDate: '',
  onClose: function (selectedDates, dateStr) {
    // console.log(selectedDates, dateStr);
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
