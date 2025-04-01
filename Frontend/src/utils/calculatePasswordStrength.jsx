export const calculatePasswordStrength = (password) => {
    if (!password) {
        return 0
    }

    const lowerCasePattern = password.match(/[a-zäöü]/g) || []
    const upperCasePattern = password.match(/[A-ZÄÖÜ]/g) || []
    const numberPattern = password.match(/[0-9]/g) || []
    const specialPattern = password.match(/[^a-zäöü0-9 ]/gi) || []

    const lowerCaseCounter = lowerCasePattern.length
    const upperCaseCounter = upperCasePattern.length
    const numberCounter = numberPattern.length
    const specialCounter = specialPattern.length
    const charCounter = password.length

    const distinctLowerCaseCounter = [...new Set(lowerCasePattern)].length
    const distinctUpperCaseCounter = [...new Set(upperCasePattern)].length
    const distinctNumberCounter = [...new Set(numberPattern)].length
    const distinctSpecialCounter = [...new Set(specialPattern)].length

    if (
        charCounter >= 15 &&
        distinctLowerCaseCounter > 1 &&
        distinctUpperCaseCounter > 1 &&
        distinctNumberCounter > 1 &&
        distinctSpecialCounter > 1
    ) {
        return 5
    }

    if (
        charCounter < 15 &&
        distinctLowerCaseCounter > 1 &&
        distinctUpperCaseCounter > 1 &&
        distinctNumberCounter > 1 &&
        distinctSpecialCounter > 1
    ) {
        return 4
    }

    if (
        charCounter >= 8 &&
        distinctLowerCaseCounter &&
        distinctUpperCaseCounter &&
        distinctNumberCounter &&
        distinctSpecialCounter
    ) {
        return 3
    }

    if (
        charCounter >= 8 &&
        (!lowerCaseCounter ||
            !upperCaseCounter ||
            !numberCounter ||
            !specialCounter)
    ) {
        return 2
    }

    if (charCounter < 8) {
        return 1
    }
}
