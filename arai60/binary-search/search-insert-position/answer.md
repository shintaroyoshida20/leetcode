# 35. Search Insert Position

* https://leetcode.com/problems/search-insert-position/

## STEP1

###  発想

* target 以上のインデックスで最小のものを見つける。

###  想定されるユースケース

* フロント側の一覧ページがあるカラムでソートされていて、フロント上で新規追加があった場合。

###  何が分からなかったか?

* while 文の中身を最初 left < rightとして、nums = [1,3,5,6]で、target=2のケースで失敗した。
  ---> 今回のfor文の引き継ぎ条件は、 leftの値 <= targetであること、値が1つ以上存在することである。 
       for文の中で最後に1つの値が残った(left == right)としても、その次の値が答えである可能性があるため、
       left <= rightとすべきであると理解した。

```javascript
const searchInsert = function(nums, target) {
    let left = 0
    let right = nums.length - 1
    // ターゲット : find the smallest index of the value which is equal and larger than target value.
    // 引き継ぎ条件 : left <= target <= right + 1、1つ以上存在
    // 
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)
        if (target <= nums[middle]) {
            right = middle - 1
            continue
        }
        left = middle + 1
    }
    return left
};
```

## STEP2

```javascript
```

## STEP3

```javascript
```

## 感想

* [a,b] は、 a <= x <= bを表す。
* (a,b) は、a < x < bを表す。

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

* (`*1`) 

```javascript
const searchInsert = function(nums, target) {
    if (nums[nums.length - 1] < target) {
        return nums.length
    }
    let  left = 0
    let right = nums.length - 1
    // target : find the index of the smallest value which is equal and larger than target value.
    // loop condition : left <= target <= right
    // break condition : left == right
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (nums[middle] < target) {
            left = middle + 1
            continue
        }
        right = middle
    }
    return right
};
```
### コードの良し悪し

* `*0`

* `*1`

## 調べたこと

