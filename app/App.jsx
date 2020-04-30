import React, { useState } from 'react'
import { Tabs, Divider } from 'antd'

import { Form, FormItemType } from '../dist'
// import { Form, FormItemType } from '../src'

const TabPane = Tabs.TabPane

const loginFormItems = [
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

export default function App (props) {
    const [items, setItems] = useState(loginFormItems)

    return (
        <div style={{ padding: 20 }}>
            <Tabs onChange={key => console.log}>
                <TabPane tab='用户登录' key="login"></TabPane>
            </Tabs>

            <div style={{ width: 600, margin: '20px auto' }}>
                <Form
                    items={items}
                    labelAlign={'left'}
                    onSubmit={console.log}
                />
            </div>
        </div>
    )
}
