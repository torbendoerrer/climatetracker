import { useContext, useEffect, useRef, useState } from 'react'
import EditUsersTableError from './EditUsersTableError'
import EditUsersTableFilter from './EditUsersTableFilter'
import EditUsersTableHead from './EditUsersTableHead'
import EditUsersTableRow from './EditUsersTableRow'
import FormHeader from '../../form/FormHeader'
import { ContextLoggedInUser, ContextUsers } from '../../../App'
import { formattedRole } from '../../../utils/formattedRole'
import { setItemInStorage } from '../../../utils/setItemInStorage'
import { useAutoFocus } from '../../../hooks/useAutoFocus'
import { useFilterUsers } from '../../../hooks/useFilterUsers'

const EditUsersTable = () => {
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    const [contextUsers, setContextUsers] = useContext(ContextUsers)

    const [apiError, setApiError] = useState(false)
    const [isFiltered, setIsFiltered] = useState(
        JSON.parse(sessionStorage.getItem('climate-tracker'))?.isfiltered ||
            false
    )
    const [users, setUsers] = useState(contextUsers)

    const filterRef = useRef(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                        )}`,
                    },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Error:', errorData)
                    return
                }
                const data = await response.json()

                const usersData = data.map((item) => ({
                    user: item.username,
                    role: formattedRole(item.role),
                }))

                setContextUsers(usersData)
            } catch (error) {
                setApiError(true)
                console.error(error)
            }
        }

        fetchUsers()
    }, [contextLoggedInUser, setContextUsers])

    useFilterUsers({ contextUsers, isFiltered, setUsers })

    useAutoFocus(filterRef)

    const toggleFilter = () => {
        const prev = isFiltered
        setIsFiltered(!prev)
        setItemInStorage('isfiltered', !prev)
    }

    return (
        <div className="main-content">
            <FormHeader header="Edit Users" />
            <table className="w-full text-center table-fixed">
                <caption className="text-large my-2">
                    Change someone's Role to Admin.
                    <EditUsersTableFilter
                        isFiltered={isFiltered}
                        ref={filterRef}
                        toggleFilter={toggleFilter}
                    />
                </caption>
                {users.length ? (
                    <>
                        <EditUsersTableHead />
                        <tbody>
                            {users.map((item) => {
                                return (
                                    <EditUsersTableRow
                                        role={item.role}
                                        user={item.user}
                                        key={item.user}
                                    />
                                )
                            })}
                        </tbody>
                    </>
                ) : (
                    <EditUsersTableError apiError={apiError} />
                )}
            </table>
        </div>
    )
}

export default EditUsersTable
