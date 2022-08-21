export const menuItems: any[] = [
    {
        title: "Developer",
        items: [
            {title: "Convert", type: "Command", icon: "🧶"},
            {title: "Transformate", type: "Media"}
        ]
    },
    {
        title: "Media",
        items: [
            {title: "Convert"},
            {title: "Transform", type: "App"},
            {title: "Transform", type: "App"},
            {title: "Transform", type: "App"},
            {title: "Transform", type: "App"}
        ]
    }
]

const TokenMenuBottom = () => {
    return (
        <div
            style={{marginLeft: "-1rem", marginRight: "-1rem", borderTop: "1px solid #dedbd2", marginTop: "15px"}}
            className='p-2 menu-bottom flex'
        >
            <div className='text-gray-700'>
                🦄 <span className='text-xs'>Option Selected</span>
            </div>
            <div className='ml-auto text-gray-400 text-sm flex'>
                <span>Action</span>
                <div className='rounded-md h-5 w-5 flex justify-center common-item-command ml-1'>↩</div>
                <div className='rounded-md h-5 w-5 flex items-center justify-center common-item-command ml-1'>⌘</div>
            </div>
        </div>
    )
}

export const TokenMenu = () => {
    const active = false
    return (
        <>
            <div style={{marginLeft: "-1rem", marginRight: "-1rem"}} className='px-2'>
                {menuItems.map((e, j) => {
                    return (
                        <div className='mb-1'>
                            {e.title && <div className='text-xs font-light text-gray-500'>{e.title}</div>}
                            {e.items?.map((el: any, i: any) => {
                                const active = i === 0 && j === 1
                                return (
                                    <button
                                        data-active={active?.toString()}
                                        className={`${
                                            active ? "bg-gray-100 text-gray-700 font-semibold" : "text-gray-600"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm editor-option  focus:outline-none`}
                                    >
                                        {el.icon ? (
                                            <div className='mr-3'>{el.icon}</div>
                                        ) : (
                                            <EditInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                                        )}
                                        <div>{el.title}</div>
                                        <div className='ml-auto text-xs text-gray-500 font-light'>
                                            {el.type ?? "Command"}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <TokenMenuBottom />
        </>
    )
}


function EditInactiveIcon(props: any) {
    return (
        <svg {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 4H12V12H4V4Z' fill='#EDE9FE' stroke='#fda4af' strokeWidth='2' />
            <path d='M8 8H16V16H8V8Z' fill='#EDE9FE' stroke='#fda4af' strokeWidth='2' />
        </svg>
    )
}
