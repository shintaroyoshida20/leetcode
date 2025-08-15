# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 直前の要素と今の要素を比較して、同じだった場合には、カウントを一つ追加する。
この後の思考に進めなかったので、回答を見た。


```javascript
const eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1])

    let k = -Infinity
    let count = 0
    for (let i = 0; i < intervals.length; i++) {
        const start = intervals[i][0]
        const end = intervals[i][1]
        if (k <= start) {
            k = end
            continue
        }
        count++
    }
    return count
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

- 誤った時のコード

```javascript
const eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 1) {
        return 0
    }
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0]
        }
        return a[1] - b[1]
    })
    console.log(intervals)
    let idx = 1
    let count = 0
    while (idx < intervals.length) {
        while (idx < intervals.length && intervals[idx - 1][0] === intervals[idx][0]) {
            count++
            idx++
        }
        while (idx < intervals.length && intervals[idx][1] < intervals[idx - 1][1]) {
            count++
            idx++
        }
        idx++
    }
    return count
};
```

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

