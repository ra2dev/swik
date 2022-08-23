import React, {useMemo, useCallback, useRef, useEffect, useState} from "react"
// @ts-ignore
import ReactDOM from "react-dom"
import {createEditor} from "slate"
import {withHistory} from "slate-history"
import {Slate, Editable, withReact} from "slate-react"
import {TokenItem} from "./TokenItem/TokenItem"
import {useTokenItem, withMentions, withSingleLine} from "./TokenItem/useTokenItem"
import {Portal} from "./components/Portal"
import {TokenMenu} from "./TokenMenu"

const initialValue: any[] = [
    {
        type: "paragraph",
        children: [
            {
                type: "mention",
                character: "convert",
                children: [{text: ""}]
            },
            {text: "bas"}
        ]
    }
]

const editorComponents: any = {
    mention: TokenItem
}

const Editor = () => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    // ref used to avoid hmr issues in dev mode, probably should be resolved in a better way
    const editorRef = useRef(withMentions(withReact(withHistory(withSingleLine(createEditor()) as any))))
    const editor = editorRef.current
    const {onKeyDown, onChange, addMention, onBlur} = useTokenItem(editor)

    return (
        <div className='main-editor rounded-md p-3 px-4 pb-0'>
            <Slate editor={editor} value={initialValue} onChange={onChange}>
                <Editable
                    renderElement={renderElement}
                    onKeyDown={onKeyDown}
                    onBlurCapture={onBlur}
                    placeholder='Search for commands and actions'
                />
            </Slate>
            <div
                style={{
                    background: "#bebebf5c",
                    minWidth: "100px",
                    minHeight: "1px",
                    margin: "10px -1rem 10px -1rem"
                }}
            />
            <TokenMenu addMention={addMention} />
        </div>
    )
}

const Element = (props: any) => {
    const Component = editorComponents[props.element?.type]
    return Component ? <Component {...props} /> : <p {...props.attributes}>{props.children}</p>
}

export default Editor
