# 387. First Unique Character in a String

## STEP1

### 発想
* 文字ごとの出現回数を数える。
* 先頭から1つずつ走査していく。
  * 出現回数が1の文字があった際には、そのインデックスを返却する。

```javascript
const firstUniqChar = function(s) {
    const char_to_count = new Map()
    for (const ch of s) {
        if (!char_to_count.has(ch)) {
            char_to_count.set(ch, 0)
        }
        const count = char_to_count.get(ch)
        char_to_count.set(ch, count + 1)
    }
    for (let i = 0; i < s.length; i++) {
        const ch = s[i]
        if (char_to_count.get(ch) === 1) {
            return i
        }
    }
    return -1
};
```

## STEP2

* pythonのdefaultdictのように、mapのkeyが存在しない際に0が入るように、
|| を用いて、書くほうが好みなのでこちらに修正した。

```javascript
const firstUniqChar = function(s) {
    const charToCount = new Map()
    for (const c of s) {
        const count = charToCount.get(c) || 0
        charToCount.set(c, count + 1)
    }
    for (let i = 0; i < s.length; i++) {
        if (charToCount.get(s[i]) === 1) {
            return i
        }
    }
    return -1
};
```

## STEP3

* 1分、1分、1分

```javascript
const firstUniqChar = function(s) {
    const charToCount = new Map()
    for (const c of s) {
        const count = charToCount.get(c) || 0
        charToCount.set(c, count + 1)
    }
    for (let i = 0; i < s.length; i++) {
        if (charToCount.get(s[i]) === 1) {
            return i
        }
    }
    return -1
};
```

## 感想

* For文が2周していた際に、1周でできないかと考えるのは、習慣化できそう。

* LinkedHashMap というデータ構造については、次に解くLRUの問題を解いた際に学習する。

### コメント集を読んで

## 他の人のPRを読んで

* hayashi-ayのコメント
  * Mapではなく、配列で出現回数を保持する方法がある。
  * 参照: https://discord.com/channels/1084280443945353267/1233603535862628432/1237973103670198292

* UTF-8, UTF-16
https://github.com/ichika0615/arai60/blob/96c3a36d478787dbe6fe0c03a45bc1e392be386d/arai60_15.md#%E4%BB%A5%E4%B8%8B%E5%8B%89%E5%BC%B7

* Ryotaro25
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/16/
  * 387.FirstUniqueCharacterinaString/step4.cpp の参照を実装している箇所が読めない。
    --> ポインターや参照の箇所が理解できていない。次の問題までに勉強する。

* Yoshiki-Iwasa
  * PR: https://github.com/Yoshiki-Iwasa/Arai60/pull/14
  * 思考プロセスが記述されていて、すごくレビューがしやすくなると思うので、自分も真似をする。
  * rustは文法が理解できていないので、公式ドキュメントを見ながら文法を検索できるようにする。

* olsen-blue 
  * PR: https://github.com/olsen-blue/Arai60/pull/15/
  * return -1とする際には、関数の呼び出し側でコメントを書くことがある。 
    https://github.com/olsen-blue/Arai60/pull/15/files#r1913610172
  * 多言語で予約後となっているものは、変数名として避けた方が良い。 
    https://github.com/olsen-blue/Arai60/pull/15/files#r1941265089 

* hayashi-ay
  * PR: https://github.com/hayashi-ay/leetcode/pull/28/
  * 個人的に、PythonやJavascriptのMapのkeyの入力順が保存されることを使用した
    方法(`*04`)が読みやすくて好み。
    https://github.com/hayashi-ay/leetcode/pull/28/files#diff-5ec7c3c87171edf4d61e9eb79fd926cafa27caf068da7474222897c8e9e7ab96R91-R107

* hroc135
  * PR: https://github.com/hroc135/leetcode/pull/15/
  * 「どの情報から順番に出してあげることで、より早く伝わるかを考える。 」をすぐに取り入れたい。
    https://github.com/hroc135/leetcode/pull/15/files#r1731514545
  * メモリにおけるキャッシュ効率について理解ができていないので、勉強する。

* kazukiii
  * PR: https://github.com/kazukiii/leetcode/pull/16/files
  * nodchipさんのコメント
    * 以下を理解できていないので、勉強する。
    > x64 アーキテクチャーを仮定するのであれば、値が 64 ビット (8 バイト) 以内に収まる場合は、
    > 参照にしないほうが良いと思います。理由は、値が 64 ビット (8 バイト) 以内に収まる場合、
    > 汎用レジスター 1 本に格納できるためです。

## その他の方法

* `*01` BruteForceアプローチ

```javascript
const firstUniqChar = function(s) {
    for (let i = 0; i < s.length; i++) {
        let isIthCharUnique = true
        for (let j = 0; j < s.length; j++) {
            if (i !== j && s[i] === s[j]) {
                isIthCharUnique = false
                break
            }
        }
        if (isIthCharUnique) {
            return i
        }
    }
    return -1
};
```

* `*02` キューを用いた方法 
  * 参照 :野田さんのコメント https://github.com/colorbox/leetcode/pull/29/files#r1861430039

```javascript
const firstUniqChar = function(s) {
    const container = []
    const charToCount = new Map()
    for (let i = 0; i < s.length; i++) {
        const pair = new Pair(i, s[i])
        container.push(pair)
        const count = charToCount.get(s[i]) || 0
        charToCount.set(s[i], count + 1)

        let top = container[0]
        while (container.length > 0 && charToCount.get(top.char) > 1){
            container.shift()
            top = container[0]
        }
    }
    if (container.length > 0) {
        return container[0].index
    }
    return -1
};
```

* `*03` 配列を用いた方法

```javascript
const firstUniqChar = function(s) {
    const charCount = new Array(26).fill(0)
    const aAsciiCode = 'a'.charCodeAt(0)
    const zAsciiCode = 'z'.charCodeAt(0)
    for (const c of s) {
        const ithCharAsciiCode = c.charCodeAt(0)
        if (ithCharAsciiCode < aAsciiCode && zAsciiCode < ithCharAsciiCode) {
            throw new Error('invalid input')
        }
        const idx = ithCharAsciiCode - aAsciiCode
        charCount[idx]++
    }
    for (let i = 0; i < s.length; i++) {
        const idx = s[i].charCodeAt(0) - aAsciiCode
        if (charCount[idx] === 1) {
            return i
        }
    }
    return -1
};
```

* `*04` JavaScriptのMapが順序を保持することを利用した方法

```javascript
const firstUniqChar = function(s) {
    const duplicated = new Set()
    const uniqueCharToIdx = new Map()
    for (let i = 0; i < s.length; i++) {
        if (duplicated.has(s[i])) {
            continue
        }
        if (uniqueCharToIdx.has(s[i])) {
            uniqueCharToIdx.delete(s[i])
            duplicated.add(s[i])
            continue
        }
        uniqueCharToIdx.set(s[i], i)
    }
    if (uniqueCharToIdx.size === 0) {
        return -1
    }
    const iterator = uniqueCharToIdx.values()
    return iterator.next().value
};
```

### コードの良し悪し

* `*10` 出現回数を数えて、1回だけ出現するものを見つけた際に、そのインデックスを返す方法
  * 空間計算量 : O(1)
  * 時間計算量 : O(N) for文が2周している。

* `*11` Brute Forceアプローチ
  * 空間計算量 : O(1)
  * 時間計算量 : O(N^2)

* `*12` キューを用いた方法
  * 空間計算量 : O(N) キューを用いている。
  * 時間計算量 : O(N) for文が1周している。

* `*13` 配列を用いた方法
  * 空間計算量 : O(1)
  * 時間計算量 : O(N) for文が2周している。

* `*14` JavaScriptのMapが順序を保持することを利用した方法
  * 空間計算量 : O(N) duplicatedのSetで、O(N)の空間計算量が必要。
  * 時間計算量 : O(N) for文が1周している。

## 調べたこと

* str.encode関数は、UTF-8にエンコードされる.
  https://docs.python.org/3/library/stdtypes.html#str.encode

* String.prototype.charCodeAt() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

> charCodeAt() always indexes the string as a sequence of UTF-16 code units,
> so it may return lone surrogates. To get the full Unicode code point
> at the given index, use String.prototype.codePointAt().

```javascript
const c = "𩸽";

console.log(c.length); // 2 (2つのコードユニットで構成)
console.log(c.charCodeAt(0)); // 55399 (高位サロゲート)
console.log(c.charCodeAt(1)); // 56893 (低位サロゲート)
console.log(c.codePointAt(0)) // 171581 (UniCodeコードポイント)

const codePoint = c.codePointAt(0)
// codePoint = (highSurrogate - 0xD800) * 0x400 + (lowSurrogate - 0xDC00) + 0x10000
highSurrogate = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800 // 55399
lowSurrogate = ((codePoint - 0x10000) % 0x400) + 0xDC00 // 56893
console.log(highSurrogate === c.charCodeAt(0)) // true
console.log(lowSurrogate === c.charCodeAt(1)) // true
```

* ord() は、Unicode CodePointが返却される。
https://docs.python.org/3/library/functions.html#ord

* PythonのOrderedDictは、双方向連結リストとHash Tableでできている。 

* C++のmapは、keyでソートされている。
  https://cplusplus.com/reference/map/map/

* Pythonのcollections.Counterの内部実装 
  * https://github.com/python/cpython/blob/a66bae8bb52721ea597ade6222f83876f9e939ba/Lib/collections/__init__.py#L551
  * Pure Pythonで書かれている。

* Goにおけるmapの内部実装 
  https://github.com/golang/go/blob/eb4069127a7dbdaed480aed80ba6ed1b2ea27901/src/internal/runtime/maps/map.go

* ハッシュ表の理解 (kumagiさんのスライド)
  * OpenAddressing, ClosedAddressingのところまで読んだ。
  https://www.docswell.com/s/kumagi/ZGXXRJ-hash-table-world-which-you-dont-know
