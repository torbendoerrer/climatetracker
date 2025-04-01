export const isTodayDisabled = ({
    currentTime,
    filteredCategory,
    filteredTime,
}) => {
    const filtered = new Date(filteredTime)
    const current = new Date(currentTime)

    switch (filteredCategory) {
        case 'Day':
            return (
                filtered.getDate() === current.getDate() &&
                filtered.getMonth() === current.getMonth() &&
                filtered.getFullYear() === current.getFullYear()
            )
        case 'Month':
            return (
                filtered.getMonth() === current.getMonth() &&
                filtered.getFullYear() === current.getFullYear()
            )
        case 'Year':
            return filtered.getFullYear() === current.getFullYear()
        default:
            break
    }
}
