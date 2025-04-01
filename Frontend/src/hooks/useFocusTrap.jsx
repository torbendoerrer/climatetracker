import { useEffect } from 'react'

export const useFocusTrap = () => {
    useEffect(() => {
        const focusTrap = (e) => {
            if (e.key !== 'Tab') return

            const focusableElements = Array.from(
                document.querySelectorAll('a, button, input')
            ).filter((item) => !item.disabled)

            const firstFocusableElement = focusableElements[0]
            const lastFocusableElement = focusableElements.at(-1)

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault()
                    lastFocusableElement.focus()
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstFocusableElement.focus()
                }
            }
        }

        document.addEventListener('keydown', focusTrap)

        return () => {
            document.removeEventListener('keydown', focusTrap)
        }
    })
}
