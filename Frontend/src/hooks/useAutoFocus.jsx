import { useEffect } from 'react'

export const useAutoFocus = (ref) => {
    useEffect(() => {
        ref?.current?.focus()
    }, [ref])
}
