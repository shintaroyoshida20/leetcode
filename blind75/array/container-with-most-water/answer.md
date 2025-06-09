# 11. Container With Most Water

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる

- 2ポインターを用意する。1つは、左端、もう1つは右端に置く。 
- ポインターが一致するまで以下の作業を繰り返す。
  - 1. 2つのポインターで小さい方を動かす。
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

