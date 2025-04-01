import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import FormHeader from '../../form/FormHeader'
import FormSubmit from '../../form/FormSubmit'
import Select from '../../ui/Select'
import {
    ContextLoggedInUser,
    ContextMethodToSelect,
    ContextTransportationMethods,
} from '../../../App'

const EditTransportation = () => {
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    const [contextMethodToSelect, setContextMethodToSelect] = useContext(
        ContextMethodToSelect
    )
    const [contextTransportationMethods, setContextTransportationMethods] =
        useContext(ContextTransportationMethods)

    const selectRef = useRef(undefined)

    const [apiErrorDelete, setApiErrorDelete] = useState(false)
    const [apiErrorLoad, setApiErrorLoad] = useState(false)

    const loadTransportation = useCallback(async () => {
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
    }, [contextLoggedInUser, setContextTransportationMethods])

    useEffect(() => {
        loadTransportation()
    }, [loadTransportation])

    const handleDelete = async () => {
        setApiErrorDelete(false)
        try {
            const response = await fetch('/method', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify({ name: contextMethodToSelect }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                return
            }

            loadTransportation()
            setContextMethodToSelect('')
            selectRef?.current?.focus()
        } catch (error) {
            setApiErrorDelete(true)
            console.error(error)
        }
    }

    return (
        <div className="main-content">
            <FormHeader
                header="Edit Transportation Methods"
                subHeader="required"
            />
            <form
                className="flex flex-col"
                aria-label="Edit Transportation Methods."
                autoComplete="on"
                method="post"
                name="method-delete"
                target="_self"
                title="Edit Transportation Methods."
            >
                {contextTransportationMethods.length ? (
                    <>
                        <Select isEdit selectRef={selectRef} />
                        {apiErrorDelete && (
                            <div className="text-center text-normal italic text-red-700 pt-2">
                                Currently, there is an error deleting this
                                Transportation Method.
                            </div>
                        )}
                        <FormSubmit
                            disabled={!contextMethodToSelect}
                            handleClick={handleDelete}
                            value="Delete"
                        />
                    </>
                ) : (
                    <div className="text-center text-normal italic text-red-700 pt-2">
                        {apiErrorLoad
                            ? 'Currently, there is a problem loading the Transportation Methods.'
                            : 'There are no Transportation Methods available.'}
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditTransportation
