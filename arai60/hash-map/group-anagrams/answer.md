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

## 感想

### コメント集を読んで

## その他の解法

* `*1` MapではなくObjectを用いる方法
