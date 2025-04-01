import { useRef } from 'react'
import { useAutoFocus } from './../../hooks/useAutoFocus'

const FormSubmitCancel = ({ disabled, value }) => {
    const cancelRef = useRef(null)

    useAutoFocus(cancelRef)

    const disabledClass = disabled
        ? 'pointer-events-none'
        : 'pointer-events-auto'

    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            window.location = '/'
        }
    }

    return (
        <a
            aria-disabled={disabled}
            aria-label={value}
            className={`w-24 sm:w-32 text-center text-large green-500 ${disabledClass} px-2 py-1 mt-4 rounded-full point
            hover:bg-green-400 active:bg-green-300
            focus-visible:outline-green-600 focus-visible:outline-offset-1`}
            href="/"
            onKeyDown={handleKeyDown}
            ref={cancelRef}
            title={value}
        >
            {value}
        </a>
    )
}

export default FormSubmitCancel
