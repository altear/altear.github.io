import style from "./style.scss";
import "bootstrap";

function foo() {
  var el = document.createElement("div");
  el.innerHTML = "Hello world!";
  el.className = style.firstStyle;
  console.log(style.firstStyle);
  return el;
}

document.body.appendChild(foo());
