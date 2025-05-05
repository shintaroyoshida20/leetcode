# 49. Group Anagrams

## STEP1

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
```

## 感想

### コメント集を読んで

## その他の解法

