# Title

## STEP1

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

* 特に修正する箇所が見つけられなかった。

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

## STEP3

* 他の方法を考えてみる。

```javascript
```

## 感想

### コメント集を読んで

## その他の解法

* `*1` 
