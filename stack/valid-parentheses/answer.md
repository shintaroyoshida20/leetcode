# 20. Valid Parentheses

## STEP 1

### 手作業でやってみる。

* `{`, `[`, `(`, `}`, `]`, `)` と書いた紙が一列に並んでいる
* 一番最初の紙から作業をしていく。
* 紙が`{`, `[`, `(` だったら、机の上に縦に積んでいく。
* 紙が`}`, `]`, `)` だったら、机の上の一番上から紙を取り、同じ種類の紙かを確認する。
* 作業が完了して、机の上に何も残っていない場合には、終了する。
* 机の上に何か残っている場合には、異常を報告する。

```
var isValid = function(characters) {
    const container = []
    const open_bracket_chars = ["(", "{", "["]
    for (const character of characters) {
        if (open_bracket_chars.includes(character)) {
            container.push(character)
        }
        if (character === ")") {
            const last_character = container.pop()
            if (last_character !== "(") {
                return false
            }
        }
        if (character === "]") {
            const last_character = container.pop()
            if (last_character !== "[") {
                return false
            }
        }
        if (character === "}") {
            const last_character = container.pop()
            if (last_character !== "{") {
                return false
            }
        }
    }
    if (container.length === 0) {
        return true
    }
    return false
};
```
## STEP 2

### やったこと
* 関数を分けた.

```
function doesMatchBracket(candidate, close_bracket) {
    if (candidate === "[" && close_bracket === "]") {
        return true
    }
    if (candidate === "{" && close_bracket === "}") {
        return true
    }
    if (candidate === "(" && close_bracket === ")") {
        return true
    }

    return false
}
var isValid = function(characters) {
    const container = []
    const open_bracket_chars = ["(", "{", "["]

    for (const character of characters) {
        // 開き括弧の場合
        if (open_bracket_chars.includes(character)) {
            container.push(character)
            continue
        }

        // 閉じ括弧の場合
        const open_bracket_candidate = container.pop()
        const close_bracket = character
        if (!doesMatchBracket(open_bracket_candidate, close_bracket)) {
            return false
        }
    }
    if (container.length === 0) {
        return true
    }

    return false
};
```

## STEP 3

```
/**
 * @param {string} s
 * @return {boolean}
 */
function doesMatchBracket(candidate, close_bracket_character) {
    if (candidate === "(" && close_bracket_character === ")") {
        return true
    }
    if (candidate === "[" && close_bracket_character === "]") {
        return true
    }
    if (candidate === "{" && close_bracket_character === "}") {
        return true
    }
    return false
}
var isValid = function(characters) {
    const container =[]
    const open_bracket_characters = ["(", "[", "{"]

    for (const character of characters) {
        if (open_bracket_characters.includes(character)) {
            container.push(character)
            continue
        }
        const open_bracket_candidate = container.pop()
        const close_bracket_character = character
        if (!doesMatchBracket(open_bracket_candidate, close_bracket_character)) {
            return false
        }
    }

    if (container.length === 0) {
        return true
    }
    return false
};
```
## 感想

### 他の人のコードを読んで

* BumbuShoji のPR https://github.com/BumbuShoji/Leetcode/pull/7
  * 開き括弧と閉じ括弧の対応関係を表すMapを用意しておく方法がある (`*1`)
  
  * はじめに、閉じ括弧があるケースを想定できていなかった。
    * 配列が要素数0の時に、pop()で、undefinedを返すため、たまたま上手く行った。 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop#return_value
    * 変更前
    ```
        const open_bracket_candidate = container.pop()
    ```
    * 変更後
    ```
        const open_bracket_candidate = container.pop() || ""
        const open_bracket_candidate = container.length > 0 ? container.pop() : ""
    ```

  * 最後のif文は、`return container.length === 0`、`return !arr.length` でも良い
    * 変更前

      ```
        if (container.length === 0) {
            return true
        }
        return false
      ```

    * 変更後

      ```
        return container.length === 0
      ```

## その他の解法

* `*1` 括弧の対応関係を表すMapを使う方法

```
var isValid = function(characters) {
    const open_to_close = new Map()
    open_to_close.set("(", ")")
    open_to_close.set("{", "}")
    open_to_close.set("[", "]")

    const container =[]
    for (const character of characters) {
        if (open_to_close.has(character)) {
            container.push(character)
            continue
        }
        const converted_last_character = open_to_close.get(container.pop())
        const close_bracket_character = character
        if (converted_last_character !== close_bracket_character) {
            return false
        }
    }
    return container.length === 0
};
```

* SanakoMeine のPR https://github.com/SanakoMeine/leetcode/pull/7 
  * 以下のコードが簡潔で読みやすい.


* `*2` 番兵をおく方法

  * 番兵をおく方法がる. (`*2`)
    * 以下の方法でさらに簡潔にかける.
    ```
        const bracket_pairs = new Map([
            ["{", "}"],
            ["(", ")"],
            ["[", "]"],
            ["*", ""],
        ])
        const container = ["*"]
    ```

```

function doesMatchBracket(candidate, close_bracket_character) {
    if (candidate === "(" && close_bracket_character === ")") {
        return true
    }
    if (candidate === "[" && close_bracket_character === "]") {
        return true
    }
    if (candidate === "{" && close_bracket_character === "}") {
        return true
    }
    return false
}
var isValid = function(characters) {
    const container =[]
    const open_bracket_characters = ["(", "[", "{"]
    container.push("SENTINEL")

    for (const character of characters) {
        if (open_bracket_characters.includes(character)) {
            container.push(character)
            continue
        }
        const open_bracket_candidate = container.pop()
        const close_bracket_character = character
        if (!doesMatchBracket(open_bracket_candidate, close_bracket_character)) {
            return false
        }
    }
    return container.length === 1 && container[container.length-1] === "SENTINEL"
};
```
