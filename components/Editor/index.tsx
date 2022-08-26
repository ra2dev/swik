import React, {useMemo, useCallback, useRef, useState} from "react"
// @ts-ignore
import ReactDOM from "react-dom"
import {createEditor, Editor as EditorType} from "slate"
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
    const [value, setValue] = useState(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    // ref used to avoid hmr issues in dev mode, probably should be resolved in a better way
    const editorRef = useRef(withMentions(withReact(withHistory(withSingleLine(createEditor()) as any))))
    const editor = editorRef.current as EditorType
    const {onKeyDown, addMention, onBlur} = useTokenItem(editor)

    const {tokens, search} = useMemo(() => {
        const items: any[] = value[0]?.children?.filter((e: any) => e.text || e.character) ?? []
        return {
            tokens: items.filter(e => e.type === "mention").map(e => e.character?.toLowerCase()) ?? [],
            search:
                items
                    .filter(e => e.type !== "mention")
                    .map(e => e.text)
                    .pop()
                    ?.trim() ?? ""
        }
    }, [value])

    return (
        <div className='main-editor rounded-md p-3 px-4 pb-0'>
            <Slate editor={editor as any} value={value} onChange={setValue}>
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
            <TokenMenu addMention={addMention} search={search} tokens={tokens} />
        </div>
    )
}

const Element = (props: any) => {
    const Component = editorComponents[props.element?.type]
    return Component ? <Component {...props} /> : <p {...props.attributes}>{props.children}</p>
}

export default Editor
