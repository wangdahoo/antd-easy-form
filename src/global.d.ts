declare enum FormItemType {
    INPUT = 'input',
    NUMBER = 'number',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select'
}

type InputItem = {
    id: string
    itemType: FormItemType.INPUT
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

type NumberItem = {
    id: string
    itemType: FormItemType.NUMBER
    labelText: string
    defaultValue: number
    min: number
    max: number
    unit: string
}

type TextareaItem = {
    id: string
    itemType: FormItemType.TEXTAREA
    labelText: string
    placeholder: string
    defaultValue: string
    required: boolean
    re?: RegExp
}

type CheckboxItem = {
    id: string
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
    id: string
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
    id: string
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
    errors: { [id: string]: string }
}
