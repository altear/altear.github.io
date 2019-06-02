import style from "./style.scss";

function foo() {
  var el = document.createElement("div");
  el.innerHTML = "Hello world!";
  el.className = style.firstStyle;
  return el;
}

document.body.appendChild(foo());
