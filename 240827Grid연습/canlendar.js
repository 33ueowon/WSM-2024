//달력
const calendarContainerDiv = document.querySelector("#calendar-container");

//현재 날짜 구하자
let currentDate = new Date();

// 제목 세팅
const setCalendarHeader = (date) => {
    //연도 구하자
    const year = date.getFullYear();
    //달 구하자
    const month = date.getMonth()  ;  //0: 1월
    
    titleString = `${year}년  ${month + 1}월`;
    //html 요소 가져옴
    const calendarHeaderH1 = document.querySelector("#calendar-header h1");
    calendarHeaderH1.innerHTML = titleString;   //innerHTML 쓰는 걸 추천 text로 쓰면 내가 쓴 코드 다 보이는 거
}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    setCalendarHeader(currentDate);
    setCalendar(currentDate);
}
//이전 달 버튼 이벤트 처리하자
const prevMonthButton = document.getElementById("prev-month"); 
prevMonthButton.addEventListener("click", () => changeMonth(-1));  //ㅅㅣ험 이전 달 -1  //.addEventListner("click", console.log('이전 달')) 하면 안돼. console.log()함수 실행한 결과를 클릭했을 때 실행하는 거야. 즉 아무 일도 안함.
// console.log('이전 달');

//다음 달 버튼 이벤트 처리하자ss
const nextMonthButton = document.querySelector('#next-month');  
// const nextMonthButton = document.getElementById("next-month");
nextMonthButton.onclick = () =>  changeMonth(1);    //시험 다음 달 +1
// console.log('다음 달');
//달력 표시하자 (요일, 날짜)
const setCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const prevMonthLastDate = new Date(year,month,0)
    
    //첫날의 요일 구하자 : 이전 달 뒷 날짜 쓰기 위하여
    const firstDay = new Date(year,month,1).getDay();   //0 : 일, 6 : 토
    
    //마지막 날짜 구하자 : 요일 구하기 위하여
    const lastDate = new Date(year, month + 1 , 0);     //실제 마지막 날짜는 lastDate.getDate()
    
    //마지막 날의 요일을 구하자 : 다음달 앞 날짜 쓰기 위하여 
   const lastDay = lastDate.getDay();

    // 일 월 화 수 목 금 토
    // const weekNameString = `<div class="item week-name">일</div>
    //         <div class="item week-name">월</div>
    //         <div class="item week-name">화</div>
    //         <div class="item week-name">수</div>
    //         <div class="item week-name">목</div>
    //         <div class="item week-name">금</div>
    //         <div class="item week-name">토</div>`
    let weekNameString = "";
    const weekNames = "일월화수목금토" 
    const weekNamesArray = weekNames.split("");   //["일" ㄷ등등등]
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`
    });
            
    calendarContainerDiv.innerHTML = weekNameString;

    //이전 달 뒷 날짜 구하자
    //?~ 이전 달 마지막 날짜 ?: 이전달 마지막 날짜 - 이번 달 첫 날의 요일 0~이번 달 1일의 요일 -1까지 이전 달 마지막 날짜 - 이번 달 1일의 요일 + 1(시작날짜)부터 +1해서 쓰자 : 
    for (let date = (prevMonthLastDate.getDate()-firstDay + 1); date <= prevMonthLastDate.getDate(); date++) {
        let currentMonthDateDiv = document.createElement("div");    //<div></div>
        currentMonthDateDiv.className = "item other-month"; //<div class= "item"></div>
        currentMonthDateDiv.textContent = date; ////<div class= "item">1</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv); //<div id = "calendar-container"><div class = "item">1</div></div>
    }


    //이번 달 날짜들 쓰자( 1~30 : 1~last Date.getDate())

    // let dateString = "";
    // for (let date = 1; date <= lastDate.getDate(); date++) {
    //     dateString += `<div class="item">${date}</div>`;    
    // }
    
    // calendarContainerDiv.innerHTML += dateString;
    // div 요소 만들자, class에 item 넣자, text에 날짜 넣자. 
    for (let date = 1; date <= lastDate.getDate(); date++) {
        let currentMonthDateDiv = document.createElement("div");    //<div></div>
        currentMonthDateDiv.className = "item"; //<div class= "item"></div>
        currentMonthDateDiv.textContent = date; ////<div class= "item">1</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv); //<div id = "calendar-container"><div class = "item">1</div></div>
    }

    //다음 달 앞 날짜 구하자
    // 1~? ?: 6-이번 달 마지막 날의 요일
    for (let date = 1; date <= (6 -  lastDay); date++) {
        let currentMonthDateDiv = document.createElement("div");    //<div></div>
        currentMonthDateDiv.className = "item other-month"; //<div class= "item"></div>
        currentMonthDateDiv.textContent = date; ////<div class= "item">1</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv); //<div id = "calendar-container"><div class = "item">1</div></div>
    }
    //1~30(이번 달 날짜들)
    // 1~5(다음달 날짜들 마지막 날짜가 제일 중요)
}
setCalendarHeader(currentDate);
setCalendar(currentDate);