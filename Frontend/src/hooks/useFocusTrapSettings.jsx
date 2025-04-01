import { useEffect } from 'react'

export const useFocusTrapSettings = ({ contextIsSettingsOpen }) => {
    useEffect(() => {
        const focusTrap = (e) => {
            if (e.key !== 'Tab') return

            const focusableElements = Array.from(
                document.querySelectorAll('.settings')
            ).filter((item) => !item.disabled)

            const firstFocusableElement = focusableElements[0]
            const lastFocusableElement = focusableElements.at(-1)

            const nextElement =
                focusableElements[
                    focusableElements.indexOf(document.activeElement) + 1
                ]
            const previousElement =
                focusableElements[
                    focusableElements.indexOf(document.activeElement) - 1
                ]

            e.preventDefault()

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus()
                } else {
                    previousElement.focus()
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus()
                } else {
                    nextElement.focus()
                }
            }
        }

        contextIsSettingsOpen && document.addEventListener('keydown', focusTrap)

        return () => {
            document.removeEventListener('keydown', focusTrap)
        }
    }, [contextIsSettingsOpen])
}
