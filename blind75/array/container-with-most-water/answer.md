# 11. Container With Most Water

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる

- 2ポインターを用意する。1つは、左端、もう1つは右端に置く。 
- ポインターが一致するまで以下の作業を繰り返す。
  - 1. 2つのポインターで小さい方を動かす。
    - 大きい方のポインターは、最大の面積となる時に使用する可能性があるため、
      動かさない。
  - 2. 小さ方のポインターの高さをマークしておく。
  - 3. その高さより大きい高さのポインターが見つかった際に1に戻る。

```javascript
const maxArea = function(height) {
    let left = 0
    let right = height.length - 1 
    let maxArea = Math.min(height[left], height[right]) * (right - left)
    while (left < right) {
        const leftHeight = height[left]
        const rightHeight = height[right]
        if (leftHeight <= rightHeight) {
            while ( height[left] <= leftHeight && left < right) {
                left++
            }
            const currentArea = Math.min(height[left], height[right]) * (right - left)
            maxArea = Math.max(maxArea, currentArea)
            continue
        }
        while (height[right] <= rightHeight && left < right) {
            right--
        }
        const currentArea = Math.min(height[left], height[right]) * (right - left)
        maxArea = Math.max(maxArea, currentArea)
    }
    return maxArea
};
```

## STEP2

```javascript
const calculateArea = function(height, left, right) {
    const width = right - left
    const containerHeight = Math.min(height[left], height[right])
    return containerHeight * width
}
const maxArea = function(height) {
    let left = 0
    let right = height.length - 1
    let maxArea = calculateArea(height, left, right)

    while (left < right) {
        const area = calculateArea(height, left, right)
        maxArea = Math.max(maxArea, area)

        if (height[left] < height[right]) {
            left++
            continue
        }
        right--
    }
    return maxArea
};
```

## STEP3

```javascript
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

* `*1` インデックスを1つずつ移動させ、候補を絞っていく方法.

```javascript
const calculateArea = function(height, left, right) {
    const width = right - left
    const containerHeight = Math.min(height[left], height[right])
    return containerHeight * width
}
var maxArea = function(height) {
    let left = 0
    let right = height.length - 1
    let maxArea = calculateArea(height, left, right)

    while (left < right) {
        const area = calculateArea(height, left, right)
        maxArea = Math.max(maxArea, area)

        if (height[left] < height[right]) {
            left++
            continue
        }
        right--
    }
    return maxArea
};
```

- `*2` 候補になり得ないインデックスはSkipして、2ポインターで候補を絞っていく方法

```javascript
const maxArea = function(height) {
    let left = 0
    let right = height.length - 1 
    let maxArea = Math.min(height[left], height[right]) * (right - left)
    while (left < right) {
        const leftHeight = height[left]
        const rightHeight = height[right]
        if (leftHeight <= rightHeight) {
            while ( height[left] <= leftHeight && left < right) {
                left++
            }
            const currentArea = Math.min(height[left], height[right]) * (right - left)
            maxArea = Math.max(maxArea, currentArea)
            continue
        }
        while (height[right] <= rightHeight && left < right) {
            right--
        }
        const currentArea = Math.min(height[left], height[right]) * (right - left)
        maxArea = Math.max(maxArea, currentArea)
    }
    return maxArea
};
```

* `*3` 組み合わせを総当たりで試す方法

```javascript
const maxArea = function(height) {
    let maxArea = -Infinity
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i
            const containerHeight = Math.min(height[i], height[j])
            maxArea = Math.max(maxArea, containerHeight * width)
        }
    }
    return maxArea
};
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

