# 1. Two Sum

## STEP1

* 全てのnumに対して、
  * pairがいるかをチェックし、いた場合には終了。
  * HashMapにnumを追加

```javascript
const twoSum = function(nums, target) {
    const num_to_index_table = new Map()
    for (let i=0; i<nums.length; i++) {
        const num = nums[i]
        const pair_num = target - num
        if (num_to_index_table.has(pair_num)) {
            const pair_num_idx = num_to_index_table.get(pair_num)
            return [i, pair_num_idx]
        }
        num_to_index_table.set(num, i)
    }
    return new Error(`The pair is not found for the target value (${value}).`)
};
```

## STEP2

* 特に修正要素が見つからなかった.

```javascript
const twoSum = function(nums, target) {
    const num_to_index_table = new Map()
    for (let idx = 0; idx < nums.length; idx++) {
        const num = nums[idx]
        const pair_num = target - num
        if (num_to_index_table.has(pair_num)) {
            const pair_idx = num_to_index_table.get(pair_num)
            return [idx, pair_idx]
        }
        num_to_index_table.set(num, idx)
    }
    return new Error("pair is not found")
};
```

## STEP3

```javascript
const twoSum = function(nums, target) {
    const num_to_index_table = new Map()
    for (let idx = 0; idx < nums.length; idx++) {
        const num = nums[idx]
        const pair_num = target - num
        if (num_to_index_table.has(pair_num)) {
            const pair_idx = num_to_index_table.get(pair_num)
            return [idx, pair_idx]
        }
        num_to_index_table.set(num, idx)
    }
    return new Error("pair is not found")
};
```

## 感想

### コメント集を読んで

## その他の解法

