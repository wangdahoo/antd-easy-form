declare enum FormItemType {
    INPUT = 'input',
    NUMBER = 'number',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select'
}

type InputItem = {
    name: string
    itemType: FormItemType.INPUT
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

type NumberItem = {
    name: string
    itemType: FormItemType.NUMBER
    labelText: string
    defaultValue: number
    min: number
    max: number
    unit: string
}

type TextareaItem = {
    name: string
    itemType: FormItemType.TEXTAREA
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

type CheckboxItem = {
    name: string
    itemType: FormItemType.CHECKBOX
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: (string|number) []
    required: boolean
}

type RadioItem = {
    name: string
    itemType: FormItemType.RADIO
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: string|number
    buttonStyle: 'outline' | 'solid'
    required: boolean
}

type SelectItem = {
    name: string
    itemType: FormItemType.SELECT
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: string|number
}

type FormItem =  InputItem | NumberItem | TextareaItem | CheckboxItem | RadioItem | SelectItem

interface FormProps {
    formItems?: FormItem[]
    formWidth?: number
    formWidthUnit?: '%' | 'px'
    labelAlign?: 'left' | 'right' | 'top'
    labelWidth?: number
    onSubmit?: (formValue: FormValues) => void
}

type FormValues = {
    values: {
        [key: string]: string|string[]|number
    }
    result: -1|0|1
    comment: string
}

interface ValidationResult {
    result: boolean
    errors: { [name: string]: string }
}
