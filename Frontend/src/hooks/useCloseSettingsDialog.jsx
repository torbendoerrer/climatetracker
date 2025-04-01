import { useEffect } from 'react'

export const useCloseSettingsDialog = ({
    contextIsSettingsOpen,
    setContextIsSettingsOpen,
    settingsDialogRef,
    userIconRef,
}) => {
    useEffect(() => {
        const closeSettingsDialogClick = (e) => {
            if (
                !contextIsSettingsOpen ||
                !settingsDialogRef.current ||
                !userIconRef.current
            )
                return

            if (
                !settingsDialogRef.current.contains(e.target) &&
                !userIconRef.current.contains(e.target)
            ) {
                setContextIsSettingsOpen(false)
            }
        }

        const closeSettingsDialogKeyboard = (e) => {
            if (
                !contextIsSettingsOpen ||
                !settingsDialogRef.current ||
                !userIconRef.current
            )
                return

            if (e.key === 'Escape') {
                e.stopPropagation()
                setContextIsSettingsOpen(false)
                userIconRef.current.focus()
            }
        }

        window.addEventListener('click', closeSettingsDialogClick)
        window.addEventListener('keydown', closeSettingsDialogKeyboard)

        return () => {
            window.removeEventListener('click', closeSettingsDialogClick)
            window.removeEventListener('keydown', closeSettingsDialogKeyboard)
        }
    }, [
        contextIsSettingsOpen,
        setContextIsSettingsOpen,
        settingsDialogRef,
        userIconRef,
    ])
}
