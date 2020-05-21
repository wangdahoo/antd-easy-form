import React, { useState } from 'react'
import { Tabs, Divider, Avatar, Button, Checkbox } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

// 按 esm 的方式引入
// import '../dist/index.css'
// import { Form, FormItemType } from '../dist'

// 按 umd 的方式引入
// import 'antd/dist/antd.css'
// import '../dist/umd/index.css'
// import { Form, FormItemType } from '../dist/umd'

// 开发环境
import '../src/index.less'
import { Form, FormItemType } from '../src'

const TabPane = Tabs.TabPane

const loginFormItems = [
    {
        name: 'id',
        itemType: FormItemType.INPUT,
        labelText: '用户 id',
        hidden: true,
        required: true,
        defaultValue: 1
    },
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
        buttonStyle: 'solid',
        defaultValue: 0
    },
    {
        name: 'birthday',
        itemType: FormItemType.DATEPICKER,
        labelText: '生日',
        required: true
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
        ],
        disabled: true
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
    {
        name: 'worktime',
        itemType: FormItemType.RANGEPICKER,
        labelText: '工作时间',
        required: true
    },
    {
        name: 'avatar',
        itemType: FormItemType.CUSTOM,
        labelText: '头像',
        defaultValue: 2,
        render: (item, state) => {
            // the form item
            // console.log(item)

            return <CustomAvatar value={state.value} onChange={newValue => {
                state.value = newValue
            }} />
        },
        extra: {},
    }
]

const numberFormItems = [
    {
        name: 'apple_count',
        labelText: '苹果个数',
        itemType: FormItemType.NUMBER,
        min: 0,
        max: 10000,
        step: 1,
        unit: '个'
    },
    {
        name: 'price',
        labelText: '价格',
        itemType: FormItemType.NUMBER,
        min: 0,
        max: 10000,
        step: 0.01,
        unit: '¥'
    }
]

const ajaxOptionsFormItems = [
    {
        name: 'city',
        labelText: '城市',
        itemType: FormItemType.SELECT,
        options: [
            {
                value: '',
                text: '请选择'
            }
        ],
        getOptions: function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve([
                    {
                        value: '',
                        text: '请选择'
                    },
                    {
                        value: '上海',
                        text: '上海'
                    },
                    {
                        value: '北京',
                        text: '北京'
                    }
                ]), 500)
            })
        }
    }
]

function CustomAvatar(props) {
    const { value } = props

    const names = ['魑', '魅', '魍', '魉']
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

    const [index, setIndex] = useState(value)

    function onChange() {
        const newIndex = index < names.length - 1 ? index + 1 : 0
        setIndex(newIndex)
        if (props.onChange) props.onChange(newIndex)
    }

    return (
        <>
            <Avatar style={{ backgroundColor: colors[index], verticalAlign: 'middle' }} size="large">
                {names[index]}
            </Avatar>
            <Button size="small" style={{ margin: '0 16px', verticalAlign: 'middle' }} onClick={onChange}>Change</Button>
        </>
    )
}

export default function App(props) {
    const [items, setItems] = useState(registerFormItems)
    const [formDisabled, setFormDisabled] = useState(false)

    function onChangeTab(key) {
        if (key === 'login') {
            setItems(loginFormItems)
        } else if (key === 'register') {
            setItems(registerFormItems)
        } else if (key === 'numbers') {
            setItems(numberFormItems)
        } else if (key === 'ajax options') {
            setItems(ajaxOptionsFormItems)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Tabs onChange={onChangeTab} defaultActiveKey={'register'}>
                <TabPane tab='用户登录' key="login"></TabPane>
                <TabPane tab='用户注册' key="register"></TabPane>
                <TabPane tab='数字' key="numbers"></TabPane>
                <TabPane tab='load ajax options' key="ajax options"></TabPane>
            </Tabs>

            <div style={{ width: 600, margin: '20px auto' }}>
                <Checkbox checked={formDisabled} onChange={e => {
                    setFormDisabled(e.target.checked)
                }}>Form Disabled</Checkbox>

                <Form
                    items={items}
                    labelAlign={'right'}
                    labelWidth={120}
                    onSubmit={console.log}
                    disabled={formDisabled}
                />
            </div>
        </div>
    )
}
