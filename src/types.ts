import { ReactNode, ReactElement, CSSProperties } from 'react'
import { Moment } from 'moment'

export interface FormProps {
    items?: FormItem[]
    formWidth?: number
    formWidthUnit?: '%' | 'px'
    labelAlign?: 'left' | 'right' | 'top'
    labelWidth?: number
    submitText?: string
    onSubmit?: (values: FormValues) => void | Promise<void>
    resetText?: string
    style?: CSSProperties
    className?: string
    resetAfterSubmit?: boolean
    hideResetButton?: boolean
    disabled?: boolean
}

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

export type InputItem = {
    name: string
    itemType: FormItemType.INPUT
    labelText: string
    hidden?: boolean
    disabled?: boolean
    placeholder?: string
    defaultValue?: string
    required?: boolean
    re?: RegExp,
    prefix?: ReactNode
}

export type PasswordItem = {
    name: string
    itemType: FormItemType.PASSWORD
    labelText: string
    hidden?: boolean
    disabled?: boolean
    placeholder?: string
    defaultValue?: string
    required?: boolean
    re?: RegExp
    prefix?: ReactNode
}

export type NumberItem = {
    name: string
    itemType: FormItemType.NUMBER
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue?: number
    min?: number
    max?: number
    step?: number
    unit?: string
}

export type TextareaItem = {
    name: string
    itemType: FormItemType.TEXTAREA
    labelText: string
    hidden?: boolean
    disabled?: boolean
    placeholder?: string
    defaultValue?: string
    required?: boolean
    re?: RegExp
}

export type CheckboxItem = {
    name: string
    itemType: FormItemType.CHECKBOX
    labelText: string
    hidden?: boolean
    disabled?: boolean
    options: {
        value: string | number
        text: string
    }[]
    defaultValue: (string | number)[]
    required?: boolean
}

export type RadioItem = {
    name: string
    itemType: FormItemType.RADIO
    labelText: string
    hidden?: boolean
    disabled?: boolean
    options: {
        value: string | number
        text: string
    }[]
    defaultValue: string | number
    buttonStyle: 'outline' | 'solid'
    required?: boolean
}

export type SelectItem = {
    name: string
    itemType: FormItemType.SELECT
    labelText: string
    hidden?: boolean
    disabled?: boolean
    options: {
        value: string | number
        text: string
    }[]
    defaultValue?: string | number | string[] | number[]
    getOptions?: () => Promise<{
        value: string | number
        text: string
    }[]>
    multiple?: boolean
}

export type DatepickerItem = {
    name: string
    itemType: FormItemType.DATEPICKER
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue?: Moment
    required?: boolean
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
    format?: string
}

export type RangepickerItem = {
    name: string
    itemType: FormItemType.RANGEPICKER
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue?: Moment[]
    required?: boolean
}

export type CustomItem = {
    name: string
    itemType: FormItemType.CUSTOM
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue: any
    render: (item: Omit<CustomItem, 'render'>, state: any) => ReactElement
    extra?: any,
}

export type FormItem = InputItem | PasswordItem | NumberItem | TextareaItem | CheckboxItem | RadioItem | SelectItem | DatepickerItem | RangepickerItem | CustomItem // eslint-disable-line

export type FormValues = {
    [key: string]: string | string[] | number | Moment | Moment[] | null | undefined
}

export interface ValidationResult {
    result: boolean
    errors: { [name: string]: string }
}
