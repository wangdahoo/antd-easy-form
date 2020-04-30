import React from 'react'

// import { Form, FormItem, FormItemType } from '../dist/esm'
import { Form, FormItem, FormItemType } from '../src'

const items: FormItem[] = [
    {
        name: 'username',
        itemType: FormItemType.INPUT,
        labelText: '用户名',
        placeholder: '请输入用户名',
        defaultValue: 'admin',
        required: true,
        re: /^[A-Za-z\d]{4,20}$/
    },
    {
        name: 'password',
        itemType: FormItemType.PASSWORD,
        labelText: '密码',
        placeholder: '请输入密码',
        defaultValue: '',
        required: true,
        re: /^[A-Za-z\d_\,\.\?\/\!\\@\#\$\%\^\&\*\(\)\-\=\+\~\|\\]{4,20}$/
    }
]

export default function App (props: any) {
    return (
        <div style={{ width: 600, padding: 20 }}>
            <Form
                items={items}
                labelAlign={'left'}
                onSubmit={console.log}
            />
        </div>
    )
}
