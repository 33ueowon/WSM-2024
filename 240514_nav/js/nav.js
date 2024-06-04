//반응형 웹의 JavaScript에서 하는 일
//1. HTML 요소를 가져와 js변수에 저장한다.
//2. 이벤트를 퍼리한다.(click,foucus,mouseup 등)
//3.클래스를 수정하여 스타일을 적용한다.


//.nav-list
//.nav-toggle

//햄버거 메뉴-> 닫기버튼
//.nav-list 아래로 내리자

//닫기 버튼 -> 햄버거 메뉴
//.nav-list 위로 올리자

const toggleMenu = () => {
    // HTML요소 -> js
    //const  = 상수 
    const navToggleDiv = document.getElementsByClassName("nav-toggle")[0]; //.nav-toggle 가져오자
    const navListUI = document.getElementsByClassName("nav-list")[0];   //.nav-list가져오자
    const toggleI = navToggleDiv.getElementsByTagName("i")[0];  //.nav-toggle> <i> 가져오자

    navToggleDiv.onclick = () => {
        //class에 show-menu를 붙이거나/때자
        navListUI.classList.toggle("show-menu");

        //toggle icon 바꾸자: bi-list <-> bi-x-lg
        toggleI.classList.toggle("bi-list");
        //toggleI.classList.add("bi-list");
        //toggleI.classList.remove("bi-x-lg");
        //toggleI.classList.add("bi-x-lg");
        //toggleI.classList.remove("bi-list");
        toggleI.classList.toggle("bi-x-lg");
    }
}
toggleMenu();