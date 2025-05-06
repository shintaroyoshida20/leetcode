# 349. Intersection of Two Arrays

## STEP1

* 発想

* nums1で数字ごとの出現の有無を記録しておく。
* nums2のそれぞれの数字について、
    * nums1で出現している場合には、回答に追加。
    * nums1の出現の記録を消す。

```javascript

const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (is_num_appeared.get(num2) === true) {
            ans.push(num2)
            // 重複して数えないように, mapの値をfalseにする.
            is_num_appeared.set(num2, false)
        }
    }
    return ans
};
```

## STEP2

* 整え方
  * 例外処理をif statementで書き、追加処理をif continueの後の処理で書くようにした.

```javascript
const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (!is_num_appeared.has(num2) || is_num_appeared.get(num2) === false) {
            continue
        }
        ans.push(num2)
        is_num_appeared.set(num2, false)
    }
    return ans
};
```

## STEP3

```javascript
const intersection = function(nums1, nums2) {
    const is_num_appeared = new Map()
    for (const num1 of nums1) {
        is_num_appeared.set(num1, true)
    }
    const ans = []
    for (const num2 of nums2) {
        if (!is_num_appeared.has(num2) || is_num_appeared.get(num2) === false) {
            continue
        }
        is_num_appeared.set(num2, false)
        ans.push(num2)
    }
    return ans
};
```

## 感想

### コメント集を読んで

## その他の解法

* `*1` Setを用いた方法.
  * 質問者に、期待されている解き方ではない。

```javascript
const intersection = function(nums1, nums2) {
    const num1_set = new Set(nums1)
    const num2_set = new Set(nums2)

    const generator = num1_set.values()
    let next = generator.next()
    const ans = []
    while (!next.done) {
        const num1 = next.value
        if (!num2_set.has(num1)) {
            next = generator.next()
            continue
        }
        ans.push(num1)
        next = generator.next()
    }
    return ans
};
```

* `*2` Setのintersection関数を使用した方法

```javascript
const intersection = function(nums1, nums2) {
    const num1_set = new Set(nums1)
    const num2_set = new Set(nums2)

    const intersection = num1_set.intersection(num2_set)
    return intersection.values().toArray()
};
```
