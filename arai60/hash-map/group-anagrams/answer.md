# 49. Group Anagrams

## STEP1

### 発想

* それぞれのwordに対して、以下を行う。
  * alphabetでsortしたワードを作成。
  * keyをsortしたword, valueを元々のwordを更新して追加する。
  * 最後にmapのvaluesのみ取り出す。

```javascript
const groupAnagrams = function (strs) {
    const sorted_word_to_anagrams = new Map()
    for (const original_word of strs) {
        const sorted_word = original_word.split('').sort().join()
        if (sorted_word_to_anagrams.get(sorted_word) === undefined) {
            sorted_word_to_anagrams.set(sorted_word, [])
        }
        const original_words = sorted_word_to_anagrams.get(sorted_word)
        original_words.push(original_word)
        sorted_word_to_anagrams.set(sorted_word, original_words)
    }
    const generator = sorted_word_to_anagrams.values()
    let next = generator.next()
    const ans = []
    while (!next.done) {
        ans.push(next.value)
        next = generator.next()
    }
    return ans
};
```

## STEP2

```javascript
const groupAnagrams = function (strs) {
    const sorted_word_to_anagrams = new Map()
    for (const original_word of strs) {
        const sorted_word = original_word.split('').sort().join()
        if (sorted_word_to_anagrams.get(sorted_word) === undefined) {
            sorted_word_to_anagrams.set(sorted_word, [original_word])
            continue
        }
        const original_words = sorted_word_to_anagrams.get(sorted_word)
        original_words.push(original_word)
        sorted_word_to_anagrams.set(sorted_word, original_words)
    }

    const ans = []
    const generator = sorted_word_to_anagrams.values()
    let next = generator.next()
    while (!next.done) {
        ans.push(next.value)
        next = generator.next()
    }
    return ans
};
```

## STEP3

```javascript
const groupAnagrams = function(strs) {
    const sorted_to_anagrams = new Map()
    for (const original_word of strs) {
        const sorted_word = original_word.split('').sort().join()
        if (!sorted_to_anagrams.has(sorted_word)) {
            sorted_to_anagrams.set(sorted_word, [original_word])
            continue
        }
        const original_words = sorted_to_anagrams.get(sorted_word)
        original_words.push(original_word)
        sorted_to_anagrams.set(sorted_word, original_words)
    }
    const ans = new Array()
    const generator = sorted_to_anagrams.values()
    let next = generator.next()
    while (!next.done) {
        ans.push(next.value)
        next = generator.next()
    }
    return ans
};
```

* 数字をカウントする方法

```javascript
const groupAnagrams = function(strs) {
    const valid_inputs = 'abcdefghijklmnopqrstuvwxyz'
    const key_to_anagrams = {}
    for (const word of strs) {
        const char_count = new Array(26).fill(0)
        for (const ch of word) {
            if (!valid_inputs.includes(ch)) {
                throw new Error("invalid input")
            }
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0)
            char_count[idx]++
        }
        const key = arrayToVarLenQuantity(char_count)
        if (key_to_anagrams[key] === undefined) {
            key_to_anagrams[key] = [word]
            continue
        }
        key_to_anagrams[key].push(word)
    }
    return Object.values(key_to_anagrams)
};

const arrayToVarLenQuantity = function(array) {
    for (let i = 0; i < array.length; i++) {
        // 問題の入力で、strs[i].length  <= 100のため。
        if (array[i] > 256) {
           throw new Error("invalid input")
        }
        if (array[i] < 16) {
            array[i] = '0x0' + array[i].toString(16)
            continue
        }
        array[i] = '0x' + array[i].toString(16)
    }
    return array.join('')
}
```

## 動かないコードの例

* (誤り)

```javascript
const groupAnagrams = function(strs) {
    const sorted_words = strs.map((word) => word.split('').sort().join(''))
    const indices = [...Array(strs.length).keys()]

    indices.sort((idx_a, idx_b) => sorted_words[idx_a] - sorted_words[idx_b])
    const ans = []
    let current_sorted_word = sorted_words[indices[0]]
    let anagrams = [strs[indices[0]]]
    for (let i = 1; i < indices.length; i++) {
        const original_word = strs[indices[i]]
        const sorted_word = sorted_words[indices[i]]
        if (sorted_word === current_sorted_word) {
            anagrams.push(original_word)
            continue
        }
        ans.push(anagrams)
        current_sorted_word = sorted_word
        anagrams = [original_word]
    }
    return ans
};
```

* 誤りは2点で、
  * stringの引き算をしてしまっており、NaNとなりソートが正しく機能しない。
  * For文の中でansにanagramsを追加するのが、不一致が発生したタイミングなので、
    最後のanagramsを追加ができていない。

* (正しい)

```javascript
const groupAnagrams = function(strs) {
    const sorted_words = strs.map((word) => word.split('').sort().join(''))
    const indices = [...Array(strs.length).keys()]

    // UPDATED.
    indices.sort((idx_a, idx_b) => sorted_words[idx_a].localeCompare(sorted_words[idx_b]))
    const ans = []
    let current_sorted_word = sorted_words[indices[0]]
    let anagrams = [strs[indices[0]]]
    for (let i = 1; i < indices.length; i++) {
        const original_word = strs[indices[i]]
        const sorted_word = sorted_words[indices[i]]
        if (sorted_word === current_sorted_word) {
            anagrams.push(original_word)
            continue
        }
        ans.push(anagrams)
        current_sorted_word = sorted_word
        anagrams = [original_word]
    }
    // UPDATED.
    ans.push(anagrams)
    return ans
};
```

## 感想

* Mapとobjectを使った方法があるが、それぞれの特徴について理解ができていなかった。調べたところ、Mapの方が優れているらしい。
  * 元々は、Objectがmapとして使われていた。
  * Mapは、以下の3点でobjectよりも優れている。
    * 1. 挿入した順序で、keyを操作(iterate)できること。
    * 2. sizeは、objectの場合自前で実装しないといけないが、mapの場合size関数を使える。
    * 3. Objectのkeyは、stringのdatatypeのみだが、mapのkeyは、Integerなどどのような型でも大丈夫なこと。
  * 参考 : https://stackoverflow.com/a/18541990


* Javascriptで取り組んでいるため、C++の言語仕様の議論についていけていない。
  * どこまで、C++の仕組みや議論について理解を進めるのが良いのだろうか?
  * 参考: https://github.com/Ryotaro25/leetcode_first60/pull/13/files#r1636916877

### コメント集を読んで

* Javascriptでは配列のnegative indexがないが、pythonではnegative indexが有効なため、
  不正なinputが入ってきた際に誤判定されることがある。

* 呼び出し側/関数側で、何を前提とエラーを検知しようとしないか、何のエラーを検知するかを意識する。

### 他の人のPRを読んで

* Pythonのdefaultdictのkeyについて、何を入力としてOKかを調べようとしたが、ドキュメントを探しても見つからず調べ方を教えて欲しいです。
  * 参考: https://github.com/olsen-blue/Arai60/pull/12/files#r1915836160

* olsen-blue
  * PR: https://github.com/olsen-blue/Arai60/pull/12/
  * Javascriptにはない、defaultdictを使うと、mapの初期化のコードが不要となる。

* Ryotaro25
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/13/
  * 赤黒木のコードの理解はSKIPし、Arai60をやり終えてから取り組むこととする。

* hayashi-ay
  * PR: https://github.com/hayashi-ay/leetcode/pull/19/ 
  * defaultdictのkeyに、tupleを使えることが知らなかった。

## その他の解法

### `*1` MapではなくObjectを用いる方法

```javascript
const groupAnagrams = function(strs) {
    const sorted_to_anagrams = {}
    for (const original_word of strs) {
        const sorted_word = original_word.split('').sort().join()
        if (sorted_to_anagrams[sorted_word] === undefined) {
            sorted_to_anagrams[sorted_word] = [original_word]
            continue
        }
        sorted_to_anagrams[sorted_word].push(original_word)
    }

    return Object.values(sorted_to_anagrams)
};
```
### `*2` AlgoExpertにあった回答
* 発想は、インデックスを保持した状態で、配列をAnagarmごとにソートする。
  これだと、Mapが不要になる。
  しかし、時間計算量は、他のN * W log W に比べて、N log N
* Javascriptで、rangeを作る方法はこちらのStackoverflowを参照した。
  参考: https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp

```javascript
const groupAnagrams = function(strs) {
    const sorted_words = strs.map((word) => word.split('').sort().join(''))
    const indices = [...Array(strs.length).keys()]

    indices.sort((idx_a, idx_b) => sorted_words[idx_a].localeCompare(sorted_words[idx_b]))
    const ans = []
    let current_sorted_word = sorted_words[indices[0]]
    let anagrams = [strs[indices[0]]]
    for (let i = 1; i < indices.length; i++) {
        const original_word = strs[indices[i]]
        const sorted_word = sorted_words[indices[i]]
        if (sorted_word === current_sorted_word) {
            anagrams.push(original_word)
            continue
        }
        ans.push(anagrams)
        current_sorted_word = sorted_word
        anagrams = [original_word]
    }
    ans.push(anagrams)
    return ans
};
```

### `*3` 文字数をカウントする方法もある

```javascript
const groupAnagrams = function(strs) {
    const valid_inputs = 'abcdefghijklmnopqrstuvwxyz'
    const key_to_anagrams = {}
    for (const word of strs) {
        const char_count = new Array(26).fill(0)
        for (const ch of word) {
            if (!valid_inputs.includes(ch)) {
                throw new Error("invalid input")
            }
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0)
            ++char_count[idx]
        }
        const key = JSON.stringify(char_count)
        if (key_to_anagrams[key] === undefined) {
            key_to_anagrams[key] = [word]
            continue
        }
        key_to_anagrams[key].push(word)
    }
    return Object.values(key_to_anagrams)
};
```

### `*4` 文字列のシリアライズ / エスケープシーケンス / 可変長数値表現で表現する。

* 文字列のシリアライズ

```javascript
        const key = JSON.stringify(char_count)
```

* エスケープシーケンス

```javascript
        const key = char_count.join("\t")
```

* 可変長数値表現 (Variable Length Quantity)

```javascript
const groupAnagrams = function(strs) {
    const valid_inputs = 'abcdefghijklmnopqrstuvwxyz'
    const key_to_anagrams = {}
    for (const word of strs) {
        const char_count = new Array(26).fill(0)
        for (const ch of word) {
            if (!valid_inputs.includes(ch)) {
                throw new Error("invalid input")
            }
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0)
            ++char_count[idx]
        }
        const key = arrayToVarLenQuantity(char_count)
        console.log(key)
        if (key_to_anagrams[key] === undefined) {
            key_to_anagrams[key] = [word]
            continue
        }
        key_to_anagrams[key].push(word)
    }
    return Object.values(key_to_anagrams)
};

const arrayToVarLenQuantity = function(array) {
    for (var i = 0; i < array.length; i++) {
        // 問題の入力で、strs[i].length  <= 100のため。
        if (array[i] > 256) {
           throw new Error("invalid input")
        }
        if (array[i] < 16) {
            array[i] = "0x0" + array[i].toString(16)
            continue
        }
        array[i] = "0x" + array[i].toString(16)
    }
    return array.join('')
}
```
