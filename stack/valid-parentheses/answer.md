# 20. Valid Parentheses

## STEP 1

### 手作業でやってみる。

* `{`, `[`, `(`, `}`, `]`, `)` と書いた紙が一列に並んでいる
* 一番最初の紙から作業をしていく。
* 紙が`{`, `[`, `(` だったら、机の上に縦に積んでいく。
* 紙が`}`, `]`, `)` だったら、机の上の一番上から紙を取り、同じ種類の紙かを確認する。
* 作業が完了して、机の上に何も残っていない場合には、終了する。
* 机の上に何か残っている場合には、異常を報告する。

```javascript
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

```javascript
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

```javascript
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
  * 開き括弧と閉じ括弧の対応関係を表すMapを用意することも可能。 (`*1`で解法を追加)
  
  * はじめに、閉じ括弧があるケースを想定できていなかった。
    * 配列が要素数0の時に、pop()で、undefinedを返すため、たまたま上手く行った。 
      参考 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop#return_value
      * 変更前

```javascript
    const open_bracket_candidate = container.pop()
```

      * 変更後

```javascript
    const open_bracket_candidate = container.pop() || ""
    const open_bracket_candidate = container.length > 0 ? container.pop() : ""
```

  * 最後のif文は、`return container.length === 0`、`return !arr.length` でも良い
    * 変更前

```javascript
  if (container.length === 0) {
      return true
  }
  return false
```

    * 変更後

```javascript
  return container.length === 0
```

* Odaのコメント https://discord.com/channels/1084280443945353267/1225849404037009609/1231646037077131315 
  * 不正な入力に対して、エラーハンドリングをどうするかという視点がなかった。
    https://github.com/lilnoahhh/leetcode/pull/7#discussion_r1948110757

    > open_to_close でデータは持ちたいです。文字列にカッコ以外が来たときに落ちないで欲しいからです。

     * 括弧以外の文字が入ってきた際のあるべきは、エラーログを吐き、exit 1で異常終了することと考えた。 https://discord.com/channels/1084280443945353267/1225849404037009609/1231648833914802267 
     * 異常終了、続行する(例外を投げる、特殊な値を返す)の選択肢を意識して、選べると良い。
       * 異常終了
         * エラーに気づきやすい。 https://github.com/mura0086/arai60/pull/11#discussion_r1986104852
         * 重要なエラー
       * 続行
         * 重要でないエラー
       
       参考 : https://discord.com/channels/1084280443945353267/1226508154833993788/1227171332131786774

    * 異常な入力への対応を頭に入れてコードを書く。
      参考 : https://discord.com/channels/1084280443945353267/1316770883729100810/1335077966954369095

      * 質問されたら、結果と選択肢と理由を回答できる状態にする。 

* lilnoahhhのPR https://github.com/lilnoahhh/leetcode/pull/7
  * Stringで判定する方法がある。
    * 変更前

```javascript
    const open_bracket_chars = ["(", "{", "["]
    if (open_bracket_chars.includes(character)) {
      //
    } 
```

    * 変更後

```javascript
    const open_brackets = "{(["
    if (open_brackets.includes(character)) {
      //
    } 
```


* SanakoMeine のPR https://github.com/SanakoMeine/leetcode/pull/7 
  * 簡潔で読みやすい.

## その他の解法

* `*1` 括弧の対応関係を表すMapを使う方法

```javascript
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

* `*2` 番兵をおく方法

  * 以下の方法でさらに簡潔にかける.

```javascript
    const bracket_pairs = new Map([
        ["{", "}"],
        ["(", ")"],
        ["[", "]"],
        ["*", ""],
    ])
    const container = ["*"]
```

```javascript
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

* `*3` 不正な入力のエラーハンドリングを行う解法
  * 正常終了(エラーログ)と異常終了の選択肢のうち、異常終了を選択する。

```javascript
const isValid = function(characters) {
    const open_to_close = new Map([
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ])
    const container = []
    const expected_characters = ["(", ")", "{", "}", "[", "]"]
    for (const character of characters) {
        if (!expected_characters.includes(character)) {
            throw new Error(`Invalid character. Expected : ${expected_character.join(",")}. Current : ${character}`) // UPDATE
        }
        if (open_to_close.has(character)) {
            container.push(character)
            continue
        }
        const expected_close_bracket = open_to_close.get(container.pop())
        const close_bracket_character = character
        if (expected_close_bracket !== close_bracket_character) {
            return false
        }
    }
    return container.length === 0
};
```

### レビューを受けて

#### レビューコメント1

* 変更前

```javascript
const isValid = function(characters) {
    const open_to_close = new Map([
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ])
    const container = []
    const expected_characters = ["(", ")", "{", "}", "[", "]"]
    for (const character of characters) {
        if (open_to_close.has(character)) {
            container.push(character)
            continue
        }
        const expected_close_bracket = open_to_close.get(container.pop())
        const close_bracket_character = character
        if (expected_close_bracket !== close_bracket_character) {
            return false
        }
    }
    return container.length === 0
};
```

* 変更後 (conatiner.pop()をする際にundefinedとstringの可能性を考慮する必要がある。)

```javascript
const isValid = function(characters) {
    const open_to_close = new Map([
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ])
    const container = []
    const expected_characters = ["(", ")", "{", "}", "[", "]"]
    for (const character of characters) {
        if (open_to_close.has(character)) {
            container.push(character)
            continue
        }
        // 箱の中身が空で、閉じ括弧が挿入された際には、falseを返す。
        if (container.length === 0) {
            return false
        }
        const expected_close_bracket = open_to_close.get(container.pop())
        const close_bracket_character = character
        if (expected_close_bracket !== close_bracket_character) {
            return false
        }
    }
    return container.length === 0
};
