const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "img/lyyy.jpg") {
    myImage.setAttribute("src", "img/hhh.jpeg");
  } else {
    myImage.setAttribute("src", "img/lyyy.jpg");
  }
};
// getAttribute() 是 DOM 元素对象的一个方法，其主要作用是获取指定元素上某个属性的值

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("请输入你的名字");
    if (!myName) {
        setUserName();
      } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `懒羊羊真可爱, ${myName}`;
  }}
//prompt() 函数，需要用户输入数据，并在用户点击确定后将数据存储在一个变量中。
// 调用 localStorage API，它允许我们将数据存储在浏览器中并供后续获取。
// localStorage 的 setItem() 函数用于创建并存储数据，接受一个键和一个值作为参数。
if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `懒羊羊真可爱, ${storedName}`;
  }
//getItem() 函数，其作用是根据传入的键名从 localStorage 中获取对应的值。
  
myButton.onclick = function () {
    setUserName();
  };
  

  //自己写一遍