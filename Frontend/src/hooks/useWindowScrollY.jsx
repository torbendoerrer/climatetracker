import { useEffect, useState } from 'react'
import { setItemInStorage } from '../utils/setItemInStorage'

export const useWindowScrollY = () => {
    // eslint-disable-next-line
    const [previousPath, _setPreviousPath] = useState(
        JSON.parse(sessionStorage.getItem('climate-tracker'))?.previouspath ||
            ''
    )

    useEffect(() => {
        const scrolly =
            JSON.parse(sessionStorage.getItem('climate-tracker'))?.scrolly || 0

        const scrollToPosition = () => {
            window.scrollTo({ top: scrolly, left: 0 })
        }

        if (previousPath === window.location.pathname) {
            requestAnimationFrame(() => {
                setTimeout(scrollToPosition, 0)
            })
        } else {
            setItemInStorage('scrolly', 0)
        }
        setItemInStorage('previouspath', window.location.pathname)
    }, [previousPath])

    useEffect(() => {
        const onScroll = () => {
            setItemInStorage('scrolly', window.scrollY)
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])
}
