export const actionConfig: any = {
    actions: {
        type: "options",
        items: [
            {
                title: "Developer",
                items: [
                    {title: "Convert", type: "Command", icon: "🧶", code: "convert"},
                    {title: "Transform", type: "Media", code: "transform"},
                    {title: "Beautify", type: "Media", code: "transform"}
                ]
            },
            {
                title: "Media",
                items: [{title: "Convert"}]
            },
            {
                title: "Media",
                items: [{title: "Create", code: "convert"}]
            }
        ]
    },
    convert: {
        type: "split",
        items: [
            {
                title: "Developer",
                items: [
                    {title: "base64", type: "Command", icon: "🧶", code: "convert"},
                    {title: "base42", type: "Command", icon: "🧶", code: "convert"},
                    {title: "base24", type: "Command", icon: "🧶", code: "convert"}
                ]
            }
        ]
    }
}
