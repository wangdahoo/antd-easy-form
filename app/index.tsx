import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('zh-cn')

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    document.getElementById('root')
)
