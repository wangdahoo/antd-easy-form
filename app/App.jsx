import React, { useState } from 'react'
import { Tabs, Divider } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

// import { Form, FormItemType } from '../dist'
import { Form, FormItemType } from '../src'

const TabPane = Tabs.TabPane

const loginFormItems = [
    {
        name: 'username',
        itemType: FormItemType.INPUT,
        labelText: '用户名',
        placeholder: '请输入用户名',
        defaultValue: 'admin',
        required: true,
        re: /^[A-Za-z\d]{4,20}$/,
        prefix: <UserOutlined />
    },
    {
        name: 'password',
        itemType: FormItemType.PASSWORD,
        labelText: '密码',
        placeholder: '请输入密码',
        defaultValue: '',
        required: true,
        re: /^[A-Za-z\d_\,\.\?\/\!\\@\#\$\%\^\&\*\(\)\-\=\+\~\|\\]{4,20}$/,
        prefix: <KeyOutlined />
    }
]

const registerFormItems = [
    {
        name: 'username',
        itemType: FormItemType.INPUT,
        labelText: '用户名',
        required: true,
        re: /^[A-Za-z\d]{4,20}$/
    },
    {
        name: 'password',
        itemType: FormItemType.PASSWORD,
        labelText: '密码',
        defaultValue: '',
        required: true,
        re: /^[A-Za-z\d_\,\.\?\/\!\\@\#\$\%\^\&\*\(\)\-\=\+\~\|\\]{4,20}$/
    },
    {
        name: 'password2',
        itemType: FormItemType.PASSWORD,
        labelText: '再次输入',
        placeholder: '请再次输入密码',
        defaultValue: '',
        required: true,
        re: /^[A-Za-z\d_\,\.\?\/\!\\@\#\$\%\^\&\*\(\)\-\=\+\~\|\\]{4,20}$/
    },
    {
        name: 'gender',
        itemType: FormItemType.RADIO,
        labelText: '性别',
        options: [
            {
                value: 1,
                text: '男'
            },
            {
                value: 0,
                text: '女'
            },
        ],
        buttonStyle: 'solid'
    },
    {
        name: 'fruits',
        itemType: FormItemType.CHECKBOX,
        labelText: '喜爱的水果',
        options: [
            {
                value: 'apple',
                text: '苹果'
            },
            {
                value: 'orange',
                text: '橙子'
            },
            {
                value: 'banana',
                text: '香蕉'
            },
            {
                value: 'grape',
                text: '葡萄'
            },
        ]
    },
    {
        name: 'memo',
        itemType: FormItemType.TEXTAREA,
        labelText: '个性签名',
        defaultValue: '这个人很懒，什么也没留下'
    },
    {
        name: 'city',
        itemType: FormItemType.SELECT,
        labelText: '城市',
        options: [
            {
                value: '上海',
                text: '上海',
            },
            {
                value: '北京',
                text: '北京',
            }
        ]
    },
    {
        name: 'salay',
        itemType: FormItemType.NUMBER,
        labelText: '收入水平',
        unit: '万元',
        min: 1,
        max: 100,
        defaultValue: 10
    },
]

export default function App (props) {
    const [items, setItems] = useState(loginFormItems)

    function onChangeTab (key) {
        if (key === 'login') {
            setItems(loginFormItems)
        } else if (key === 'register') {
            setItems(registerFormItems)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Tabs onChange={onChangeTab}>
                <TabPane tab='用户登录' key="login"></TabPane>
                <TabPane tab='用户注册' key="register"></TabPane>
            </Tabs>

            <div style={{ width: 600, margin: '20px auto' }}>
                <Form
                    items={items}
                    labelAlign={'left'}
                    labelWidth={120}
                    onSubmit={console.log}
                />
            </div>
        </div>
    )
}