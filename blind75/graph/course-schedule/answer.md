# Title

## STEP1

### 発想

### 想定されるユースケース

### 何が分からなかったか?

### 手作業でやってみる。

- ループができた場合には、falseが返却される。
どのようにループを見つけるか？

---> ここで、答えを見た。

有向グラフで周を検知するために、DFSを使う。

```javascript
const canFinish = function(numCourses, prerequisites) {
    const adjacency = new Array(numCourses.length).fill(0).map(() => [])
    for (const prerequisite of prerequisites) {
        adjacency[prerequisite[1]] = prerequisite[0]
    }
    const visited = new Array(numCourses.length).fill(false)
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

