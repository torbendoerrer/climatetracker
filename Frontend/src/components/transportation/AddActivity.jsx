import { useContext, useEffect, useMemo, useState } from 'react'
import FormError from '../form/FormError'
import FormHeader from '../form/FormHeader'
import FormInput from '../form/FormInput'
import FormSubmit from '../form/FormSubmit'
import Select from '../ui/Select'
import {
    ContextActivityDateRef,
    ContextActivityHistory,
    ContextLoggedInUser,
    ContextMethodToSelect,
    ContextTransportationMethods,
    ContextScreenWidth,
} from '../../App'
import { blockNonIntegers } from '../../utils/blockNonIntegers'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import {
    useErrorDateTime,
    useErrorDistance,
    useErrorMethod,
    useErrorPassenger,
} from '../../hooks/useError'
import { useSubmitDisabledAdd } from '../../hooks/useSubmitDisabled'

const AddActivity = () => {
    const contextActivityDateRef = useContext(ContextActivityDateRef)
    // eslint-disable-next-line
    const [_contextActivityHistory, setContextActivityHistory] = useContext(
        ContextActivityHistory
    )
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    // eslint-disable-next-line
    const [contextMethodToSelect, _setContextMethodToSelect] = useContext(
        ContextMethodToSelect
    )
    const [contextTransportationMethods, setContextTransportationMethods] =
        useContext(ContextTransportationMethods)
    const contextScreenWidth = useContext(ContextScreenWidth)

    const [apiErrorAdd, setApiErrorAdd] = useState(false)
    const [apiErrorLoad, setApiErrorLoad] = useState(false)
    const [date, setDate] = useState('')
    const [distance, setDistance] = useState('')
    const [passenger, setPassenger] = useState('')

    const [submitDisabled, setSubmitDisabled] = useState(true)

    const datePattern = useMemo(
        () => /^20[0-9]{2}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/,
        []
    )
    // eslint-disable-next-line
    const distancePattern = useMemo(() => /^([1-9]|0[,\.])[,\.0-9]{0,9}$/, [])
    const passengerPattern = useMemo(() => /^[1-9][0-9]{0,3}$/, [])

    const [errorDate, setErrorDate] = useState('')
    const [errorMethod, setErrorMethod] = useState('')
    const [errorDistance, setErrorDistance] = useState('')
    const [errorPassenger, setErrorPassenger] = useState('')

    useAutoFocus(contextActivityDateRef)

    useEffect(() => {
        const loadTransportation = async () => {
            try {
                const response = await fetch('/method', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                        )}`,
                    },
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Error:', errorData)
                    return
                }

                const data = await response.json()
                const transportationData = data.map((item) => item.name)

                setContextTransportationMethods(transportationData)
            } catch (error) {
                setApiErrorLoad(true)
                console.error(error)
            }
        }
        loadTransportation()
    }, [contextLoggedInUser, setContextTransportationMethods])

    useErrorDateTime({ date, datePattern, setErrorDate })

    useErrorDistance({ distance, distancePattern, setErrorDistance })

    useErrorMethod({
        contextMethodToSelect,
        date,
        datePattern,
        distance,
        distancePattern,
        passenger,
        passengerPattern,
        setErrorMethod,
    })

    useErrorPassenger({ passenger, passengerPattern, setErrorPassenger })

    useSubmitDisabledAdd({
        contextMethodToSelect,
        date,
        datePattern,
        distance,
        distancePattern,
        passenger,
        passengerPattern,
        setSubmitDisabled,
    })

    const handleDateInput = (e) => {
        setApiErrorAdd(false)
        setApiErrorLoad(false)
        setDate(e.target.value)
    }

    const handleDistanceInput = (e) => {
        setApiErrorAdd(false)
        setApiErrorLoad(false)
        setDistance(e.target.value)
    }

    const handlePassengerInput = (e) => {
        setApiErrorAdd(false)
        setApiErrorLoad(false)
        setPassenger(e.target.value)
    }

    const handleDistanceKeyDown = (e) => {
        blockNonIntegers({ e })
        handleKeyDown(e)
    }

    const handlePassengerKeyDown = (e) => {
        blockNonIntegers({ e, float: true })
        handleKeyDown(e)
    }

    const handleFaultyPaste = (e) => {
        e.preventDefault()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !submitDisabled) {
            handleAddActivity()
        }
    }

    const handleAddActivity = async () => {
        const activity = {
            date: date,
            distance: distance,
            passengerCount: passenger,
            methodName: contextMethodToSelect,
            username: contextLoggedInUser.user,
        }

        try {
            setSubmitDisabled(true)
            const response = await fetch('/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify(activity),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                return
            }
            setDate('')
            setDistance('')
            setPassenger('')

            try {
                const resp = await fetch(
                    `/activity?username=${encodeURIComponent(
                        contextLoggedInUser.user
                    )}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${btoa(
                                `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                            )}`,
                        },
                    }
                )

                if (!resp.ok) {
                    const errData = await resp.json()
                    console.error('Error:', errData)
                    return
                }

                const d = await resp.json()
                setContextActivityHistory(
                    d.sort((a, b) => new Date(a.date) - new Date(b.date))
                )
            } catch (err) {
                console.error(err)
            }
        } catch (error) {
            setApiErrorAdd(true)
            console.error(error)
        } finally {
            setSubmitDisabled(false)
        }
    }

    return (
        <div className="main-content">
            <FormHeader
                header="Add Transportation Activity"
                subHeader="required"
            />
            <form
                className="flex flex-col"
                aria-label="Add Transportation Activity."
                autoComplete="on"
                method="post"
                name="activity-add"
                target="_self"
                title="Add Transportation Activity."
            >
                <FormInput
                    autoComplete="off"
                    error={errorDate}
                    id="timeAddTransportation"
                    label="Date and Time"
                    maxLength={undefined}
                    minLength={undefined}
                    onInput={handleDateInput}
                    placeholder={undefined}
                    ref={contextActivityDateRef}
                    title="Date and Time."
                    type="datetime-local"
                    value={date}
                />
                <FormError error={errorDate} />
                {contextTransportationMethods.length ? (
                    <>
                        <Select error={errorMethod} isEdit={false} />
                        <FormError error={errorMethod} />
                    </>
                ) : (
                    <div className="text-center text-normal italic text-red-700 py-2">
                        {apiErrorLoad
                            ? 'Currently, there is a problem loading the Transportation Methods.'
                            : 'There are no Transportation Methods available.'}
                    </div>
                )}
                <FormInput
                    autoComplete="off"
                    error={errorDistance}
                    id="distanceAddTransportation"
                    label="Distance in km"
                    maxLength={100000}
                    minLength={0}
                    onInput={handleDistanceInput}
                    onKeyDown={handleDistanceKeyDown}
                    onPaste={handleFaultyPaste}
                    placeholder="5.75"
                    title="Distance in km."
                    type="number"
                    value={distance}
                />
                <FormError error={errorDistance} />
                <FormInput
                    autoComplete="off"
                    error={apiErrorAdd || errorPassenger}
                    id="passengerAddTransportation"
                    label="Passenger Count"
                    maxLength={9999}
                    minLength={0}
                    onInput={handlePassengerInput}
                    onKeyDown={handlePassengerKeyDown}
                    onPaste={handleFaultyPaste}
                    placeholder="2"
                    step={1}
                    title="Passenger Count."
                    type="number"
                    value={passenger}
                />
                {apiErrorAdd ? (
                    <FormError error="Currently, there is an error adding a new Activity." />
                ) : (
                    <FormError error={errorPassenger} />
                )}
                <FormSubmit
                    disabled={submitDisabled}
                    handleClick={handleAddActivity}
                    value={`${
                        contextScreenWidth === 'MOBILE' ? 'Add' : 'Add Activity'
                    }`}
                />
            </form>
        </div>
    )
}

export default AddActivity
