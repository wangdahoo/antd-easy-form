import React, { useState } from 'react'
import { Tabs, Avatar, Button, Checkbox } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

// 按 esm 的方式引入
// import '../dist/index.css'
// import { Form, FormItemType } from '../dist'

// 按 umd 的方式引入
// import 'antd/dist/antd.css'
// import '../dist/umd/index.css'
// import { Form, FormItemType } from '../dist/umd'

import moment from 'moment'

// 开发环境
import '../src/index.less'
import { Form, FormItem, FormItemType, ExtraAction } from '..'
import { FormRenderer } from '../renderer'

const TabPane = Tabs.TabPane

const nameReg: RegExp = /^[A-Za-z\d]{4,20}$/
const passReg: RegExp = /^[A-Za-z\d_,.?/!\\@#$%^&*()\-=+~|]{4,20}$/

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
        re: nameReg,
        prefix: <UserOutlined />
    },
    {
        name: 'password',
        itemType: FormItemType.PASSWORD,
        labelText: '密码',
        placeholder: '请输入密码',
        defaultValue: '',
        required: true,
        re: passReg,
        prefix: <KeyOutlined />
    }
] as FormItem[]

const registerFormItems = [
    {
        name: 'username',
        itemType: FormItemType.INPUT,
        labelText: '用户名',
        required: true,
        re: nameReg
    },
    {
        name: 'password',
        itemType: FormItemType.PASSWORD,
        labelText: '密码',
        defaultValue: '',
        required: true,
        re: passReg
    },
    {
        name: 'password2',
        itemType: FormItemType.PASSWORD,
        labelText: '再次输入',
        placeholder: '请再次输入密码',
        defaultValue: '',
        required: true,
        re: passReg
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
        required: true,
        defaultValue: moment()
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
            console.log(item)

            return <CustomAvatar value={state.value} onChange={newValue => {
                state.value = newValue
            }} />
        },
        extra: {},
    }
] as FormItem[]

const numberFormItems = [
    {
        name: 'apple_count',
        labelText: '苹果个数',
        itemType: FormItemType.NUMBER,
        min: 0,
        max: 10000,
        step: 1
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
] as FormItem[]

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
] as FormItem[]

const multipleSelectItems = [
    {
        name: 'city',
        labelText: '城市',
        itemType: FormItemType.SELECT,
        options: [
            {
                value: '上海',
                text: '上海'
            },
            {
                value: '北京',
                text: '北京'
            },
            {
                value: '深圳',
                text: '深圳'
            }
        ],
        defaultValue: ['上海', '北京'],
        multiple: true
    }
] as FormItem[]

const datepickerAndTimepickerFormItems = [
    {
        name: 'birthday',
        itemType: FormItemType.DATEPICKER,
        labelText: '生日',
        required: true,
        defaultValue: moment()
    }
] as FormItem[]

const cascaderItems = [
    {
        name: 'city',
        labelText: '城市',
        itemType: FormItemType.CASCADER,
        required: true,
        options: [
            {
                value: 'zhejiang',
                text: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        text: 'Hangzhou',
                    },
                ],
            },
            {
                value: 'jiangsu',
                text: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        text: 'Nanjing',
                    },
                ],
            }
        ],
        defaultValue: ['zhejiang', 'hangzhou']
    }
] as FormItem[]

function CustomAvatar(props: any) {
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

export default function App(props: any) {
    const [items, setItems] = useState([])
    const [formDisabled, setFormDisabled] = useState(false)
    const [extra, setExtra] = useState([
        {
            text: 'extra action',
            buttonWidth: 120,
            onAction: console.log
        }
    ] as ExtraAction[])

    function onChangeTab(key: string) {
        if (key === 'login') {
            setItems(loginFormItems)
        } else if (key === 'register') {
            setItems(registerFormItems)
        } else if (key === 'numbers') {
            setItems(numberFormItems)
        } else if (key === 'ajax options') {
            setItems(ajaxOptionsFormItems)
        } else if (key === 'multiple select') {
            setItems(multipleSelectItems)
        } else if (key === 'datepicker and timepicker') {
            setItems(datepickerAndTimepickerFormItems)
        } else if (key === 'cascader') {
            setItems(cascaderItems)
        } else if (key === 'form renderer') {
            setItems([])
        }

        setExtra(key === 'login' ? [
            {
                key: 'action-1',
                text: 'extra action',
                buttonWidth: 120,
                onAction: console.log
            }
        ] as ExtraAction[] : [])
    }

    // console.log('extra', extra)

    return (
        <div style={{ padding: 20 }}>
            <Tabs onChange={onChangeTab} defaultActiveKey={'login'}>
                <TabPane tab='用户登录' key="login"></TabPane>
                <TabPane tab='用户注册' key="register"></TabPane>
                <TabPane tab='数字' key="numbers"></TabPane>
                <TabPane tab='load ajax options' key="ajax options"></TabPane>
                <TabPane tab='Select 支持多选' key="multiple select"></TabPane>
                <TabPane tab='Date & Time' key="datepicker and timepicker"></TabPane>
                <TabPane tab='Cascader' key="cascader"></TabPane>
                <TabPane tab='Form Renderer' key="form renderer"></TabPane>
            </Tabs>

            <div style={{ width: 600, margin: '20px auto' }}>
                {items.length > 0 ? (
                    <>
                        <Checkbox checked={formDisabled} onChange={e => {
                            setFormDisabled(e.target.checked)
                        }}>Form Disabled</Checkbox>

                        <Form
                            items={items}
                            labelAlign={'right'}
                            labelWidth={120}
                            onSubmit={console.log}
                            disabled={formDisabled}
                            extra={extra}
                        />
                    </>
                ) : (
                        <FormRenderer schema={{
                            labelWidth: 120,
                            items: [
                                {
                                    name: 'username',
                                    labelText: '用户名',
                                    itemType: 'input',
                                    required: true
                                },
                                {
                                    name: 'password',
                                    labelText: '密码',
                                    itemType: 'password',
                                    required: true
                                }
                            ]
                        }} />
                    )}
            </div>
        </div>
    )
}
