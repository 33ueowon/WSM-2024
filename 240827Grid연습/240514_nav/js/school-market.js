let allData;
const showData = (data) => {
    //data에서 하니씩 뽑아서 <article> -> .product-container의 자식으로 넣자 <- HTML
    const productContainerSection = document.getElementsByClassName("product-container")[0];
    //element 하나 있으면 괄호 안적어도 됨~
    articleString = "";
    data.forEach(element => {
        articleString += `             <article class="product-item">
                <img src="images/${element["image"]}" alt="${element.name}" class="product-image"> <!--img.product-->
                <div class="product-name">${element.name}</div>    <!--.product-name-->
            </article>\n`
    });

    productContainerSection.innerHTML = articleString;
}
const setData = (data) => {
    allData = data;
    showData(data);
    // array = {'name':'a','price':'b','image':'c'}
    //무뚝뚝.webp출력하자   시험?일듯!~
    // console.log(data[3].image);
    // console.log(data[3]["image"])
    // //허니버터칩 출력하자 
    // console.log(data[9].image);
    // console.log(data[9]["image"]);
}
const getData = (() =>{
    const url = 'js/data (1).json';
    fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.log(error));
});
getData();
const searchData = (query) => {
    //data 하나씩 꺼내어, name이랑 query 비교해서 있으면, 모아놓자.
    let searchData = allData.filter((oneData) => oneData["name"].includes(query) ||oneData["category"].includes(query));
    showData(searchData);
    // data.forEach(element => {
    //     element.name.includes(query)
    // });
}