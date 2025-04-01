import { useContext, useMemo, useRef, useState } from 'react'
import FormError from '../../form/FormError'
import FormHeader from '../../form/FormHeader'
import FormInput from '../../form/FormInput'
import FormSubmit from '../../form/FormSubmit'
import { ContextLoggedInUser, ContextScreenWidth } from '../../../App'
import { blockNonIntegers } from '../../../utils/blockNonIntegers'
import { useAutoFocus } from '../../../hooks/useAutoFocus'
import {
    useErrorFuelAdjustment,
    useErrorEmissionFactor,
    useErrorTransportation,
} from '../../../hooks/useError'
import { useSubmitDisabledTransportation } from '../../../hooks/useSubmitDisabled'

const NewTransportation = () => {
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    const contextScreenWidth = useContext(ContextScreenWidth)

    const [emissionFactor, setEmissionFactor] = useState('')
    const [fuelAdjustmentFactor, setFuelAdjustmentFactor] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [transportationDescription, setTransportationDescription] =
        useState('')

    const transportationRef = useRef(null)

    const [apiError, setApiError] = useState(false)
    const [errorEmissionFactor, setErrorEmissionFactor] = useState('')
    const [errorFuelAdjustmentFactor, setErrorFuelAdjustmentFactor] =
        useState('')
    const [errorTransportation, setErrorTransportation] = useState('')

    const emissionFactorPattern = useMemo(
        () => /^([1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/,
        []
    )
    const fuelAdjustmentPattern = useMemo(
        // eslint-disable-next-line
        () => /^(((0|1)([\.,][0-9]{1,3})?|2))$/,
        []
    )
    const transportationDescriptionPattern = useMemo(
        () => /^[a-z0-9][a-z0-9 ]{2,29}$/i,
        []
    )

    useAutoFocus(transportationRef)

    useErrorTransportation({
        setErrorTransportation,
        transportationDescription,
        transportationDescriptionPattern,
    })

    useErrorEmissionFactor({
        emissionFactor,
        emissionFactorPattern,
        setErrorEmissionFactor,
    })

    useErrorFuelAdjustment({
        fuelAdjustmentFactor,
        fuelAdjustmentPattern,
        setErrorFuelAdjustmentFactor,
    })

    useSubmitDisabledTransportation({
        emissionFactor,
        emissionFactorPattern,
        fuelAdjustmentFactor,
        fuelAdjustmentPattern,
        setSubmitDisabled,
        transportationDescription,
        transportationDescriptionPattern,
    })

    const handleTransportationDescriptionInput = (e) => {
        setApiError(false)
        setTransportationDescription(e.target.value)
    }

    const handleEmissionFactorInput = (e) => {
        setApiError(false)
        setEmissionFactor(e.target.value)
    }

    const handleEmissionFactorKeyDown = (e) => {
        blockNonIntegers({ e, float: true })
        handleKeyDown(e)
    }

    const handleFuelAdjustmentInput = (e) => {
        setApiError(false)
        setFuelAdjustmentFactor(e.target.value)
    }

    const handleFuelAdjustmentKeyDown = (e) => {
        blockNonIntegers({ e })
        handleKeyDown(e)
    }

    const handleFaultyPaste = (e) => {
        e.preventDefault()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !submitDisabled) {
            handleClick()
        }
    }

    const handleClick = async () => {
        setApiError(false)

        const transportation = {
            name: transportationDescription,
            emissionFactor: emissionFactor,
            fuelAdjustment: fuelAdjustmentFactor,
        }

        setSubmitDisabled(true)

        try {
            const response = await fetch('/method', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify(transportation),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                return
            }

            setEmissionFactor('')
            setFuelAdjustmentFactor('')
            setTransportationDescription('')
        } catch (error) {
            setApiError(true)
            console.error(error)
        } finally {
            transportationRef?.current?.focus()
            setSubmitDisabled(false)
        }
    }

    return (
        <div className="main-content">
            <FormHeader
                header="New Transportation Method"
                subHeader="required"
            />
            <form
                className="flex flex-col pt-4"
                acceptCharset="utf-8"
                aria-label="New Transportation Method."
                autoComplete="on"
                encType="application/x-www-form-urlencoded"
                method="post"
                name="method-add"
                target="_self"
                title="New Transportation Method."
            >
                <FormInput
                    autoComplete="on"
                    error={errorTransportation}
                    id="newTransportationDescription"
                    label="Transportation Description"
                    maxLength={30}
                    minLength={3}
                    onInput={handleTransportationDescriptionInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Train"
                    ref={transportationRef}
                    title="Choose a name for the new Transportation Method."
                    type="text"
                    value={transportationDescription}
                />
                <FormError error={errorTransportation} />
                <FormInput
                    autoComplete="off"
                    error={errorEmissionFactor}
                    id="newTransportationEmission"
                    label="Emission Factor"
                    maxLength={500}
                    minLength={0}
                    onInput={handleEmissionFactorInput}
                    onKeyDown={handleEmissionFactorKeyDown}
                    onPaste={handleFaultyPaste}
                    placeholder="30"
                    step={1}
                    title="Set an emission factor for this Transportation Method."
                    type="number"
                    value={emissionFactor}
                />
                <FormError error={errorEmissionFactor} />
                <FormInput
                    autoComplete="off"
                    error={apiError || errorFuelAdjustmentFactor}
                    id="newTransportationFuel"
                    label="Fuel Adjustment Factor"
                    maxLength={2}
                    minLength={0}
                    onInput={handleFuelAdjustmentInput}
                    onKeyDown={handleFuelAdjustmentKeyDown}
                    onPaste={handleFaultyPaste}
                    placeholder="0.05"
                    step={0.001}
                    title="Set a fuel adjustment factor for this Transportation Method."
                    type="number"
                    value={fuelAdjustmentFactor}
                />
                {apiError ? (
                    <FormError error="Currently, there is a problem adding a new Transportation Method." />
                ) : (
                    <FormError error={errorFuelAdjustmentFactor} />
                )}
                <FormSubmit
                    disabled={submitDisabled}
                    handleClick={handleClick}
                    value={`${
                        contextScreenWidth === 'MOBILE' ? 'Add' : 'Add Method'
                    }`}
                />
            </form>
        </div>
    )
}

export default NewTransportation
