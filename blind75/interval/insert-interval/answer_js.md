# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

- 間違えた時のコード
  - intervals: [[0,1], [3,4]] newInterval: [2, 2]
  の時、返り値が[[0,1], [3,4]]となってしまう。
```javascript
const insert = function(intervals, newInterval) {
    if (intervals.length === 0) {
        return [newInterval]
    }
    const newIntervals = []
    let [newStart, newEnd] = newInterval
    let i = 0
    if (newInterval[1] < intervals[0][0]) {
        newIntervals.push(newInterval)
    }
    while (i < intervals.length) {
        let [start, end] = intervals[i]
        if (0 < i && intervals[i - 1][1] < newStart && newEnd < start) {
            newIntervals.push([newStart, newEnd])
        }
        if (end < newStart || newEnd < start) {
            newIntervals.push([start, end])
            i++
            continue
        }

        while (i < intervals.length && intervals[i][0] <= newEnd) {
            let [start, end] = intervals[i]
            newStart = Math.min(start, newStart)
            newEnd = Math.max(end, newEnd)
            i++
        }
        newIntervals.push([newStart, newEnd])
    }
    if (intervals[intervals.length - 1][1] < newStart) {
        newIntervals.push(newInterval)
    }
    return newIntervals
};
```

## STEP2

```javascript
const insert = function(intervals, newInterval) {
    const result = []
        idx++
    }

    while (idx < intervals.length && intervals[idx][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[idx][0])
        newInterval[1] = Math.max(newInterval[1], intervals[idx][1])
        idx++
    }

    result.push(newInterval)
    while (idx < intervals.length) {
        result.push(intervals[idx])
        idx++
    }
    return result
};
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

