export const getFormattedDate = (date) => {
    const split = date.split(/[-T]/)
    return `${split[2]}/${split[1]}/${split[0]} - ${split[3]}`
}
