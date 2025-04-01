export const calculateFilteredTime = ({ filter, filteredTime }) => {
    const date = new Date(filteredTime)

    switch (filter) {
        case 'Day':
            date.setHours(0, 0, 0, 0)
            break
        case 'Month':
            date.setDate(1)
            date.setHours(0, 0, 0, 0)
            break
        case 'Year':
            date.setMonth(0, 1)
            date.setHours(0, 0, 0, 0)
            break
        default:
            break
    }

    return date.getTime()
}
