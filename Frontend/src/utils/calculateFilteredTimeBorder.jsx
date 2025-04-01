export const calculateFilteredTimeBorder = ({
    filter,
    filteredTime,
    filteredTimeBorder,
}) => {
    const border = new Date(filteredTimeBorder)
    const date = new Date(filteredTime)

    switch (filter) {
        case 'Day':
            border.setMonth(date.getMonth(), date.getDate())
            border.setFullYear(date.getFullYear())
            border.setHours(23, 59, 59, 999)
            break
        case 'Month':
            border.setMonth(date.getMonth() + 1, 1)
            border.setDate(border.getDate() - 1)
            border.setFullYear(date.getFullYear())
            border.setHours(23, 59, 59, 999)
            break
        case 'Year':
            border.setMonth(11, 31)
            border.setFullYear(date.getFullYear())
            border.setHours(23, 59, 59, 999)
            break
        default:
            break
    }

    return border.getTime()
}
