# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

```javascript
const merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    let idx = 0 
    const result = []
    while (idx < intervals.length) {
        let start = intervals[idx][0]
        let end = intervals[idx][1]
        while (idx + 1 < intervals.length && intervals[idx + 1][0] <= end) {
            start = Math.min(start, intervals[idx + 1][0])
            end = Math.max(end, intervals[idx + 1][1])
            idx++
        }
        result.push([start, end])
        idx++
    }
    return result
};
```

## STEP2

```javascript
```

## STEP3

```javascript
```

- Wrong Codebase
 
```javascript
const merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    let idx = 0 
    const result = []
    while (idx < intervals.length) {
        let start = intervals[idx][0]
        let end = intervals[idx][1]
        while (idx + 1 < intervals.length && intervals[idx + 1][0] <= end) {
            start = Math.min(intervals[idx][0], intervals[idx + 1][0])
            end = Math.max(intervals[idx][1], intervals[idx + 1][1])
            idx++
        }
        result.push([start, end])
        idx++
    }
    return result
};
```

```javascript
const merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    let idx = 0 
    const result = []
    while (idx < intervals.length) {
        let start = intervals[idx][0]
        let end = intervals[idx][1]
        while (idx + 1 < intervals.length && intervals[idx + 1][0] <= end) {
            start = Math.min(start, intervals[idx + 1][0])
            end = Math.max(end, intervals[idx + 1][1])
            idx++
        }
        result.push([start, end])
        idx++
    }
    return result
};
```
## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

- `*2` 配列に足してからマージする方法

```javascript
const merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])

    const result = []
    for (let i = 0; i < intervals.length; i++) {
        const [start, end] = intervals[i]
        if (result.length === 0 || result[result.length - 1][1] < start) {
            result.push(intervals[i])
            continue
        }
        result[result.length - 1][1] = Math.max(end, result[result.length - 1][1])
    }
    return result
};f
```

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

