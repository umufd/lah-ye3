let select = document.querySelector(".currency-country");
let inputFrom = document.querySelector(".input-from");
let inputTo = document.querySelector(".input-to");
let valutaParagraphFrom = document.querySelector(".paragraph-from");
let valutaParagraphTo = document.querySelector(".paragraph-to");
let from, to;



select.addEventListener("click", selectCurrency);
function selectCurrency(e) {
  let targetSpace = e.target;
  Array.from(targetSpace.parentElement.children).forEach((x) =>x.removeAttribute("style"));
  if (targetSpace.parentElement.className.indexOf("country-money-from") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    from = targetSpace.textContent;
    getDataFrom();
  } else if (targetSpace.parentElement.className.indexOf("country-money-to") !== -1) {
    targetSpace.setAttribute("style", "background: #833AE0;color:#fff");
    to = targetSpace.textContent;
    getDataFrom();
  }
}

inputFrom.addEventListener("keyup", getDataFrom);
 function getDataFrom() {
  
  // const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  // const data = await res.json();
 
  fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
  .then(res => res.json())
  .then(data => {
    inputTo.value =( Object.values(data.rates)[0] * inputFrom.value).toFixed(5);
    if(from && to){
    valutaParagraphFrom.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
    valutaParagraphTo.textContent = `1 ${Object.keys(data.rates)} = ${(1/Object.values(data.rates)[0]).toFixed(2)} ${data.base}`;
    }
  })

}

inputTo.addEventListener("keyup", getDataTo)
 function getDataTo() {
  // const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  // const data = await res.json();

  fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
  .then(res => res.json())
  .then(data => {
    inputFrom.value = (inputTo.value / Object.values(data.rates)[0]).toFixed(2);
  })
}

