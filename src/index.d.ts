import React  from 'react'
import { FormProps } from './types'

export as namespace AntdEasyForm

export enum FormItemType {
    INPUT = 'input',
    PASSWORD = 'password',
    NUMBER = 'number',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    DATEPICKER = 'datepicker',
    RANGEPICKER = 'rangepicker',
    CUSTOM = 'custom'
}

export class Form extends React.Component<FormProps> {
    render(): JSX.Element
}

