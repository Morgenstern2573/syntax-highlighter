function highlightText(src) {
  tokens = src.split(" ");
  let output = "";
  for (let token of tokens) {
    if (token === "var") {
      output += `<span class="keyword">${token}</span>`;
    } else {
      output += `<span>${token}</span>`;
    }
  }
  return output;
}

const form = document.getElementById("src-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const srcText = document.getElementById("source-text").innerText;
  console.log(srcText);
  const outText = highlightText(srcText);
  console.log(outText);
  document.getElementById("output-cont").innerHTML = outText;
});
