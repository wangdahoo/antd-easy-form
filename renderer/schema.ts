import { Type } from '@sinclair/typebox'

export const FormValues = Type.Union([
    Type.String(),
    Type.Array(Type.String()),
    Type.Number(),
    // Moment & Moment[]
    Type.Null(),
    Type.Undefined()
])

export const FormSchema = Type.Object({
    formWidth: Type.Optional(Type.Integer({
        minimum: 0,
    })),
    formWidthUnit: Type.Optional(Type.Union([
        Type.Literal('%'),
        Type.Literal('px')
    ])),
    labelAlign: Type.Optional(Type.Union([
        Type.Literal('left'),
        Type.Literal('right'),
        Type.Literal('top')
    ])),
    labelWidth: Type.Optional(Type.Integer({
        minimum: 0,
    })),
    submitText: Type.Optional(Type.String()),
    // onSubmit: Type.Optional(
    //     Type.Function([Type.Array(FormValues)], Type.Void())
    // ),
    resetText: Type.Optional(Type.String()),
    style: Type.Optional(Type.Object({})),
    className: Type.Optional(Type.String()),
    resetAfterSubmit: Type.Optional(Type.Boolean()),
    hideResetButton: Type.Optional(Type.Boolean()),
    disabled: Type.Optional(Type.Boolean()),
})
