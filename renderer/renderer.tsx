import React from 'react'
import { FormSchema } from './schema'
import Ajv from 'ajv'
import { Form } from '..'
import { Empty } from 'antd'

export function FormRenderer (props: any) {
    const schema = props.schema || {}
    const ajv = new Ajv({ })
    const validated = ajv.validate(FormSchema, schema)

    const genFormPropsFromJsonSchema = (schema: any) => {
        return {
            ...schema,
            onSubmit: console.log
        }
    }

    return validated
        ? <Form {...genFormPropsFromJsonSchema(schema)} />
        : <Empty description={'json schema 格式不正确'} />
}
