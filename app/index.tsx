import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App name="Tom" />
  </ConfigProvider>,
  document.getElementById('root')
)
