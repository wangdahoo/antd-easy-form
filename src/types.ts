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
    extra?: ExtraAction[]
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

export type GenericFormItem<ItemType, DefaultValue> = {
    name: string
    itemType: ItemType
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue?: DefaultValue
}

export type InputItem = GenericFormItem<FormItemType.INPUT, string> & {
    placeholder?: string
    required?: boolean
    re?: RegExp,
    prefix?: ReactNode
}

export type PasswordItem = GenericFormItem<FormItemType.PASSWORD, string> & {
    placeholder?: string
    required?: boolean
    re?: RegExp
    prefix?: ReactNode
}

export type NumberItem = GenericFormItem<FormItemType.NUMBER, number> & {
    min?: number
    max?: number
    step?: number
    unit?: string
}

export type TextareaItem = GenericFormItem<FormItemType.TEXTAREA, string> & {
    placeholder?: string
    required?: boolean
    re?: RegExp
}

// TODO: 这里原来的 defaultValue 是不带 ? 的
export type CheckboxItem = GenericFormItem<FormItemType.CHECKBOX, (string | number)[]> & {
    options: {
        value: string | number
        text: string
    }[]
    required?: boolean
}

// TODO: 这里原来的 defaultValue 是不带 ? 的
export type RadioItem = GenericFormItem<FormItemType.RADIO, string | number> & {
    options: {
        value: string | number
        text: string
    }[]
    buttonStyle: 'outline' | 'solid'
    required?: boolean
}

export type SelectItem = GenericFormItem<FormItemType.SELECT, string | number | string[] | number[]> & {
    options: {
        value: string | number
        text: string
    }[]
    getOptions?: () => Promise<{
        value: string | number
        text: string
    }[]>
    multiple?: boolean
}

export type DatepickerItem = GenericFormItem<FormItemType.DATEPICKER, Moment> & {
    required?: boolean
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
    format?: string
}

export type RangepickerItem = GenericFormItem<FormItemType.RANGEPICKER, Moment[]> & {
    required?: boolean
}

export type CustomItem = GenericFormItem<FormItemType.CUSTOM, any> & {
    name: string
    itemType: FormItemType.CUSTOM
    labelText: string
    hidden?: boolean
    disabled?: boolean
    defaultValue: any
    render: (item: Omit<CustomItem, 'render'>, state: any, formValues?: FormValues) => ReactElement
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

export interface ExtraAction {
    key: string
    text: string
    buttonType?: 'default'|'primary'|'link'|'ghost'|'dashed'
    buttonWidth?: number
    onAction?: (key: string) => void|Promise<void>
}
