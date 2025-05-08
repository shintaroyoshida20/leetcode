# 929. Unique Email Addresses

## STEP1

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

* 

### 他の人のPRを読んで

* "文字列の追記は文字列の再構築が走る"の意識が勉強になった。知識として求められていること、
  参考 : https://github.com/hayashi-ay/leetcode/pull/25/files#diff-d65d43698547a0f3cfcdb7f005de30ed4cd0c45ae015fd01094d6647cfa0a84aR154-R156


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
