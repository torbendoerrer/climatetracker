import { useContext, useEffect, useState } from 'react'
import { ContextActivityDateRef } from '../../App'

const GoToTop = () => {
    const contextActivityDateRef = useContext(ContextActivityDateRef)

    const [isVisible, setIsVisible] = useState(false)

    const handleScroll = () => {
        const visible =
            document.documentElement.scrollHeight > window.innerHeight + 256
        setIsVisible(visible)
    }

    const handleMoveToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        const focusActivityDate = () => {
            if (window.scrollY === 0) contextActivityDateRef?.current?.focus()
        }

        window.addEventListener('scroll', focusActivityDate)

        return () => window.removeEventListener('scroll', focusActivityDate)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {isVisible && (
                <div className="flex w-full justify-center px-2 pt-8">
                    <button
                        aria-label="Go to the top of the page."
                        className="w-full max-w-64 text-center zinc-100 px-2 py-1 rounded-lg
                        hover:bg-zinc-300 active:bg-zinc-400
                        focus-visible:outline-green-600"
                        onClick={handleMoveToTop}
                        title="Go to Top."
                    >
                        Go to Top
                    </button>
                </div>
            )}
        </>
    )
}

export default GoToTop
