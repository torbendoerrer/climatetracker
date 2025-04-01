export const formatFootprint = (num) => {
    return `${(num < 1000 ? num : num / 1000)
        .toFixed(5)
        .replace(/0*$/g, '')
        .replace(/\.$/, '.0')} ${num < 1000 ? 'g' : 'kg'} CO`
}
