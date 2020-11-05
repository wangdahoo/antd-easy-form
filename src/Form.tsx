/* eslint no-mixed-operators:off */

import './index.less'
import React, { useState, useEffect } from 'react'
import { Radio, Input, Select, Checkbox, Divider, Button, InputNumber, Empty, DatePicker } from 'antd'
import classnames from 'classnames'
import { FormItem, FormValues, FormItemType, FormProps, ValidationResult,
    SelectItem, CheckboxItem, RadioItem, TextareaItem, NumberItem, PasswordItem, InputItem, CustomItem, DatepickerItem, ExtraAction } from './types'
import { clone } from './deepClone'
import { Moment } from 'moment'

const isArray = (obj: any) => Object.prototype.toString.call(obj) === '[object Array]'

const determineDefaultValue = (item: FormItem) => {
    const isValid = (defaultValue: any) => {
        return defaultValue !== null && defaultValue !== undefined
    }

    switch (item.itemType) {
    case FormItemType.NUMBER:
        return isValid(item.defaultValue) ? item.defaultValue : (item.min || 0)
    case FormItemType.RADIO:
        return isValid(item.defaultValue) ? item.defaultValue : (item.options[0] && item.options[0].value || '')
    case FormItemType.CHECKBOX:
        return item.defaultValue || []
    case FormItemType.SELECT:
        return isValid(item.defaultValue) ? item.defaultValue : (item.options[0] && item.options[0].value || '')
    case FormItemType.DATEPICKER:
        return item.defaultValue || null
    case FormItemType.RANGEPICKER:
        return item.defaultValue || [null, null]
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
            FormItemType.DATEPICKER,
            FormItemType.RANGEPICKER,
            FormItemType.CUSTOM
        ].indexOf(item.itemType) > -1) {
            return {
                ...values,
                [item.name]: determineDefaultValue(item)
            }
        }

        return values
    }, {})

    // console.log('createFormValues', values)

    return values
}

const shouldValidateRequired = (item: FormItem) => [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA,
    FormItemType.CHECKBOX,
    FormItemType.RADIO,
    FormItemType.DATEPICKER,
    FormItemType.RANGEPICKER
].indexOf(item.itemType) > -1

const shouldValidateRegExp = (item: FormItem) => [
    FormItemType.INPUT,
    FormItemType.PASSWORD,
    FormItemType.TEXTAREA
].indexOf(item.itemType) > -1

export function Form (props: FormProps) {
    const items = (props.items || []).map(i => ({ ...i, disabled: props.disabled || i.disabled }))
    const { formWidth = 100, formWidthUnit = '%', labelAlign = 'right', labelWidth = 100, submitText = '提交', resetText = '重置',
        resetAfterSubmit = false, hideResetButton = false, extra = [] } = props
    const [formValues, setFormValues] = useState(createFormValues(items))
    const [validationResult, setValidationResult] = useState({ result: false, errors: {} })
    const [validateCount, setValidateCount] = useState(0)
    const [ajaxOptions, setAjaxOptions] = useState({} as { // eslint-disable-line
        [key: string]: {
            value: string | number
            text: string
        }[]
    })

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
        onReset()
    }, [props])

    async function resolveOptions () {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item.itemType === FormItemType.SELECT && item.getOptions) {
                ajaxOptions[item.name] = await item.getOptions()
            }
        }
    }

    async function onReset () {
        await resolveOptions()
        setFormValues(createFormValues(items))
        setValidationResult({ result: false, errors: {} })
        setValidateCount(0)
    }

    function onSubmit () {
        // console.log(items, formValues)
        const newValidationResult = validate(items, formValues)
        // console.log(newValidationResult)

        if (newValidationResult.result) {
            if (props.onSubmit) props.onSubmit(formValues)
            if (resetAfterSubmit) setFormValues(createFormValues(items))
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
                    value == null ||
                    value === undefined ||
                    // 空字符串
                    (typeof value === 'string' && value === '') ||
                    // 空数组
                    (Object.prototype.toString.call(value) === '[object Array]' && (value as string[]).length === 0) ||
                    // 校验 range picker
                    (
                        item.itemType === FormItemType.RANGEPICKER &&
                        (
                            (isArray(value) && (value as any)[0] === null && (value as any)[1] === null) ||
                            !isArray(value)
                        )
                    )
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

            return customItem.render(customItem as Omit<CustomItem, 'render'>, customItemStates[customItem.name], formValues)

        case FormItemType.RANGEPICKER:
            const rangepickerItem = item as DatepickerItem

            return (
                <DatePicker.RangePicker
                    disabled={rangepickerItem.disabled}
                    style={{ width: '100%' }}
                    value={formValues[rangepickerItem.name] as any}
                    onChange={dates => {
                        setFormValues({
                            ...formValues,
                            [rangepickerItem.name]: dates as any
                        })
                    }}
                />
            )

        case FormItemType.DATEPICKER:
            const datepickerItem = item as DatepickerItem

            return (
                <DatePicker
                    disabled={datepickerItem.disabled}
                    style={{ width: '100%' }}
                    value={formValues[datepickerItem.name] as (Moment | null | undefined)}
                    onChange={date => {
                        if (date !== null) {
                            setFormValues({
                                ...formValues,
                                [datepickerItem.name]: date
                            })
                        }
                    }}
                    picker={datepickerItem.picker || 'date'}
                    format={datepickerItem.format || 'YYYY-MM-DD'}
                />
            )

        case FormItemType.SELECT:
            const selectItem = item as SelectItem

            return (
                <Select
                    disabled={selectItem.disabled}
                    value={formValues[selectItem.name] as string}
                    onChange={(value: string) => {
                        setFormValues({
                            ...formValues,
                            [selectItem.name]: value
                        })
                    }}
                    style={{width: '100%'}}
                    mode={selectItem.multiple ? 'multiple' : undefined}
                >
                    {(
                        selectItem.getOptions && ajaxOptions[selectItem.name]
                            ? ajaxOptions[selectItem.name]
                            : selectItem.options
                    ).map((option, optionIndex) => (
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
                    disabled={checkboxItem.disabled}
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
                    disabled={radioItem.disabled}
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
                    disabled={textareaItem.disabled}
                    value={formValues[textareaItem.name] as string}
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
            const { min = 0, max = 100, step = 1 } = numberItem

            return (
                <InputNumber
                    disabled={numberItem.disabled}
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
                    step={step}
                />
            )

        case FormItemType.PASSWORD:
            const passwordItem = item as PasswordItem

            return (
                <Input.Password
                    disabled={passwordItem.disabled}
                    prefix={passwordItem.prefix || null}
                    value={formValues[passwordItem.name] as string}
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
                    disabled={inputItem.disabled}
                    prefix={inputItem.prefix || null}
                    value={formValues[inputItem.name] as string}
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
            {items.filter(item => !item.hidden).map((item, index) => {
                const { itemType } = item

                if ([
                    FormItemType.INPUT,
                    FormItemType.PASSWORD,
                    FormItemType.NUMBER,
                    FormItemType.TEXTAREA,
                    FormItemType.RADIO,
                    FormItemType.CHECKBOX,
                    FormItemType.SELECT,
                    FormItemType.DATEPICKER,
                    FormItemType.RANGEPICKER,
                    FormItemType.CUSTOM
                ].indexOf(itemType) > -1) {
                    const errMsg: string = (validationResult.errors as any)[item.name]

                    return (
                        <div className="ef-form-item" key={index}>
                            <div className={classnames('ef-form-item-label', labelAlign === 'top' ? 'label-standalone' : '', {
                                'required': (shouldValidateRequired(item) && (item as any).required),
                                'no-label': !(item as any).labelText
                            })} style={{
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

            {props.disabled ? null : <>
                <Divider className='ef-divider' />

                <div style={{ paddingLeft: labelWidth }}>
                    <Button type="primary" onClick={onSubmit} style={{ width: 90 }}>{submitText}</Button>
                    {hideResetButton ? null : <Button type="default" onClick={onReset} style={{ width: 90, marginLeft: 16 }}>{resetText}</Button>}
                    {extra.map((action: ExtraAction) => <Button key={action.key} type={action.buttonType || 'default'} onClick={() => {
                        if (action.onAction) {
                            action.onAction(action.key)
                        }
                    }} style={{ width: action.buttonWidth || 90, marginLeft: 16 }}>{action.text}</Button>)}
                </div>
            </>}
        </div>
    )
}
