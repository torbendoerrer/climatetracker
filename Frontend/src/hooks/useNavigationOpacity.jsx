import { useEffect } from 'react'

export const useNavigationOpacity = ({
    setNavOpacity,
    setShadowOpacity,
    timerRef,
}) => {
    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            if (window.scrollY === 0 || window.scrollY > lastScrollY) {
                setNavOpacity('opacity-100')
                setShadowOpacity('shadow-green-700/50')
            } else if (window.scrollY < lastScrollY) {
                setNavOpacity('opacity-85')
                setShadowOpacity('shadow-green-700/15')
            }

            clearTimeout(timerRef.current)

            if (window.scrollY < lastScrollY) {
                timerRef.current = setTimeout(() => {
                    setNavOpacity('opacity-100')
                    setShadowOpacity('shadow-green-700/50')
                }, 500)
            }

            lastScrollY = window.scrollY
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timerRef.current)
        }
    }, [setNavOpacity, setShadowOpacity, timerRef])
}
