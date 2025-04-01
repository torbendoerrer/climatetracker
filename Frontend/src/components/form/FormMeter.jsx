import { useContext } from 'react'
import { ContextScreenWidth } from './../../App'

const FormMeter = ({ strength }) => {
    const contextScreenWidth = useContext(ContextScreenWidth)

    const basicStyle =
        'outline outline-2 oputline-zinc-700 h-5 w-full rounded-md'

    let veryWeakStyle = 'bg-zinc-400'
    let weakStyle = 'bg-zinc-400'
    let mediumStyle = 'bg-zinc-400'
    let strongStyle = 'bg-zinc-400'
    let veryStrongStyle = 'bg-zinc-400'

    switch (strength) {
        case 1:
            veryWeakStyle = 'bg-red-600'
            weakStyle = 'bg-zinc-400'
            mediumStyle = 'bg-zinc-400'
            strongStyle = 'bg-zinc-400'
            veryStrongStyle = 'bg-zinc-400'
            break
        case 2:
            veryWeakStyle = 'bg-orange-600'
            weakStyle = 'bg-orange-600'
            mediumStyle = 'bg-zinc-400'
            strongStyle = 'bg-zinc-400'
            veryStrongStyle = 'bg-zinc-400'
            break
        case 3:
            veryWeakStyle = 'bg-yellow-400'
            weakStyle = 'bg-yellow-400'
            mediumStyle = 'bg-yellow-400'
            strongStyle = 'bg-zinc-400'
            veryStrongStyle = 'bg-zinc-400'
            break
        case 4:
            veryWeakStyle = 'bg-lime-400'
            weakStyle = 'bg-lime-400'
            mediumStyle = 'bg-lime-400'
            strongStyle = 'bg-lime-400'
            veryStrongStyle = 'bg-zinc-400'
            break
        case 5:
            veryWeakStyle = 'bg-lime-550'
            weakStyle = 'bg-lime-550'
            mediumStyle = 'bg-lime-550'
            strongStyle = 'bg-lime-550'
            veryStrongStyle = 'bg-lime-550'
            break
        default:
            veryWeakStyle = 'bg-zinc-400'
            weakStyle = 'bg-zinc-400'
            mediumStyle = 'bg-zinc-400'
            strongStyle = 'bg-zinc-400'
            veryStrongStyle = 'bg-zinc-400'
    }

    return (
        <>
            {contextScreenWidth === 'MOBILE' ? (
                <div className="mt-2 mb-4">
                    <div className={`${basicStyle} ${veryWeakStyle}`}></div>
                </div>
            ) : (
                <div className="flex justify-evenly gap-4 mt-2 mb-4">
                    <div className={`${basicStyle} ${veryWeakStyle}`}></div>
                    <div className={`${basicStyle} ${weakStyle}`}></div>
                    <div className={`${basicStyle} ${mediumStyle}`}></div>
                    <div className={`${basicStyle} ${strongStyle}`}></div>
                    <div className={`${basicStyle} ${veryStrongStyle}`}></div>
                </div>
            )}
        </>
    )
}

export default FormMeter
