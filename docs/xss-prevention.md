# XSS Prevention

## 在 TypeScript 中使用模板字符串预防 XSS

```js
// https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md

// a sample tag function
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;");
    }

    // add the last literal
    result += literals[literals.length - 1];
    return result;
}

let say = "a bird in hand > two in the bush"; // data from third party
let html = htmlEscape`<div> I would just like to say : ${say}</div>`; // your code

console.log(html); // <div> I would just like to say : a bird in hand &gt; two in the bush</div>
```

可以看出跟随 `htmlEscape` 后面的模板字符串中，只有外部数据（变量 `say`）的非法字符被转义了。我们可以使用这种方式防御 XSS，方便简洁。
