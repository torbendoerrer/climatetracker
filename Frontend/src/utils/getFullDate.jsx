export const getFullDate = ({ date, filteredCategory }) => {
    return `${
        filteredCategory === 'Day'
            ? `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/`
            : ''
    }${
        filteredCategory !== 'Year'
            ? `${
                  date.getMonth() + 1 < 10
                      ? `0${date.getMonth() + 1}`
                      : date.getMonth() + 1
              }/`
            : ''
    }${date.getFullYear()}`
}
