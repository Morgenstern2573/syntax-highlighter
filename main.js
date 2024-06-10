let keywords = ["var", "type", "struct", "false", "true"];
function tokenizer(input) {
  let current = 0;

  let tokens = [];

  while (current < input.length) {
    let char = input[current];
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
        len: 1,
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
        len: 1,
      });
      current++;
      continue;
    }
    if (char === "{") {
      tokens.push({
        type: "brace",
        value: "{",
        len: 1,
      });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({
        type: "brace",
        value: "}",
        len: 1,
      });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({
        type: "comma",
        value: ",",
        len: 1,
      });
      current++;
      continue;
    }

    let OPERATOR = /[\.+=:\-*\\]/;
    if (OPERATOR.test(char)) {
      tokens.push({
        type: "operator",
        value: char,
        len: 1,
      });
      current++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      tokens.push({
        type: "space",
        value: char,
        len: 1,
      });
      current++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "number", value, len: value.length });
      continue;
    }

    if (char === '"') {
      let value = '"';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      value += '"';
      char = input[++current];
      tokens.push({ type: "string", value, len: value.length });
      continue;
    }

    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "name", value, len: value.length });

      continue;
    }
    throw new TypeError("I dont know what this character is: " + char);
  }

  return tokens;
}

function highlightText(src) {
  tokens = tokenizer(src);
  let output = "";
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "space") {
      if (token.value === "\n") {
        output += "<br/>";
      } else {
        output += token.value;
      }

      continue;
    }

    let classVar = "";

    if (token.type === "paren" || token.type === "brace") {
      classVar = "purple";
    } else if (token.type === "name") {
      if (keywords.includes(token.value)) {
        classVar = "blue";
      } else if (i < tokens.length - 1 && tokens[i + 1].type == "paren") {
        classVar = "yellow";
      } else {
        classVar = "aqua";
      }
    } else if (token.type === "number") {
      classVar = "lime";
    } else if (token.type === "string") {
      classVar = "brown";
    }

    output += `<span class="${classVar}">${token.value}</span>`;
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
  document.getElementById("output").innerHTML = outText;
});
