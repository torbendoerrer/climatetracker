import { useEffect } from 'react'

export const useFilterUsers = ({ contextUsers, isFiltered, setUsers }) => {
    useEffect(() => {
        setUsers(
            isFiltered
                ? contextUsers.filter((item) => {
                      return item.role === 'User'
                  })
                : contextUsers
        )
    }, [contextUsers, isFiltered, setUsers])
}
