# 217. Contains Duplicate

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる

* 数字の紙を持った人が一列に並んでいる。 
* 先頭から以下の作業を行う。
  * 数字と出現回数をノートにメモをする。
  * 出現回数が2以上になった場合には、作業を中断し上司にtrueを報告する。
* 上司にfalseを報告する。

```javascript
const containsDuplicate = function(nums) {
    const numToCount = new Map()
    for (const num of nums){ 
        const count = numToCount.get(num) || 0
        numToCount.set(num, count + 1)
        if (count > 0) {
            return true
        }
    }
    return false
};
```

## STEP2

```javascript
const containsDuplicate = function(nums) {
    const numToCount = new Map()
    for (const num of nums) {
        if (numToCount.get(num) !== undefined) {
            return true
        }
        numToCount.set(num, (numToCount.get(num) || 0) + 1)
    }
    return false
};
```

## STEP3

```javascript
const containsDuplicate = function(nums) {
    const numToCount = new Map()
    for (const num of nums) {
        if (numToCount.get(num) !== undefined) {
            return true
        }
        numToCount.set(num, (numToCount.get(num) || 0) + 1)
    }
    return false
};
```

## 感想

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

* (`*1`) For文を2周回す

```javascript
const containsDuplicate = function(nums) {
    for (let i=0; i < nums.length; i++) {
        for (let j=i+1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return true
            }
        }
    }
    return false
};
```

* (`*2`) ソートして、先頭から前後の値が一致するかを確認する。

```javascript
const containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return true
        }
    }
    return false
}; 

```

### コードの良し悪し

numsの配列の長さをNとする。

* 時間計算量は、ハッシュテーブルを使う方法がO(N)で最も優れており、
空間計算量は、For文を2周回す方法、ソートをする方法が優れている。
* 配列が十分に長い際には、ソートをする方法を検討し、
配列が長くない際には、ハッシュテーブルを用いる方法を検討する。

* `*0`
  * 時間計算量: O(N)
  * 空間計算量: O(N)

* `*1`
  * 時間計算量: O(N^2)
  * 空間計算量: O(1)

* `*2`
  * 時間計算量: O(N log N)
  * 空間計算量: O(1)

## 調べたこと

