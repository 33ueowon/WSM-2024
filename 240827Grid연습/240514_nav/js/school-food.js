// 현재 날짜를 저장하는 변수 선언
let currentDate = new Date();

// 날짜, 요일을 화면에 표시하는 함수 
const displayDate = () => {
    // 요일을 나타내는 문자열을 선언
    let days = "일월화수목금토";
    // 현재 월 가져오기(month는 0부터 시작, +1 해줘야 함)
    let month = currentDate.getMonth() + 1
    // 현재 날짜 가져오기
    let date = currentDate.getDate();
    // 현재 요일 가져오기 (0:일요일, 1:월요일....)
    let day = currentDate.getDay();
    days = days.split("");  /* 일월화수목금토 --> ['일', '월', ...] (문자열을 쪼개서 리스트로 만든다.)*/
    // days = days.charAt(day); //위에 split이 아닌 charAt 써도됨.
    // 제목 텍스트를 변경
    const schoolFoodTitleHeader = document.getElementsByClassName("school-food-title")[0];
    const titleText = `🍚 ${days[day]}요일(${month}/${date})의 메뉴 🍚`
    schoolFoodTitleHeader.innerText = titleText;    //innerText = 텍스트 사이에 들어가는 ~
}

// 날짜 변경하고 화면에 표시하는 함수
// diff = 다른 점

//학교 급식 API 이용해서 급식 정보 가져오자(API = application programming interface)

const API_KEY = "b09d0a4dc0f348129964c148b0daf62e";
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const ATPT_OFCDC_SC_CODE = "B10";
const SD_SCHUL_CODE = "7011569";
const TYPE = "json";

const getSchoolFoodMenu = (dateData) => {
    let api_url = `${URL}?\
KEY=${API_KEY}\
&Type=${TYPE}\
&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}\
&SD_SCHUL_CODE=${SD_SCHUL_CODE}\
&MLSV_YMD=${dateData}`;


    // //동기요청
    // window.location.href = api_url;

    // console.log(api_url);
    // 비동기 요청
    //error 없이 응답오면, 데이터 처리
    //error 있으면, 에러 처리
    //함수(파라1).then().catch()

    fetch(api_url)  //api_url에 비동기적으로 요청
        .then((response) => response.json())
        .then((data) => setSchoolFoodMenu(data))    //학교 급식정보를 HTML에 표시하자
        .catch((error) => console.error(error))


}

//학교 급식 정보 표시하다.
const setSchoolFoodMenu = (data) => {
    // console.log(data);
    //html -> js 변수 
    const breakfastMenuUl = document.getElementsByClassName("menu breakfast")[0];
    const lunchMenuUl = document.getElementsByClassName("menu lunch")[0];
    const dinnerMenuUl = document.getElementsByClassName("menu dinner")[0];
    //초기화 안하면 기존 값이 남아있음! 주의!
    breakfastMenuUl.innerHTML = "<li>급식정보가 없습니다</li>";
    lunchMenuUl.innerHTML = "<li>급식정보가 없습니다</li>";
    dinnerMenuUl.innerHTML = "<li>급식정보가 없습니다</li>";
    // console.log(breakfastMenuUl, lunchMenuUl, dinnerMenuUl);
    //data 적절히 처리 :  조식음식들, 중식 음식들, 석식음식들
    //식사들 가져오자
    //급식 정보가 없을 때, data["mealServiceDietInfo"] undefined로 바뀐다.
    if(data["mealServiceDietInfo"] === undefined) return;
    const menuData = data["mealServiceDietInfo"][1]["row"];
    // let menuFood = "";  //음식 하나씩 <li>태그로 감싼 더
    //하나씩 꺼내ㅐ자
    menuData.forEach((menuRow) => {
        let menuFood = "";
        //음식들 가져오자
        let menu = menuRow["DDISH_NM"];
        //menu : 음식 (1.3.4.5)<br/> 음식2.(s)<br/>음식 3(j)
        //정규표현식 : (...) 찾아서 ""로 대체
        menu = menu.replace(/\([^()]*\)/g,"");
        //정규표현식 : . 찾아서 ""로 대체
        menu = menu.replace(/\./g,"");
        //정규표현식 : * 찾아서 ""로 대체
        menu = menu.replace(/\*/g,"");
        //음식들<br>태그로 나누자
        menu = menu.split("<br/>");
        //하나씩 꺼내어 <li class="menu-food">하나의 꺼낸 음식</li>
        menu.forEach((food) => {
            menuFood += `<li class = "menu-food">${food}</li>\n`;
        });

        //js 변수 -> Html 표시
        if(menuRow["MMEAL_SC_NM"]=== "조식"){
            breakfastMenuUl.innerHTML = menuFood;
        }else if(menuRow["MMEAL_SC_NM"]=== "중식"){
            lunchMenuUl.innerHTML = menuFood;
        }else if(menuRow["MMEAL_SC_NM"]=== "석식"){
            dinnerMenuUl.innerHTML = menuFood;
        }
    });
}; 
const changeDate = (diff) => {
    // 현재 날짜에 diff만큼 더하거나 빼기
    currentDate.setDate(currentDate.getDate() + diff);
    // 변경된 날짜를 화면에 표시
    displayDate();

    // YYYYMMDD로 변환하고
    const dateData = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
    getSchoolFoodMenu(dateData);
}
changeDate(0);  //체이지 열자마자 오늘 날짜 구해서 표시하자
// displayDate()