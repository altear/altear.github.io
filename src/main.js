function foo() {
  var el = document.createElement("div");
  el.innerHTML = "Hello world!";
  return el;
}

foo = () => {
  [0, 1, 2].forEach(x => x + 1);
};
document.body.appendChild(foo());
