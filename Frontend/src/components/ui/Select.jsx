import { useContext } from 'react'
import Option from './Option'
import { ContextMethodToSelect, ContextTransportationMethods } from '../../App'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { useAutoSelectFirst } from '../../hooks/useAutoSelectFirst'

const Select = ({ error = undefined, isEdit, selectRef = undefined }) => {
    // eslint-disable-next-line
    const [contextTransportationMethods, _setContextTransportationMethods] =
        useContext(ContextTransportationMethods)

    // eslint-disable-next-line
    const [_contextMethodToSelect, setContextMethodToSelect] = useContext(
        ContextMethodToSelect
    )

    const marginBottom = !isEdit ? (error ? 'mb-1' : 'mb-5 md:mb-6') : ''

    useAutoFocus(selectRef)

    useAutoSelectFirst({
        contextTransportationMethods,
        setContextMethodToSelect,
    })

    const handleChange = (e) => {
        setContextMethodToSelect(e.target.value)
    }

    return (
        <>
            <label
                className={`${isEdit ? 'text-center' : ''} text-large py-1`}
                htmlFor={`select${isEdit ? 'Edit' : 'Add'}Transportation`}
            >
                Select a Transportation Method{' '}
                <span className="text-red-700">*</span>
            </label>
            <select
                aria-label="Select a Transportation Method."
                className={`${
                    isEdit ? 'max-h-48' : 'max-h-24'
                } w-full text-normal overflow-auto zinc-50 ${marginBottom} p-2 rounded-md
                focus-visible:outline-green-600 `}
                id={`select${isEdit ? 'Edit' : 'Add'}Transportation`}
                name={`${isEdit ? 'edit' : 'add'}-transportation`}
                onChange={handleChange}
                ref={selectRef}
                size={contextTransportationMethods.length}
                title="Select a Transportation Method."
            >
                {contextTransportationMethods.map((item, index) => {
                    return <Option index={index} item={item} key={item} />
                })}
            </select>
        </>
    )
}

export default Select
