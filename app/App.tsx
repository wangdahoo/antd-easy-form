import React from 'react'

interface Props {
   name: string
}

export default function App (props: Props) {
    return (
        <div>{props.name}</div>
    )
}
