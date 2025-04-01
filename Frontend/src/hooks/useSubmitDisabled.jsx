import { useEffect } from 'react'

export const useSubmitDisabled = ({
    confirmPassword,
    isSigningUp,
    password,
    passwordPattern,
    setSubmitDisabled,
    userName,
    userNamePattern,
}) => {
    useEffect(() => {
        if (
            (isSigningUp &&
                userNamePattern.test(userName) &&
                passwordPattern.test(password) &&
                confirmPassword === password) ||
            (!isSigningUp &&
                userNamePattern.test(userName) &&
                passwordPattern.test(password))
        ) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [
        confirmPassword,
        isSigningUp,
        password,
        passwordPattern,
        setSubmitDisabled,
        userName,
        userNamePattern,
    ])
}

export const useSubmitDisabledTransportation = ({
    emissionFactor,
    emissionFactorPattern,
    fuelAdjustmentFactor,
    fuelAdjustmentPattern,
    setSubmitDisabled,
    transportationDescription,
    transportationDescriptionPattern,
}) => {
    useEffect(() => {
        if (
            emissionFactorPattern.test(emissionFactor) &&
            fuelAdjustmentPattern.test(fuelAdjustmentFactor) &&
            transportationDescriptionPattern.test(transportationDescription)
        ) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [
        emissionFactor,
        emissionFactorPattern,
        fuelAdjustmentFactor,
        fuelAdjustmentPattern,
        setSubmitDisabled,
        transportationDescription,
        transportationDescriptionPattern,
    ])
}

export const useSubmitDisabledAdd = ({
    contextMethodToSelect,
    date,
    datePattern,
    distance,
    distancePattern,
    passenger,
    passengerPattern,
    setSubmitDisabled,
}) => {
    useEffect(() => {
        if (
            contextMethodToSelect &&
            datePattern.test(date) &&
            distancePattern.test(distance) &&
            passengerPattern.test(passenger)
        ) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [
        contextMethodToSelect,
        date,
        datePattern,
        distance,
        distancePattern,
        passenger,
        passengerPattern,
        setSubmitDisabled,
    ])
}
