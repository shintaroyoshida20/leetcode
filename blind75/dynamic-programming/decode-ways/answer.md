# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 最初に間違った時のコード

```javascript
const numDecodings = function(s) {
    const decodeWays = new Array(s.length + 1).fill(0)
    decodeWays[1] = 1
    for (let i= 2; i <= s.length; i++) {
        const previousLetter = s[i - 2]
        const letter = s[i - 1]
        
        if (previousLetter === '1') {
            decodeWays[i] = decodeWays[i - 2] + decodeWays[i - 1]
            continue
        }
        if (previousLetter === '2' && parseInt(letter) <= 6) {
            decodeWays[i] = decodeWays[i - 2] + decodeWays[i - 1]
            continue
        }
        decodeWays[i] = decodeWays[i - 1]
    }
    return decodeWays[s.length]
};
```

```javascript
const numDecodings = function(s) {
    if (s[0] === '0') {
        return 0
    }
    const decodeWays = new Array(s.length + 1).fill(0)
    decodeWays[0] = 1
    decodeWays[1] = 1
    for (let i= 2; i < s.length; i++) {
        const previousLetter = s[i - 2]
        const letter = s[i - 1]
        const nextLetter = s[i]
        if (previousLetter === '0' && letter === '0') {
            return 0
        }
        if (3 <= parseInt(previousLetter) && letter === '0') {
            return 0
        }
        if (nextLetter === '0') {
            decodeWays[i] = decodeWays[i - 1]
            continue
        }
        if (previousLetter === '1' && 1 <= parseInt(letter)) {
            decodeWays[i] = decodeWays[i - 2] + decodeWays[i - 1]
            continue
        }
        if (previousLetter === '2' && 1 <= parseInt(letter) && parseInt(letter) <= 6) {
            decodeWays[i] = decodeWays[i - 2] + decodeWays[i - 1]
            continue
        }
        decodeWays[i] = decodeWays[i - 1]
    }

    const previousLetter = s[s.length - 2]
    const letter = s[s.length - 1]
    if (previousLetter === '0' && letter === '0') {
        return 0
    }
    if (3 <= parseInt(previousLetter) && letter === '0') {
        return 0
    }
    if (previousLetter === '1' && 1 <= parseInt(letter)) {
        decodeWays[s.length] = decodeWays[s.length - 2] + decodeWays[s.length - 1]
    } else if (previousLetter === '2' && 1 <= parseInt(letter) && parseInt(letter) <= 6) {
        decodeWays[s.length] = decodeWays[s.length - 2] + decodeWays[s.length - 1]
    } else {
        decodeWays[s.length] = decodeWays[s.length - 1]
    }
    return decodeWays[s.length]
};
```

## STEP2

```javascript
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

### コードの良し悪し

* `*0`
  * 時間計算量:
  * 空間計算量:

* `*1`
  * 時間計算量:
  * 空間計算量:

* `*2`
  * 時間計算量:
  * 空間計算量:

## 調べたこと
