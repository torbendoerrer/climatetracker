import { useRef } from 'react'
import { useAutoFocus } from '../../hooks/useAutoFocus'

const NotFound = () => {
    const anchorRef = useRef(null)
    useAutoFocus(anchorRef)

    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            window.location = '/'
        }
    }

    return (
        <div className="w-full sm:w-80 md:w-96 text-center flex flex-col gap-1 slate-100 rounded-lg p-4">
            <span className="text-extra-large">404 Not Found</span>
            <span className="text-large">
                This is not the page you are looking for.
            </span>
            <a
                aria-label="Back to the Homepage."
                className="text-normal zinc-100 px-2 py-1 mt-4 rounded-full animate-slow-pulse
                hover:bg-zinc-300 active:bg-zinc-400 focus-visible:outline-green-600"
                href="/"
                onKeyDown={handleKeyDown}
                ref={anchorRef}
                title="Back to the Homepage."
            >
                Back to the Homepage
            </a>
        </div>
    )
}

export default NotFound
