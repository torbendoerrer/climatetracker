import { useEffect } from 'react'
import { calculatePasswordStrength } from '../utils/calculatePasswordStrength'

export const usePasswordStrength = ({
    password,
    passwordPattern,
    setConfirmPasswordDisabled,
    setErrorPassword,
    setPasswordStrength,
}) => {
    useEffect(() => {
        if (!password) {
            setConfirmPasswordDisabled(true)
            setErrorPassword('')
        } else if (passwordPattern.test(password)) {
            setConfirmPasswordDisabled(false)
            setErrorPassword('')
        } else if (password.length < 8) {
            setConfirmPasswordDisabled(true)
            setErrorPassword('The password must contain at least 8 characters!')
        }
        setPasswordStrength(calculatePasswordStrength(password))
    }, [
        password,
        passwordPattern,
        setConfirmPasswordDisabled,
        setErrorPassword,
        setPasswordStrength,
    ])
}
