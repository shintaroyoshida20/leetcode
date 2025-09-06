# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

```javascript
const getSum = function(a, b) {
    const except_carry = a ^ b
    const carry = (a & b) << 1
    return except_carry + carry
};
```

```javascript
// a is positive
// b is positiveの時
const getSum = function(a, b) {
    while (b !== 0) {
        const sum_without_carry = a ^ b
        const carry = (a & b) << 1
        a = sum_without_carry
        b = carry
    }
    return a
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

* `*1`

## 調べたこと

