import { useEffect } from 'react'

export const useAutoSelectFirst = ({
    contextTransportationMethods,
    setContextMethodToSelect,
}) => {
    useEffect(() => {
        if (contextTransportationMethods.length === 1) {
            setContextMethodToSelect(contextTransportationMethods[0])
        }
    }, [contextTransportationMethods, setContextMethodToSelect])
}
