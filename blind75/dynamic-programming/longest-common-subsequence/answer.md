# 1143. Longest Common Subsequence

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる。 

  a b c d e 

a 1 1 1 1 1
c 1 1 2 2 2
e 1 1 2 2 3

```javascript
const longestCommonSubsequence = function(text1, text2) {
    const commonTable = new Array(text2.length + 1).
        fill(0).
        map(() => new Array(text1.length + 1).fill(0))
    for (let row = 1; row <= text2.length; row++) {
        for (let col = 1; col <= text1.length; col++) {
            const tmp_max = Math.max(
                commonTable[row - 1][col - 1], 
                Math.max(
                    commonTable[row - 1][col],
                    commonTable[row][col - 1],
                )
            )
            if (text2[row - 1] === text1[col - 1]) {
                commonTable[row][col] = tmp_max + 1
                continue
            }
            commonTable[row][col] = tmp_max
        }
    }
    return commonTable[text2.length][text1.length]
};
```

- 動的計画法を用いた正しいコード

```javascript
const longestCommonSubsequence = function(text1, text2) {
    const commonTable = new Array(text2.length + 1).
        fill(0).
        map(() => new Array(text1.length + 1).fill(0))
    for (let row = 1; row <= text2.length; row++) {
        for (let col = 1; col <= text1.length; col++) {
            if (text2[row - 1] === text1[col - 1]) {
                commonTable[row][col] = commonTable[row - 1][col - 1] + 1
                continue
            }
            commonTable[row][col] = Math.max(
                commonTable[row - 1][col],
                commonTable[row][col - 1]
            )
        }
    }
    return commonTable[text2.length][text1.length]
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

