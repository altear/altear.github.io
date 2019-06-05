import styles from "./styles.less";

var el = document.createElement("h1");
el.innerHTML = "Hello World123";
el.className = styles.myClass;
document.body.appendChild(el);

console.log("Hello world");
