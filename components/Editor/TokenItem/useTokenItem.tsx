import React, {useCallback, useEffect, useRef, useState} from "react"
import {Editor, Range, Transforms} from "slate"
import {ReactEditor} from "slate-react"
import {Portal} from "../components/Portal"

const insertMention = (editor: any, character: any) => {
    const mention: any = {
        type: "mention",
        character,
        children: [{text: ""}]
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

const CHARACTERS = ["base64", "bbase64", "bbbase64", "bbbase64", "bbasdase64"]

export const withMentions = (editor: any) => {
    const {isInline, isVoid} = editor

    editor.isInline = (element: any) => {
        return element.type === "mention" ? true : isInline(element)
    }

    editor.isVoid = (element: any) => {
        return element.type === "mention" ? true : isVoid(element)
    }

    return editor
}

// https://github.com/ianstormtaylor/slate/issues/419#issuecomment-590135015
export function withSingleLine(editor: any) {
    const {normalizeNode} = editor

    editor.normalizeNode = ([node, path]: any) => {
        if (path.length === 0) {
            if (editor.children.length > 1) {
                Transforms.mergeNodes(editor)
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

export const useTokenItem = (editor: any) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [target, setTarget] = useState<Range | null>(null)
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState("")
    const chars = CHARACTERS

    useEffect(() => {
        if (target && chars.length > 0 && ref.current) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            if (el) {
                el.style.top = `${rect.top + window.pageYOffset + 24}px`
                el.style.left = `${rect.left + window.pageXOffset}px`
            }
        }
    }, [chars.length, editor, index, search, target])

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

    const portal = (
        <>
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
        </>
    )

    const onChange = () => {
        const {selection} = editor

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start)
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
                setTarget(beforeRange)
                setSearch(beforeMatch[1])
                setIndex(0)
                return
            }
        }

        setTarget(null)
    }
    return {onKeyDown, onChange, portal}
}
