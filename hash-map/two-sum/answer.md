# 1. Two Sum

## STEP1

### 発想

* 全てのnumに対して、
  * pairがいるかをチェックし、いた場合には終了。
  * HashMapにnumを追加

* 最初、pairのチェックよりも、mapへの追加を先に行なってしまい、[3,3]のケースを考慮できておらず、エラーとなってしまった。

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

* 添え字を、iではなく、idxに変更。

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

* Javascriptの標準エラーを今まで調べたことがなかった。
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#error_types 
  * PythonのValueError(正しい型だが適切でない値を持つ引数を受け取ったとき)に相当するエラーを探したが、Javascriptでそれに相当するエラーはなさそうだった。

* twoポインターを解く方法 (`*2`) も、シンプルで個人的には好き。

### 他の人のPRを読んで

* olsen-blueのコード
  * PR: https://github.com/olsen-blue/Arai60/pull/11/
  * 回答が複数だった場合には、どうなるか? 
    * HashTableを使う方法は、先頭の2つをとる。
    * TwoPointerを使う方法だったら、先頭と最後になる。
  * pythonのcollectionモジュールのdefaultDictは,dictと違って存在しないkeyが呼ばれた際に、
    keyに対してdefault valueを値とするobjectが挿入され、default valueが返却される。
    * `If default_factory is not None, it is called without arguments to provide a default value for the given key, this value is inserted in the dictionary for the key, and returned.`

* Ryotaro25のコード
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/12
  * C++において、mapは赤黒木でできている。

* hayash-ayのコード
  * PR: https://github.com/hayashi-ay/leetcode/pull/14/
  * `find_num`や`find_index` の変数名に違和感がある。`find`ではなく`found`の方が良いが、
    `found`でもわかりづらい。もう片方という意味を持つ変数名の方が、意図が伝わると思う。
    Anthropic Claudeに質問したところ、 `corresponding`, `twin`, `complementary`, `partner` とかが考えらるとのこと。
  * `num_idx_map` ではなく、 `num_to_idx`とした方が良い。何がkeyで、何がvalueかが明確になるため。

### コメント集を読んで

* 異常な入力について考える癖が出てきた。
  * ペアが見つからなかった時
  * ペアが複数見つかった

## その他の解法

* (`*1`) 総当たりをする方法 (時間計算量 N^2)

```javascript
const twoSum = function(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    return new Error("pair is not found")
};
```

* (`*2`) ソートをした後に、2つのポインターで実装する方法
  * 時間計算量がO(N logN)になる。配列をソートするため。

```javascript
const twoSum = function(nums, target) {
    // ソートをしてしまうと、元々のインデックスが保存されないため、
    // 新しい配列を用意する。
    const nums_with_index = nums.map((num, i) => {
        return {
            value: num,
            index: i,
        }
    })
    nums_with_index.sort((a, b) => a.value - b.value)
    let left_idx = 0
    let right_idx = nums.length - 1
    while (left_idx < right_idx) {
        const left = nums_with_index[left_idx]
        const right = nums_with_index[right_idx]
        if (left.value + right.value === target) {
            return [left.index, right.index]
        }
        if (left.value + right.value < target) {
            ++left_idx
            continue
        }
        --right_idx
    }
    return new Error("pair is not found")
};
```

* mapをもっと綺麗にかける。

* 変更前

```javascript
    const nums_with_index = nums.map((num, i) => {
        return {
            value: num,
            index: i,
        }
    })
```

* 変更後
```javascript
    const nums_with_index = nums.map((value, index) => ({ value, index })
```
