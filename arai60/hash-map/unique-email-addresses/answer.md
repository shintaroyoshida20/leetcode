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

## 感想

### コメント集を読んで

## その他の解法

