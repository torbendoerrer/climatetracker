import { useEffect } from 'react'

export const useErrorConfirmPassword = ({
    confirmPassword,
    password,
    setErrorConfirmPassword,
}) => {
    useEffect(() => {
        if (password === confirmPassword || !confirmPassword) {
            setErrorConfirmPassword('')
        } else {
            setErrorConfirmPassword('The entered passwords do not match!')
        }
    }, [confirmPassword, password, setErrorConfirmPassword])
}

export const useErrorEmissionFactor = ({
    emissionFactor,
    emissionFactorPattern,
    setErrorEmissionFactor,
}) => {
    useEffect(() => {
        if (emissionFactorPattern.test(emissionFactor) || !emissionFactor) {
            setErrorEmissionFactor('')
        } else {
            setErrorEmissionFactor('Choose an integer value between 1 and 500.')
        }
    }, [emissionFactor, emissionFactorPattern, setErrorEmissionFactor])
}

export const useErrorFuelAdjustment = ({
    fuelAdjustmentFactor,
    fuelAdjustmentPattern,
    setErrorFuelAdjustmentFactor,
}) => {
    useEffect(() => {
        if (
            fuelAdjustmentPattern.test(fuelAdjustmentFactor) ||
            !fuelAdjustmentFactor
        ) {
            setErrorFuelAdjustmentFactor('')
        } else if (fuelAdjustmentFactor > 2) {
            setErrorFuelAdjustmentFactor('Choose a value between 0 and 2.')
        } else {
            setErrorFuelAdjustmentFactor(
                'Choose a value with a maximum of 3 decimal places.'
            )
        }
    }, [
        fuelAdjustmentFactor,
        fuelAdjustmentPattern,
        setErrorFuelAdjustmentFactor,
    ])
}

export const useErrorTransportation = ({
    setErrorTransportation,
    transportationDescription,
    transportationDescriptionPattern,
}) => {
    useEffect(() => {
        if (
            transportationDescriptionPattern.test(transportationDescription) ||
            !transportationDescription
        ) {
            setErrorTransportation('')
        } else {
            if (transportationDescription.charAt(0) === ' ') {
                setErrorTransportation(
                    'The description must not start with an empty string!'
                )
            } else if (transportationDescription.length < 3) {
                setErrorTransportation(
                    'The description must contain at least 3 characters!'
                )
            } else {
                setErrorTransportation(
                    'You must only use Latin letters and numbers!'
                )
            }
        }
    }, [
        setErrorTransportation,
        transportationDescription,
        transportationDescriptionPattern,
    ])
}

export const useErrorUserName = ({
    setErrorUserName,
    userName,
    userNamePattern,
}) => {
    useEffect(() => {
        if (userNamePattern.test(userName) || !userName) {
            setErrorUserName('')
        } else {
            if (userName.length < 5) {
                setErrorUserName(
                    'The user name must contain at least 5 characters!'
                )
            } else if (userName.length > 20) {
                setErrorUserName(
                    'The user name must contain at most 20 characters!'
                )
            } else {
                setErrorUserName('You must only use Latin letters and numbers!')
            }
        }
    }, [setErrorUserName, userName, userNamePattern])
}

export const useErrorDate = ({ dateManually, datePattern, setErrorDate }) => {
    useEffect(() => {
        if (datePattern.test(dateManually) || !dateManually) {
            setErrorDate('')
        } else {
            setErrorDate('Please provide a valid year after 2000.')
        }
    }, [dateManually, datePattern, setErrorDate])
}

export const useErrorDateTime = ({ date, datePattern, setErrorDate }) => {
    useEffect(() => {
        if (datePattern.test(date) || !date) {
            setErrorDate('')
        } else {
            setErrorDate('Please provide a valid date and time format.')
        }
    }, [date, datePattern, setErrorDate])
}

export const useErrorDistance = ({
    distance,
    distancePattern,
    setErrorDistance,
}) => {
    useEffect(() => {
        if (distancePattern.test(distance) || !distance) {
            setErrorDistance('')
        } else {
            if (distance === '0') {
                setErrorDistance('Please provide a number greater than 0.')
            } else {
                setErrorDistance('Choose a float value between 0 and 100,000.')
            }
        }
    }, [distance, distancePattern, setErrorDistance])
}

export const useErrorMethod = ({
    contextMethodToSelect,
    date,
    datePattern,
    distance,
    distancePattern,
    passenger,
    passengerPattern,
    setErrorMethod,
}) => {
    useEffect(() => {
        if (
            !contextMethodToSelect &&
            datePattern.test(date) &&
            distancePattern.test(distance) &&
            passengerPattern.test(passenger)
        ) {
            setErrorMethod('Please choose a Transportation Method!')
        } else {
            setErrorMethod('')
        }
    }, [
        contextMethodToSelect,
        date,
        datePattern,
        distance,
        distancePattern,
        passenger,
        passengerPattern,
        setErrorMethod,
    ])
}

export const useErrorPassenger = ({
    passenger,
    passengerPattern,
    setErrorPassenger,
}) => {
    useEffect(() => {
        if (passengerPattern.test(passenger) || !passenger) {
            setErrorPassenger('')
        } else {
            setErrorPassenger('Choose an integer value between 1 and 9999.')
        }
    }, [passenger, passengerPattern, setErrorPassenger])
}
