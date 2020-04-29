import React from 'react'

import { EasyForm } from '../src'

interface Props {
   name: string
}

export default function App (props: Props) {
    return (
        <div>
            <EasyForm />
        </div>
    )
}
