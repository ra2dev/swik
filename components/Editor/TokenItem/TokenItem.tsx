import {useFocused, useSelected} from "slate-react"
import React from "react"

type TokenItemProps = {
    attributes: any
    children: React.ReactNode
    element: any
}

export const TokenItem = ({attributes, children, element}: TokenItemProps) => {
    const selected = useSelected()
    const focused = useFocused()

    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(" ", "-")}`}
            style={{
                padding: "3px 6px 2px",
                margin: "0 2px 0 1px",
                verticalAlign: "baseline",
                display: "inline-block",
                borderRadius: "4px",
                fontSize: "0.9em",
                boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none"
            }}
            className='common-item'
        >
            {children}
            {element.character}
        </span>
    )
}
