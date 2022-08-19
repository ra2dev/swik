import React, {useMemo, useCallback, useRef, useEffect, useState} from "react"
// @ts-ignore
import ReactDOM from "react-dom"
import {Editor, Transforms, Range, createEditor, Descendant} from "slate"
import {withHistory} from "slate-history"
import {Slate, Editable, ReactEditor, withReact, useSelected, useFocused} from "slate-react"

type MentionElement = any

export const Portal = ({children}: any) => {
    return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null
}

const MentionExample = () => {
    const ref = useRef<HTMLDivElement | null>()
    const [target, setTarget] = useState<Range | undefined>()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState("")
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(() => withMentions(withReact(withHistory(createEditor() as any))), [])

    const chars = CHARACTERS
    // .filter(c => c.toLowerCase().startsWith(search.toLowerCase())).slice(0, 10)

    const onKeyDown = useCallback(
        event => {
            if (target) {
                switch (event.key) {
                    case "ArrowDown":
                        event.preventDefault()
                        const prevIndex = index >= chars.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case "ArrowUp":
                        event.preventDefault()
                        const nextIndex = index <= 0 ? chars.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case "Tab":
                    case "Enter":
                        event.preventDefault()
                        Transforms.select(editor, target)
                        insertMention(editor, chars[index])
                        setTarget(null)
                        break
                    case "Escape":
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            }
        },
        [index, search, target]
    )

    useEffect(() => {
        if (target && chars.length > 0) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [chars.length, editor, index, search, target])

    return (
        <div className='bg-white rounded-md p-2 px-4'>
            <Slate
                editor={editor}
                value={initialValue}
                onChange={() => {
                    const {selection} = editor

                    if (selection && Range.isCollapsed(selection)) {
                        const [start] = Range.edges(selection)
                        const wordBefore = Editor.before(editor, start, {unit: "word"})
                        const before = wordBefore && Editor.before(editor, wordBefore)
                        const beforeRange = before && Editor.range(editor, before, start)
                        const beforeText = beforeRange && Editor.string(editor, beforeRange)
                        const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/)
                        const after = Editor.after(editor, start)
                        const afterRange = Editor.range(editor, start, after)
                        const afterText = Editor.string(editor, afterRange)
                        const afterMatch = afterText.match(/^(\s|$)/)

                        console.log({beforeMatch, afterMatch, beforeText, start})
                        if (beforeMatch && afterMatch) {
                            setTarget(beforeRange)
                            setSearch(beforeMatch[1])
                            setIndex(0)
                            return
                        }
                    }

                    setTarget(null)
                }}
            >
                <Editable renderElement={renderElement} onKeyDown={onKeyDown} placeholder='Enter some text...' />
                {target && chars.length > 0 && (
                    <Portal>
                        <div
                            ref={ref}
                            style={{
                                top: "-9999px",
                                left: "-9999px",
                                position: "absolute",
                                zIndex: 1,
                                padding: "3px",
                                background: "white",
                                borderRadius: "4px",
                                boxShadow: "0 1px 5px rgba(0,0,0,.2)"
                            }}
                            data-cy='mentions-portal'
                        >
                            {chars.map((char, i) => (
                                <div
                                    key={char}
                                    style={{
                                        padding: "1px 3px",
                                        borderRadius: "3px",
                                        background: i === index ? "#B4D5FF" : "transparent"
                                    }}
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    </Portal>
                )}
            </Slate>
        </div>
    )
}

const withMentions = editor => {
    const {isInline, isVoid} = editor

    editor.isInline = element => {
        return element.type === "mention" ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === "mention" ? true : isVoid(element)
    }

    return editor
}

const insertMention = (editor: any, character: any) => {
    const mention: MentionElement = {
        type: "mention",
        character,
        children: [{text: ""}]
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

const Element = (props: any) => {
    const {attributes, children, element} = props
    switch (element.type) {
        case "mention":
            return <Mention {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Mention = ({attributes, children, element}: any) => {
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
                backgroundColor: element.character === "base64" ? "red" : "#eee",
                fontSize: "0.9em",
                boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none"
            }}
        >
            {element.character}
        </span>
    )
}

const initialValue: any[] = [
    {
        type: "paragraph",
        children: [
            {
                type: "mention",
                character: "R2-D2",
                children: [{text: ""}]
            },
            {text: "!"}
        ]
    }
]

const CHARACTERS = ["base64", "bbase64", "bbbase64", "bbbase64", "bbasdase64"]

export default MentionExample
