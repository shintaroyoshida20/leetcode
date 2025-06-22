# 217. Contains Duplicate

## STEP1

### 想定されるユースケース

### 何が分からなかったか?

- 今回は特になし

### 発想 (手作業でやってみる)

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

- https://github.com/azriel1rf/leetcode-prep/pull/1/

- https://github.com/rihib/leetcode/pull/4/
  - setの要素数で比較する方法もある (`*4`)

- https://github.com/erutako/leetcode/pull/5
  - Javaでのsortアルゴリズムは、QuickSortの亜種を用いている。

- https://github.com/NobukiFukui/Grind75-ProgrammingTraining/pull/39/

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

- `*3` Mapではなく、Setを使う方法も可能。
出現回数ではなく、出現の有無を保持すれば良いため。

```javascript
const containsDuplicate = function(nums) {
    const uniqueNums = new Set()

    for (const num of nums) {
        if (uniqueNums.has(num)) {
            return true
        }
        uniqueNums.add(num)
    }
    return false
};
```

- `*4` 重複している場合には、Uniqueな要素数と配列数が一致しなくなることを利用

```javascript
var containsDuplicate = function(nums) {
    const uniqueNums = new Set()
    for (const num of nums) {
        uniqueNums.add(num)
    }
    // 一致しない ---> 重複あり (回答はTrue)
    // 一致する   ---> 重複なし (回答はFalse)
    return uniqueNums.size !== nums.length
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
    * Javasciprtにおいては、sort関数はin-placeで行われるため、O(1)の空間計算量で、sortをできる。

## 調べたこと

- JavaのSort実装
  _ https://docs.oracle.com/javase/jp/8/docs/api/java/util/Arrays.html
  - https://kluedo.ub.rptu.de/frontdoor/index/index/docId/3463

> 実装にあたっての注意: ソート・アルゴリズムは、Vladimir Yaroslavskiy氏、Jon Bentley氏、およびJoshua Bloch氏によるDual-Pivot Quicksortです。
> このアルゴリズムは、ほかのクイックソート・アルゴリズムではnの2乗のパフォーマンスに低下させる多くのデータ・セットで、
> O(n log(n))のパフォーマンスを提供し、一般的に従来の(1ピボットの) Quicksortの実装よりも高速です。

JavaではSort Algorithmに、Quicksortよりも早いDual Pivot Quick Sortが用いられている。

- Javascriptにおけるsortの実装
  - arrayの中身の種類によってソートアルゴリズムが異なるらしい。
  - https://stackoverflow.com/questions/234683/javascript-array-sort-implementation

