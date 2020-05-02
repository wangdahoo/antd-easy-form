import './index.less'
import React, { useState, useEffect } from 'react'
import { Radio, Input, Select, Checkbox, Divider, Button, InputNumber, Empty } from 'antd'
import classnames from 'classnames'
import { FormItem, FormValues, FormItemType, FormProps, ValidationResult,
    SelectItem, CheckboxItem, RadioItem, TextareaItem, NumberItem, PasswordItem, InputItem, CustomItem } from './types'
import { clone } from './deepClone'

const determineDefaultValue = (item: FormItem) => {
    switch (item.itemType) {
        case FormItemType.NUMBER:
            return item.defaultValue || item.min || 0
        case FormItemType.RADIO:
            return item.defaultValue || item.options[0] && item.options[0].value || ''
        case FormItemType.CHECKBOX:
            return item.defaultValue || []
        case FormItemType.SELECT:
            return item.defaultValue || item.options[0] && item.options[0].value || ''
        default:
            // FormItemType.INPUT, FormItemType.PASSWORD, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CUSTOM
            return item.defaultValue || ''
    }
}

const createFormValues = (items: FormItem[]): FormValues => {
    const values = items.reduce((values: { [key: string]: any }, item: FormItem) => {
        if ([
            FormItemType.INPUT,
            FormItemType.PASSWORD,
            FormItemType.NUMBER,
            FormItemType.TEXTAREA,
            FormItemType.RADIO,
            FormItemType.CHECKBOX,
            FormItemType.SELECT,
            FormItemType.CUSTOM
        ].indexOf(item.itemType) > -1) {
            return {
                ...values,
                [item.name]: determineDefaultValue(item)
            }
        }

        return values
    }, {})

    return values
}

const shouldValidateRequired = (item: FormItem) => [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA,
    FormItemType.CHECKBOX,
    FormItemType.RADIO
].indexOf(item.itemType) > -1

const shouldValidateRegExp = (item: FormItem) => [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA
].indexOf(item.itemType) > -1

export function Form (props: FormProps) {
    const { items = [], formWidth = 100, formWidthUnit = '%', labelAlign = 'left', labelWidth = 100, submitText = '提交', resetText = '重置' } = props
    const [formValues, setFormValues] = useState(createFormValues(items))
    const [validationResult, setValidationResult] = useState({ result: false, errors: {} })
    const [validateCount, setValidateCount] = useState(0)

    const customItemStates: { [key: string]: any } = items
        .filter(item => item.itemType === FormItemType.CUSTOM)
        .reduce((states, item) => {
            states[item.name] = Object.create(null)

            Object.defineProperty(states[item.name], 'value', {
                get () {
                    return clone(formValues[item.name])
                },

                set (value: any) {
                    formValues[item.name] = value
                }
            })

            return states
        }, Object.create(null))

    useEffect(() => {
        setFormValues(createFormValues(items))
        setValidationResult({ result: false, errors: {} })
        setValidateCount(0)
    }, [items])

    function onSubmit () {
        // console.log(items, formValues)
        const newValidationResult = validate(items, formValues)
        // console.log(newValidationResult)

        if (newValidationResult.result) {
            if (props.onSubmit) props.onSubmit(formValues)
            setFormValues(createFormValues(items))
        }

        setValidationResult(newValidationResult)
        setValidateCount(validateCount + 1)
    }

    function validate (items: FormItem[], formValues: FormValues): ValidationResult {
        return items.reduce(({ result, errors }: ValidationResult, item: FormItem) => {
            const { name, labelText } = item as any
            const value = formValues[name]

            // 校验必填项
            if (shouldValidateRequired(item) && (item as any).required) {
                if (
                    // 空字符串
                    (typeof value === 'string' && value === '') ||
                    // 空数组
                    (Object.prototype.toString.call(value) === '[object Array]' && (value as string[]).length === 0)
                 ) {
                    errors[name] = `${labelText}为必填项`
                    result = false
                }
            }

            // 有正则表达式的话，校验正则表单时
            if (shouldValidateRegExp(item) && (item as any).re && (item as any).re instanceof RegExp && typeof value === 'string') {
                const re = (item as any).re as RegExp

                if (!re.test(value) && !errors[name]) {
                    errors[name] = `${labelText}格式不正确`
                    result = false
                }
            }

            return {
                result,
                errors
            }
        }, {
            result: true,
            errors: {}
        })
    }

    const renderFormItem = (item: FormItem) => {
        const { itemType } = item

        switch (itemType) {

        case FormItemType.CUSTOM:
            const customItem = item as CustomItem

            return customItem.render(customItem as Omit<CustomItem, 'render'>, customItemStates[customItem.name])

        case FormItemType.SELECT:
            const selectItem = item as SelectItem

            return (
                <Select
                    value={formValues[selectItem.name] as string}
                    onChange={(value: string) => {
                        setFormValues({
                            ...formValues,
                            [selectItem.name]: value
                        })
                    }}
                    style={{width: '100%'}}
                >
                    {selectItem.options.map((option, optionIndex) => (
                        <Select.Option key={optionIndex} value={option.value}>
                            {option.text}
                        </Select.Option>
                    ))}
                </Select>
            )

        case FormItemType.CHECKBOX:
            const checkboxItem = item as CheckboxItem

            return (
                <Checkbox.Group
                    value={formValues[checkboxItem.name] as string[]}
                    onChange={value => {
                        setFormValues({
                            ...formValues,
                            [checkboxItem.name]: value as string[]
                        })
                    }}
                >
                    {checkboxItem.options.map((option, optionIndex) => (
                        <Checkbox key={optionIndex} value={option.value}>
                            {option.text}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )

        case FormItemType.RADIO:
            const radioItem = item as RadioItem

            return (
                <Radio.Group
                  value={formValues[radioItem.name]}
                  onChange={e => {
                    setFormValues({
                        ...formValues,
                        [radioItem.name]: e.target.value
                    })
                  }}
                  buttonStyle={radioItem.buttonStyle}
                >
                  {radioItem.options.map((option, optionIndex) => (
                    <Radio.Button key={optionIndex} value={option.value}>
                      {option.text}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )

        case FormItemType.TEXTAREA:
            const textareaItem = item as TextareaItem

            return (
                <Input.TextArea
                    value={formValues[textareaItem.name]}
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            [textareaItem.name]: e.target.value
                        })
                    }}
                    placeholder={textareaItem.placeholder || `请输入${textareaItem.labelText}`}
                />
            )

        case FormItemType.NUMBER:
            const numberItem = item as NumberItem
            const { min = 0, max = 100, unit = '' } = numberItem

            return (
                <InputNumber
                    style={{width: '100%'}}
                    value={formValues[numberItem.name] as number}
                    onChange={value => {
                        value = value || min

                        setFormValues({
                            ...formValues,
                            [numberItem.name]: value
                        })
                    }}
                    min={min}
                    max={max}
                    formatter={value => {
                        if (!value) return `${min} ${unit}`
                        return `${value} ${unit}`
                    }}
                    parser={value => {
                        if (!value) return Number(min)
                        return Number(value.replace(` ${unit}`, ''))
                    }}
                />
            )

        case FormItemType.PASSWORD:
            const passwordItem = item as PasswordItem

            return (
                <Input.Password
                    prefix={passwordItem.prefix || null}
                    value={formValues[passwordItem.name]}
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            [passwordItem.name]: e.target.value
                        })
                    }}
                    placeholder={passwordItem.placeholder || `请输入${passwordItem.labelText}`}
                />
            )

        default:
            const inputItem = item as InputItem

            return (
                <Input
                    prefix={inputItem.prefix || null}
                    value={formValues[inputItem.name]}
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            [inputItem.name]: e.target.value
                        })
                    }}
                    placeholder={inputItem.placeholder || `请输入${inputItem.labelText}`}
                />
            )
        }
    }

    if (items.length === 0) return <Empty />

    return (
        <div className={classnames(props.className || '', 'ef-form')} style={{
            ...(props.style || {}),
            width: `${formWidth}${formWidthUnit}`
        }}>
            {items.map((item, index) => {
                const { itemType } = item

                if ([
                    FormItemType.INPUT,
                    FormItemType.PASSWORD,
                    FormItemType.NUMBER,
                    FormItemType.TEXTAREA,
                    FormItemType.RADIO,
                    FormItemType.CHECKBOX,
                    FormItemType.SELECT,
                    FormItemType.CUSTOM
                ].indexOf(itemType) > -1) {
                    const errMsg: string = (validationResult.errors as any)[item.name]

                    return (
                        <div className="ef-form-item" key={index}>
                            <div className={classnames('ef-form-item-label', labelAlign === 'top' ? 'label-standalone' : '')} style={{
                                width: labelWidth,
                                ...(labelAlign !== 'top' ? {
                                    textAlign: labelAlign
                                } : {})
                            }}>
                                {(item as any).labelText}
                            </div>
                            <div className='ef-form-item-content'>
                                {renderFormItem(item)}
                                <div className="ef-err-msg">
                                    {errMsg}
                                </div>
                            </div>
                        </div>
                    )
                }

                return null
            })}

            <Divider className='ef-divider' />

            <div style={{ paddingLeft: labelWidth }}>
                <Button type="primary" onClick={onSubmit} style={{ width: 90, marginRight: 16 }}>{submitText}</Button>
                <Button type="default" onClick={() => setFormValues(createFormValues(items))} style={{ width: 90 }}>{resetText}</Button>
            </div>
        </div>
    )
}
