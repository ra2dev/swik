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
    const positionRef = useRef(editor.selection?.focus)
    if (editor.selection?.focus) positionRef.current = editor.selection?.focus

    const onBlur = () => {
        if (editor.selection?.focus) positionRef.current = editor.selection?.focus
    }

    const getText = (from?: any) => {
        return Editor.string(editor, Editor.range(editor, from ?? {offset: 0, path: [0, 0]}, editor?.selection?.anchor))
    }

    const addMention = (nextText: any) => {
        const focus = editor.selection?.focus ?? Editor.end(editor, [])
        const prev = Editor.before(editor, focus, {unit: "word"})

        const mention = {
            type: "mention",
            character: nextText,
            children: [{text: ""}]
        }
        try {
            if (!getText(prev)) {
                Transforms.move(editor)
                Transforms.insertNodes(editor, mention)
            } else {
                Transforms.select(editor, {
                    anchor: prev!,
                    focus: focus
                })
                Transforms.insertNodes(editor, mention)
            }
            // { at: [editor.children.length] }
        } catch (e) {
            Transforms.insertNodes(editor, mention, {at: focus})
        }

        try {
            Transforms.move(editor)
        } catch (e) {}
    }

    const onKeyDown = useCallback(event => {
        switch (event.key) {
            case "Enter":
                event.preventDefault()
                // Transforms.select(editor, editor?.selection?.focus)
                // insertMention(editor, getText())

                // @ts-ignore
                for (const position of Editor.positions(editor)) {
                    console.log(position)
                }

                const prev = Editor.before(editor, editor.selection.focus, {unit: "word"})
                addMention(getText(prev))

                // console.log(editor?.selection)
                // setTarget(null)
                break
        }
    }, [])

    const onChange = (val: any) => {
        console.log(val)
    }
    return {onKeyDown, onChange, addMention, onBlur}
}
