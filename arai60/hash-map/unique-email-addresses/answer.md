# 929. Unique Email Addresses

## STEP1

* 発想
  * 文字列を適切なdelimineterでSplitすればできる。

```javascript
const numUniqueEmails = function(emails) {
    const email_set = new Set()
    for (const email of emails) {
        const [original_local_name, domain_name] = email.split('@')
        const local_name_with_dot = original_local_name.split('+')[0]
        const local_name = local_name_with_dot.split('.').join('')
        const key = local_name + '@' + domain_name
        email_set.add(key)
    }
    return email_set.size
};
```

## STEP2

```javascript
const numUniqueEmails = function(emails) {
    const email_set = new Set()
    for (const email of emails) {
        const [original_local_name, domain_name] = email.split('@')
        const local_name_with_dot = original_local_name.split('+')[0]
        const local_name = local_name_with_dot.split('.').join('')
        const clean_email_address = local_name + '@' + domain_name
        email_set.add(clean_email_address)
    }
    return email_set.size
};1
```

## STEP3

* split関数を用いて文字列操作を行う方法

```javascript
const numUniqueEmails = function(emails) {
    const email_set = new Set()
    for (const email of emails) {
        const [original_local_name, domain_name] = email.split('@')
        const local_name_with_dot = original_local_name.split('+')[0]
        const local_name = local_name_with_dot.split('.').join('')
        const key = local_name + '@' + domain_name
        email_set.add(key)
    }
    return email_set.size
};
```

* indexOf関数とslice関数を使って、文字列操作を行う方法

```javascript
const numUniqueEmails = function(emails) {
    function canonicalize(email) {
        if (!email.includes('@') {
            throw new Error("invalid input")
        }
        let index_of_plus = email.indexOf('+')
        if (index_of_plus === -1) {
            index_of_plus = Infinity
        }
        const end_idx_of_local_name = Math.min(index_of_plus, email.indexOf('@'))
        const start_idx_of_local_name = email.indexOf('@') + 1
        const local_name = email.slice(0, end_idx_of_local_name).replaceAll('.', '')

        const domain_name = email.slice(start_idx_of_local_name)

        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
};
```
```

* 正規表現を使う方法

```javascript
const numUniqueEmails = function(emails) {
    function canonicalize(email) {
        // FIXME: local,domainで使える特別文字はもっと多い。
        const regex = new RegExp(/([\w\.]+)\+?.*\@([\w\.\+]+)/)
        const matches = email.match(regex)
        const local_name = matches[1].replaceAll('.', '')
        const domain_name = matches[2]
        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
};
```

## 感想

### コメント集を読んで

* エラー発生時のリスクの度合いによっては、正常終了させることも検討する。
  > あと、ユースケース考えて書いてますか。ユーザーがゴミを1つ突っ込んできたら例外投げて動かないコードでいいんですか。結論がいいならそれはひとつなんですが、私は考慮された形跡がないことを怖がってます。



### 他の人のPR/コメントを読んで

* "文字列の追記は文字列の再構築が走る"で述べられている専門家の意識意識/常識の範囲が勉強になった。知識として求められていること、
  参考 : https://github.com/hayashi-ay/leetcode/pull/25/files#diff-d65d43698547a0f3cfcdb7f005de30ed4cd0c45ae015fd01094d6647cfa0a84aR154-R156

* ユースケースを想定できているか というコメントが自分に足りていないところで勉強になった。
  > まあユースケースは色々あると思うので、必ずしもバリデーションが必須ではないとは思います。たとえば、分析用途で既存のDBにあるレコードにメールアドレスを正規化してユニークな件数を出すとか。まあバリデーションを書かないにしても、全く考慮していないより、考慮したうえで実装しないという判断をするのは良いと思います。
  参考 : https://github.com/seal-azarashi/leetcode/pull/14#discussion_r1677085716

* const string&、const auto& という形で変数を渡すことで、大きな文字列のコピーを作成することなく、参照渡しをすることができる。 
  参考: https://github.com/Ryotaro25/leetcode_first60/pull/15/files#r1640928377 

* Ryotaro25
  * PR: https://github.com/Ryotaro25/leetcode_first60/pull/15/
  * 文字列の結合について気をつけていること。
    > C++はあまり詳しくないので, 変なことを言っていたら流して欲しいのですが, ループ内部で文字列の結合に足し算を使うのは効率がわるかったりしないのでしょうか?
    > C++ は、文字列は mutable なので特に問題はないです。
    > Java、Python は immutable です。ちなみに、こういうのはよく知らない言語を触るときに一番初めに確認することの一つです。
    参考: https://github.com/Ryotaro25/leetcode_first60/pull/15/files#r1641792391
  

* olsen-blue
  * PR: https://github.com/olsen-blue/Arai60/pull/14/
  * Pythonのre.sub という記法が知らなかった。Javascriptの
    string.replaceAllに相当する関数のようだ。
    参考: https://docs.python.org/3/library/re.html#re.sub 

* hroc135
  * PR: https://github.com/hroc135/leetcode/pull/14
  * Goの文字列がimmutableであることが知らなかった。
    https://github.com/hroc135/leetcode/pull/14/files#r1731500842
  * ループで回す際に、local / domainのappendを一緒のfor文でやっているケースが多いが、ちょっと読みづらく感じる。
    * 複数の状態(ドメイン or ローカル, ローカルのプラスより前 or 後ろ)を持ち、If文の条件判定で使っているからだと思う。

  * ローカルで使える文字/ドメインで使える文字を調べずにコードを書いてしまった。
    > local: アルファベットと数字以外に、'\_', '.', '/'が使える
     domain: アルファベット、数字、'.', '/'が使える。最後の'.'以下は、2字以上でないといけない
  * "関数を小さな関数を組み合わせる"という考えがなかった。
    > Eメールの正規化部分は関数化されていると読みやすいです。
これは好みですが、自分は正規化処理自体も個々の操作の関数の組み合わせで書かれているとわかりやすいと思います。
    参考: https://github.com/hroc135/leetcode/pull/14#discussion_r1726561953

* hayashi-ay
  * PR: https://github.com/hayashi-ay/leetcode/pull/25
  * lambda関数を使う選択肢が自分が持っておらず勉強になった。
    参考 : https://github.com/hayashi-ay/leetcode/pull/25/files#diff-d65d43698547a0f3cfcdb7f005de30ed4cd0c45ae015fd01094d6647cfa0a84aR177

```javascript
local_without_dots = "".join(filter(lambda c: c != ".", local_ignore_alias))```

## その他の方法

* `*0` 文字列操作(split関数)を使う方法
  STEP1/STEP2/STEP3で記載.

* `*1` ループを使う方法

```javascript
const numUniqueEmails = function(emails) {
    const canonicalize = function(email) {
        // local_nameの取得.
        const local_name_chars = []
        for (let i=0; email[i] !== '+' && email[i] !== '@' && i < email.length; i++) {
            if (email[i] === '.') {
                continue
            }
            local_name_chars.push(email[i])
        }
        let is_domain_char = false
        // domain_nameの取得.
        const domain_name_chars = []
        for (let i=0; i < email.length; i++) {
            if (email[i] === '@') {
                is_domain_char = true
                continue
            }
            if (!is_domain_char) {
                continue
            }
            domain_name_chars.push(email[i])
        }
        const local_name = local_name_chars.join('')
        const domain_name = domain_name_chars.join('')
        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
}
```

* `*2` 正規表現を使う方法

```javascript
const numUniqueEmails = function(emails) {
    function canonicalize(email) {
        const regex = new RegExp(/([\w\.]+)\+?.*\@([\w\.\+]+)/)
        const matches = email.match(regex)
        if (matches.length === 0) {
            throw new Error("invalid input")
        }
        const local_name = matches[1].replaceAll('.', '')
        const domain_name = matches[2]
        return `${local_name}@{domain_name}`
    }


    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
}
```

* `*3` 文字列操作で、split関数とreplace関数を用いる方法 

```javascript
const numUniqueEmails = function(emails) {
    const canonicalize = function(email) {
        const [original_local_name, domain_name] = email.split('@')
        const local_name_with_dot = original_local_name.split('+')[0]
        // UPDATED. 今までは、split('.').join('')としていた。
        const local_name = local_name_with_dot.replaceAll('.', '')
        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
}
```

* replaceAll関数に関しては、正規表現の記法を使って書くことも可能である.

```
        const local_name = local_name_with_dot.replaceAll(/\./g, '')
```

* `*4` 文字列操作で、split関数を使わずに、IndexOf関数とslice関数を使う方法
  * [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
  * [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

* (間違った方法)

```
const numUniqueEmails = function(emails) {
    function canonicalize(email) {
        const end_idx_of_local_name = email.indexOf('+')
        const start_idx_of_domain_name = email.indexOf('@')

        const local_name = email.slice(0, end_idx_of_local_name).replaceAll('.', '')
        const domain_name = email.slice(start_idx_of_domain_name + 1, email.length)
        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
};
```

* (正しくは)
  * indexOf関数において、keyが存在しない場合、-1を返すことを意識できていなかった。
  * @の前に+がこないケースを想定できていなかった。

```javascript
const numUniqueEmails = function(emails) {
    function canonicalize(email) {
        if (!email.includes('@') {
            throw new Error("invalid input")
        }
        let index_of_plus = email.indexOf('+')
        if (index_of_plus === -1) {
            index_of_plus = Infinity
        }
        const end_idx_of_local_name = Math.min(index_of_plus, email.indexOf('@'))
        const start_idx_of_local_name = email.indexOf('@') + 1
        const local_name = email.slice(0, end_idx_of_local_name).replaceAll('.', '')

        const domain_name = email.slice(start_idx_of_local_name)

        return `${local_name}@${domain_name}`
    }
    const unique_email = new Set()
    for (const email of emails) {
        unique_email.add(canonicalize(email))
    }
    return unique_email.size
};
```
## 調べたこと

* 文字列操作関数 
  * replace  
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  * replaceAll 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
  * indexOf
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  * slice
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
