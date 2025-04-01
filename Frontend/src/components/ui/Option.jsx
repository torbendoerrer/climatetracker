import { useContext } from 'react'
import { ContextMethodToSelect } from '../../App'

const Option = ({ index, item }) => {
    // eslint-disable-next-line
    const [contextMethodToSelect, _setContextMethodToSelect] = useContext(
        ContextMethodToSelect
    )

    return (
        <option
            aria-label={item}
            className={`text-ellipsis overflow-hidden px-2 py-0.5 rounded-sm
            ${
                item === contextMethodToSelect
                    ? 'text-zinc-950 bg-green-500'
                    : index % 2 === 0
                    ? 'bg-zinc-50'
                    : 'bg-zinc-200'
            }
            hover:bg-zinc-400`}
            title={item}
            value={item}
        >
            {item}
        </option>
    )
}

export default Option
