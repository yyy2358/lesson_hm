const myImage = document.querySelector('img');

myImage.onclick = () => {
    const mySrc = myImage.getAttribute('src');
    myImage.setAttribute("src",mySrc === "lyyy.jpg" ? "hhh.jpeg" : "lyyy.jpg")
}

const myButton = document.querySelector('button');

const myHeading = document.querySelector('h1');
//const 用于声明常量，一旦常量被赋值，就不能再重新赋值。
//let 用于声明变量，变量的值可以被重新赋值。
//const 和 let 都可以用于声明变量，但它们的作用域不同。

function setUserName() {
   let myName;
   while(true) {
    myName = prompt("请输入你的名字");
    if (myName === null) {
        break;
    }
    if (myName.trim() !== "") {
        myName = myName.trim();
        break;
    }
    alert("请输入有效的名字");
   } 
   if(myName){
    localStorage.setItem("name",myName);
    myHeading.textContent = `懒羊羊真可爱, ${myName}`;
 }
}

 if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `懒羊羊真可爱, ${storedName}`;
  }
myButton.onclick = () => {
    setUserName(); 
}