# Title

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
    // find the smallest index which is equal and larger than target value.
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

### コメント集を読んで

## 他の人のPRを読んで

## その他の方法

### コードの良し悪し

* `*0`

* `*1`

## 調べたこと

