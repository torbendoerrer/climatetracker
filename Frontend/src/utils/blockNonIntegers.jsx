export const blockNonIntegers = ({ e, float = false }) => {
    const blockFloat = ['.', ',']
    const blockSymbols = ['e', 'E', '+', '-']
    const blockCharacters = float
        ? blockSymbols.concat(blockFloat)
        : blockSymbols

    if (blockCharacters.includes(e.key)) {
        e.preventDefault()
    }
}
