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

* 

### コメント集を読んで

## 他の人のPRを読んで

* hayashi-ayのコメント
  * Mapではなく、配列で出現回数を保持する方法がある。
  * 参照: https://discord.com/channels/1084280443945353267/1233603535862628432/1237973103670198292


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

### コードの良し悪し

* `*0`

* `*1`

## 調べたこと


