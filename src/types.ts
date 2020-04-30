export enum FormItemType {
    INPUT = 'input',
    PASSWORD = 'password',
    NUMBER = 'number',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select'
}

export type InputItem = {
    name: string
    itemType: FormItemType.INPUT
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

export type PasswordItem = {
    name: string
    itemType: FormItemType.PASSWORD
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

export type NumberItem = {
    name: string
    itemType: FormItemType.NUMBER
    labelText: string
    defaultValue: number
    min: number
    max: number
    unit: string
}

export type TextareaItem = {
    name: string
    itemType: FormItemType.TEXTAREA
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

export type CheckboxItem = {
    name: string
    itemType: FormItemType.CHECKBOX
    labelText: string
    options: {
        value: string | number
        text: string
    }[]
    defaultValue: (string | number)[]
    required: boolean
}

export type RadioItem = {
    name: string
    itemType: FormItemType.RADIO
    labelText: string
    options: {
        value: string | number
        text: string
    }[]
    defaultValue: string | number
    buttonStyle: 'outline' | 'solid'
    required: boolean
}

export type SelectItem = {
    name: string
    itemType: FormItemType.SELECT
    labelText: string
    options: {
        value: string | number
        text: string
    }[]
    defaultValue: string | number
}

export type FormItem = InputItem | PasswordItem | NumberItem | TextareaItem | CheckboxItem | RadioItem | SelectItem

export interface FormProps {
    items?: FormItem[]
    formWidth?: number
    formWidthUnit?: '%' | 'px'
    labelAlign?: 'left' | 'right' | 'top'
    labelWidth?: number
    onSubmit?: (values: FormValues) => void | Promise<void>
}

export type FormValues = {
    [key: string]: string | string[] | number
}

export interface ValidationResult {
    result: boolean
    errors: { [name: string]: string }
}
