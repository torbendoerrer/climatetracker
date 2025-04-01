import { useEffect } from 'react'

export const useDialogOpacity = ({ setDialogOpacity, timerRef }) => {
    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            if (window.scrollY === 0 || window.scrollY > lastScrollY) {
                setDialogOpacity('opacity-100')
            } else if (window.scrollY < lastScrollY) {
                setDialogOpacity('opacity-85')
            }

            clearTimeout(timerRef.current)

            if (window.scrollY < lastScrollY) {
                timerRef.current = setTimeout(() => {
                    setDialogOpacity('opacity-100')
                }, 500)
            }

            lastScrollY = window.scrollY
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timerRef.current)
        }
    }, [setDialogOpacity, timerRef])
}
