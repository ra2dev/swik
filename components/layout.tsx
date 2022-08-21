import {Logo} from "./Logo"
import cn from "classnames"
import {useState} from "react"

const Separator = () => (
    <svg
        data-testid='geist-icon'
        fill='none'
        height='32'
        shapeRendering='geometricPrecision'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1'
        viewBox='0 0 24 24'
        width='32'
        style={{color: "#00000073"}}
    >
        <path d='M16.88 3.549L7.12 20.451'></path>
    </svg>
)

const Tabs = ({items}: {items: {title: string}[]}) => {
    const [active, setActive] = useState(items[0]?.title)
    return (
        <div className='flex'>
            {items?.map((e, i) => {
                const isActive = e.title === active
                return (
                    <div
                        className={cn("mr-2 p-2 pr-3 border-b-2 cursor-pointer", {
                            "border-b-gray-500": isActive
                        })}
                        key={i}
                        onClick={() => setActive(e.title)}
                    >
                        {e.title}
                    </div>
                )
            })}
        </div>
    )
}

export const Navigation = () => {
    return (
        <header
            className='w-full flex flex-col flex-row items-center  border-gray-300 border-b-1 border-solid border'
            style={{}}
        >
            <nav className='ml-auto container mr-auto max-w-5xl flex flex-row items-center text-gray-600 text-sm h-14'>
                <div>
                    <Logo />
                </div>
                <div className='ml-auto flex items-center'>
                    <div className='cursor-pointer hover:underline hover:decoration-lime-400  hover:decoration-4'>
                        Support
                    </div>
                    <div>
                        <button
                            className='ml-4 text-gray-600 text-sm p-1 pl-2 pr-2 rounded-md border-2 border-gray-400 border active:border-gray-400 hover:border-gray-400 focus:border-gray-400'
                            onClick={() => alert("register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </nav>
            <div className='flex ml-auto container mr-auto max-w-5xl text-sm mt-2'>
                <Tabs items={[{"title": "Utilities"}, {"title": "Short Link"}]} />
            </div>
        </header>
    )
}
export const Footer = () => {
    return (
        <footer className='w-full border-t-1 border-gray-300 border-t-1 border-solid border-t'>
            <div className='container ml-auto mr-auto max-w-5xl text-center p-2 pb-5 flex justify-center mt-4 mb-4'>
                <a href='https://ra2.dev' target='_blank' rel='noopener noreferrer' className='mr-auto ml-auto flex'>
                    <span>
                        Powered by&nbsp;<b className='decoration-amber-500 underline decoration-4'>RA2</b>
                    </span>
                    <span
                        className='text-sm'
                        style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed"
                        }}
                    >
                        .dev
                    </span>
                </a>
            </div>
        </footer>
    )
}

export const Layout = (props: any) => {
    return (
        <>
            <Navigation />
            <main className='w-full' id='content'>
                <div className='container ml-auto mr-auto pt-10 pr-10 max-w-5xl mb-20'>{props.children}</div>
            </main>
            <Footer />
        </>
    )
}
