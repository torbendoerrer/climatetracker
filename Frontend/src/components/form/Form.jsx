import { createContext, useContext, useMemo, useRef, useState } from 'react'
import FormError from './FormError'
import FormHeader from './FormHeader'
import FormInput from './FormInput'
import FormInputPassword from './FormInputPassword'
import FormMeter from './FormMeter'
import FormSubmit from './FormSubmit'
import FormSwitch from './FormSwitch'
import { ContextIsLoggedIn, ContextLoggedInUser } from '../../App'
import { formattedRole } from '../../utils/formattedRole'
import { setItemInStorage } from '../../utils/setItemInStorage'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { useErrorConfirmPassword, useErrorUserName } from '../../hooks/useError'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'
import { useSubmitDisabled } from '../../hooks/useSubmitDisabled'

export const PasswordVisibilityContext = createContext(undefined)

const Form = () => {
    // eslint-disable-next-line
    const [_contextIsLoggedIn, setContextIsLoggedIn] =
        useContext(ContextIsLoggedIn)

    // eslint-disable-next-line
    const [_contextLoggedInUser, setContextLoggedInUser] =
        useContext(ContextLoggedInUser)

    const [userName, setUserName] = useState(
        JSON.parse(sessionStorage.getItem('climate-tracker'))?.username || ''
    )
    const userNameRef = useRef(null)

    const [apiError, setApiError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordDisabled, setConfirmPasswordDisabled] = useState(true)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [isSigningUp, setIsSigningUp] = useState(
        JSON.parse(sessionStorage.getItem('climate-tracker'))?.issigningup ??
            true
    )

    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorUserName, setErrorUserName] = useState('')

    const userNamePattern = useMemo(() => /^[a-z0-9]{5,20}$/i, [])
    const passwordPattern = useMemo(() => /^[^\s]{8,25}$/, [])

    useAutoFocus(userNameRef)

    useSubmitDisabled({
        confirmPassword,
        isSigningUp,
        password,
        passwordPattern,
        setSubmitDisabled,
        userName,
        userNamePattern,
    })

    useErrorUserName({ setErrorUserName, userName, userNamePattern })

    usePasswordStrength({
        password,
        passwordPattern,
        setConfirmPasswordDisabled,
        setErrorPassword,
        setPasswordStrength,
    })

    useErrorConfirmPassword({
        confirmPassword,
        password,
        setErrorConfirmPassword,
    })

    const handleUserNameInput = (e) => {
        setApiError(false)
        setUserName(e.target.value)
        setItemInStorage('username', e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !submitDisabled) {
            handleClickAuthenticate(e)
        }
    }

    const handlePasswordInput = (e) => {
        setApiError(false)
        setPassword(e.target.value)
        setConfirmPassword('')
    }

    const handleConfirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSwitch = () => {
        setApiError(false)
        setIsSigningUp((prev) => !prev)
        setPassword('')
        setConfirmPassword('')
        setItemInStorage('issigningup', !isSigningUp)
        setIsPasswordHidden(true)
        setConfirmPasswordDisabled(true)
    }

    const handleClickAuthenticate = async (e) => {
        e.preventDefault()
        setApiError(false)
        setSubmitDisabled(true)

        const userData = {
            username: userName,
            password: password,
        }

        try {
            const response = await fetch(
                `/authentication/${
                    isSigningUp ? 'register' : 'authenticate'
                }`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                setContextIsLoggedIn(false)
                setItemInStorage('isloggedin', false)
                setItemInStorage('token', '')
                return
            }

            const token = await response.json()
            setContextIsLoggedIn(true)
            setItemInStorage('isloggedin', true)
            setItemInStorage('role', formattedRole(token.role))
            setItemInStorage('token', password)

            setContextLoggedInUser({
                user: token.username,
                role: formattedRole(token.role),
                token: password,
            })
        } catch (error) {
            setApiError(true)
            console.error(error)
        } finally {
            setSubmitDisabled(false)
        }
    }

    return (
        <div className="main-content">
            <FormHeader
                header={isSigningUp ? 'Signup' : 'Login'}
                subHeader="required"
            />
            <FormSwitch isSigningUp={isSigningUp} handleClick={handleSwitch} />
            <PasswordVisibilityContext.Provider
                value={[isPasswordHidden, setIsPasswordHidden]}
            >
                <form
                    className="flex flex-col"
                    autoComplete="on"
                    aria-label={isSigningUp ? 'Signup' : 'Login'}
                    name={isSigningUp ? 'signup' : 'login'}
                    method="post"
                    target="_self"
                    title={isSigningUp ? 'Signup' : 'Login'}
                >
                    <FormInput
                        autoComplete="username"
                        error={errorUserName}
                        id={`${isSigningUp ? 'signup' : 'login'}User`}
                        label="User Name"
                        maxLength={20}
                        minLength={5}
                        onInput={handleUserNameInput}
                        onKeyDown={handleKeyDown}
                        placeholder="JohnDoe1337"
                        ref={userNameRef}
                        title={
                            isSigningUp
                                ? 'Choose a user name containing between 5 and 20 characters and only Latin letters or numbers.'
                                : 'Enter your user name.'
                        }
                        type="text"
                        value={userName}
                    />
                    <FormError error={errorUserName} />
                    <FormInputPassword
                        autoComplete={`${
                            isSigningUp ? 'new' : 'current'
                        }-password`}
                        error={(!isSigningUp && apiError) || errorPassword}
                        hidden={isPasswordHidden}
                        id={`${isSigningUp ? 'signup' : 'login'}Password`}
                        label="Password"
                        maxLength={25}
                        minLength={8}
                        onInput={handlePasswordInput}
                        onKeyDown={handleKeyDown}
                        title={
                            isSigningUp
                                ? 'Choose a password containing between 8 and 25 characters.'
                                : 'Enter your password.'
                        }
                        value={password}
                    />
                    {!isSigningUp && apiError ? (
                        <FormError
                            error={`Currently, you are unable to ${
                                isSigningUp ? 'signup.' : 'login.'
                            }`}
                        />
                    ) : (
                        <FormError error={errorPassword} />
                    )}
                    {isSigningUp && (
                        <>
                            <FormMeter strength={passwordStrength} />
                            <FormInputPassword
                                autoComplete="new-password"
                                aria-disabled={confirmPasswordDisabled}
                                disabled={confirmPasswordDisabled}
                                error={apiError || errorConfirmPassword}
                                hidden={isPasswordHidden}
                                id="signupConfirmPassword"
                                label="Confirm Password"
                                maxLength={25}
                                minLength={8}
                                onInput={handleConfirmPasswordInput}
                                onKeyDown={handleKeyDown}
                                title={
                                    confirmPasswordDisabled
                                        ? 'Currently disabled, enter a valid password first.'
                                        : 'Confirm the password by entering it again.'
                                }
                                value={confirmPassword}
                            />
                            {apiError ? (
                                <FormError
                                    error={`Currently, you are unable to ${
                                        isSigningUp ? 'signup.' : 'login.'
                                    }`}
                                />
                            ) : (
                                <FormError error={errorConfirmPassword} />
                            )}
                        </>
                    )}
                    <FormSubmit
                        disabled={submitDisabled}
                        handleClick={handleClickAuthenticate}
                        value={isSigningUp ? 'Signup' : 'Login'}
                    />
                </form>
            </PasswordVisibilityContext.Provider>
        </div>
    )
}

export default Form
