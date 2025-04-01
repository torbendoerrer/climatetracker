import { useContext, useState } from 'react'
import { ContextLoggedInUser, ContextUsers } from '../../../App'

const EditUsersTableRow = ({ role, user }) => {
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    // eslint-disable-next-line
    const [_contextUsers, setContextUsers] = useContext(ContextUsers)

    const [apiError, setApiError] = useState(false)

    const rowStyle = 'text-ellipsis overflow-hidden pb-2 px-1'

    const handleChange = async () => {
        try {
            const response = await fetch('/users/elevate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify({ username: user }),
            })
            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                return
            }
            setContextUsers((prev) => {
                return prev.map((item) => {
                    return item.user === user
                        ? { ...item, role: 'Admin' }
                        : item
                })
            })
        } catch (error) {
            setApiError(true)
            console.error(error)
        }
    }

    return (
        <tr className="text-normal">
            <td className={rowStyle} title={user}>
                {user}
            </td>
            <td className={rowStyle} title={role}>
                {role}
            </td>
            <td className="flex justify-center pt-0.5 md:pt-1">
                <label hidden htmlFor={`edit-${user}-${role}`}>
                    Change Role to Admin?
                </label>
                <input
                    aria-disabled={role === 'Admin'}
                    aria-label={
                        role === 'Admin'
                            ? user + ' is already an Admin.'
                            : `Change ${user}'s role to Admin?`
                    }
                    className={`w-4 h-4 ${
                        role === 'Admin' ? 'zinc-300' : 'zinc-50'
                    } rounded-sm`}
                    defaultChecked={role === 'Admin'}
                    disabled={role === 'Admin'}
                    id={`edit-${user}-${role}${apiError ? 'Error' : ''}`}
                    name={`make-${user}-admin`}
                    onChange={handleChange}
                    title={
                        role === 'Admin'
                            ? user + ' is already an Admin.'
                            : apiError
                            ? `Currently, there is an error elevating ${user} to Admin.`
                            : `Change ${user}'s role to Admin?`
                    }
                    type="checkbox"
                />
            </td>
        </tr>
    )
}

export default EditUsersTableRow
