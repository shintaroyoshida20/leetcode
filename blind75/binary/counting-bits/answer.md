# 338. Counting Bits

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる

- i = 0からnまで以下を繰り返す
  - bit maskで、countを数える

```javascript
const countBits = function(n) {
    const result = []
    for (let i = 0; i <= n; i++) {
        let mask = 1
        count = 0
        while (mask <= i) {
            if ((i & mask) > 0) {
                count++
            }
            mask <<= 1
        }
        result.push(count)
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

