# 735. Asteroid Collision

## STEP1

### 最初に立てた方針 (誤り)

* 先頭の惑星からFor分を回す
  * アステロイドが正の値の時、スタックに追加
  * アステロイドが負の値の時、
      * stackのなかの全ての要素よりも大きい -> 全てのpostiiveを消し、negativeを追加する。
      * [positive1, positive2, positive3] で、イコールになることがなく、一部のpositiveよりも大きく
        -> 消すだけ消すが、最後にはnegativeが消える
      * スタックのラストが正の値で、同じ大きさの時 -> ラストが消滅する。
      * スタックに正の値が並んでおり、途中で同じ大きさの惑星が出る時 -> 同じ大きさの惑星以降が消滅する。
      * スタックのラストよりも小さい時 -> 何もしない 

* 動かなかった時のコード

```javascript
const asteroidCollision = function(asteroids) {
    const container = []
    for (const asteroid of asteroids) {
        if (asteroid > 0) {
            container.push(asteroid)
            continue
        }
        let last = container[container.length - 1]
        while (container.length > 0 && Math.abs(last) < Math.abs(asteroid)) {
            container.pop()
            last = container[container.length - 1]
        }
        if (Math.abs(last) === Math.abs(asteroid)) {
            container.pop()
            continue
        }
        if (container.length === 0) {
            container.push(asteroid)
        }
    }
    return container
};
```

* スタックのラストがnegativeのケースを想定できていなかった。
* スタックのラストがnegative, positiveのケースが想定できていなかった

### 方針(正しい)

* 先頭の惑星からFor分を回す
  * アステロイドが正の値の時、スタックに追加
  * アステロイドが負の値の時、
    * スタックがの末尾が、[..., positive, negative]のケース --> 発生しえない 
    * スタックがの末尾が、[..., negative, negative]のケース --> スタックに追加
    * スタックがの末尾が、[..., negative, positive]のケース --> positiveの時は、下と同じ方針で、negativeに切り替わった場合には上の方針に切り替える
    * スタックがの末尾が、[..., positive, positive]のケース --> negativeが勝ち切る/途中まで勝ち最後に引き分ける/途中まで勝ち最後に負ける/最初に負ける/最初に引き分けるまで

```javascript
const asteroidCollision = function(asteroids) {
    const container = []
    for (const asteroid of asteroids) {
        if (asteroid > 0) {
            container.push(asteroid)
            continue
        }
        let last = container[container.length - 1]
        if (last < 0) {
            container.push(asteroid)
            continue
        }
        while (container.length > 0 && last > 0 && Math.abs(last) < Math.abs(asteroid)) {
            container.pop()
            last = container[container.length - 1]
        }
        if (last < 0) {
            container.push(asteroid)
            continue
        }
        if (Math.abs(last) === Math.abs(asteroid)) {
            container.pop()
            continue
        }
        if (container.length === 0) {
            container.push(asteroid)
        }
    }
    return container
};
```

## STEP2

* コメントを追加し、条件を明らかにする。

  * 最初に負ける
  * 最初に引き分ける
  * 途中まで勝つ
    * 最終的に途中で引き分ける
    * 最終的に途中で負ける
    * 最終的に負の惑星を見つけた時
  * 最後まで勝つ

```javascript
const asteroidCollision = function(asteroids) {
    const container = []
    for (const asteroid of asteroids) {
        // 惑星が正の時
        if (asteroid > 0) {
            container.push(asteroid)
            continue
        }

        // 惑星が負の時
        let last = container[container.length - 1]
        if (last < 0) {
            // スタックのラストが負の時
            container.push(asteroid)
            continue
        }
        while (container.length > 0 && last > 0 && Math.abs(last) < Math.abs(asteroid)) {
            container.pop()
            last = container[container.length - 1]
        }
        if (container.length === 0) {
            // 負の惑星がスタックの全ての正の惑星に勝ったとき
            container.push(asteroid)
            continue
        }
        if (last < 0) {
            // 負の惑星が途中まで勝ち、負の惑星にぶつかった時
            container.push(asteroid)
            continue
        }
        if (Math.abs(last) === Math.abs(asteroid)) {
            // 最初に引き分けたとき、または途中まで勝ち最終的に引き分けた時。
            container.pop()
            // if文の外が何もしないため、continueは追加しない。
        }
        // 最初に負けた時、または、途中まで勝ち最終的に負けた時
    }
    return container
};
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

