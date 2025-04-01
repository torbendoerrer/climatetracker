import { isTodayDisabled } from '../../utils/isTodayDisabled'

const ActivityToday = ({
    currentTime,
    filteredCategory,
    filteredTime,
    handleClickToday,
}) => {
    return (
        <button
            aria-label={`${
                isTodayDisabled({
                    currentTime,
                    filteredCategory,
                    filteredTime,
                })
                    ? `Disabled, you are already watching the ${filteredCategory.toLowerCase()} of today.`
                    : `Choose the ${filteredCategory.toLowerCase()} of today.`
            }`}
            className="max-w-full w-48 sm:w-60 zinc-100 text-normal  px-2 py-1 rounded-lg
            enabled:hover:bg-zinc-300 enabled:active:bg-zinc-400
            disabled:bg-zinc-300 disabled:text-zinc-600
            focus-visible:outline-green-600"
            disabled={isTodayDisabled({
                currentTime,
                filteredCategory,
                filteredTime,
            })}
            onClick={handleClickToday}
            title={`${
                isTodayDisabled({
                    currentTime,
                    filteredCategory,
                    filteredTime,
                })
                    ? `Disabled, you are already watching the ${filteredCategory.toLowerCase()} of today.`
                    : `Choose the ${filteredCategory.toLowerCase()} of today.`
            }`}
        >
            Today
        </button>
    )
}

export default ActivityToday
