import { useContext, useState } from 'react'
import FormHeader from '../../form/FormHeader'
import FormSubmitCancel from '../../form/FormSubmitCancel'
import FormSubmitDelete from '../../form/FormSubmitDelete'
import { ContextIsLoggedIn, ContextLoggedInUser } from '../../../App'
import { setItemInStorage } from '../../../utils/setItemInStorage'

const UserDelete = () => {
    // eslint-disable-next-line
    const [_contextIsLoggedIn, setContextIsLoggedIn] =
        useContext(ContextIsLoggedIn)
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)

    const [apiError, setApiError] = useState(false)
    const [isAccountDeleted, setIsAccountDeleted] = useState(false)
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)

    const handleLogout = () => {
        setContextIsLoggedIn(false)
        setItemInStorage('isfiltered', false)
        setItemInStorage('isloggedin', false)
        setItemInStorage('issigningup', true)
        setItemInStorage('role', '')
        setItemInStorage('token', '')
        setItemInStorage('username', '')
        window.location = '/'
    }

    const handleDelete = async () => {
        setIsDeleteDisabled(true)
        try {
            const response = await fetch('/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify({
                    username: contextLoggedInUser.user,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                setApiError(true)
                return
            }

            handleLogout()
        } catch (error) {
            setApiError(true)
            console.error(error)
        } finally {
            setIsAccountDeleted(true)
            setIsDeleteDisabled(false)
        }
    }

    return (
        <div className="main-content">
            <FormHeader
                header="Delete Account"
                subHeader={!isAccountDeleted ? 'delete' : undefined}
            />
            {!isAccountDeleted ? (
                <form
                    className="flex flex-col"
                    aria-label="Delete Account."
                    autoComplete="on"
                    method="post"
                    name="delete-user"
                    target="_self"
                    title="Delete Account."
                >
                    <div className="flex flex-wrap gap-x-4 justify-evenly">
                        <FormSubmitCancel
                            disabled={isDeleteDisabled}
                            value="Cancel"
                        />
                        <FormSubmitDelete
                            disabled={isDeleteDisabled}
                            handleDelete={handleDelete}
                            value="Delete"
                        />
                    </div>
                </form>
            ) : (
                <div className="text-center text-large pt-2">
                    {apiError ? (
                        <div className="flex flex-col items-center">
                            <div>Error deleting your Account.</div>
                            <FormSubmitCancel value="Cancel" />
                        </div>
                    ) : (
                        'Account successfully deleted.'
                    )}
                </div>
            )}
        </div>
    )
}

export default UserDelete
