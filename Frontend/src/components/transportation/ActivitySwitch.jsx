const ActivitySwitch = ({ filteredCategory, setButtonStyle, handleClick }) => {
    return (
        <div className="flex w-full max-w-48 sm:max-w-60 justify-center outline-zinc-500 focus-within:outline-zinc-500/50 outline outline-2 text-normal overflow-hidden rounded-lg">
            <button
                aria-label={`${
                    filteredCategory === 'Day'
                        ? 'Disabled, already filtering by Day.'
                        : 'Filter by Day.'
                }`}
                className={`${setButtonStyle(
                    'Day'
                )} w-16 sm:w-20 rounded-l-lg transition duration-500 ease-in-out pl-4 pr-2 py-1`}
                disabled={filteredCategory === 'Day'}
                onClick={() => handleClick('Day')}
                title={`${
                    filteredCategory === 'Day'
                        ? 'Currently filtiering by Day.'
                        : 'Filter by Day.'
                }`}
            >
                Day
            </button>
            <button
                aria-label={`${
                    filteredCategory === 'Month'
                        ? 'Disabled, already filtering by Month.'
                        : 'Filter by Month.'
                }`}
                className={`${setButtonStyle(
                    'Month'
                )} w-16 sm:w-20 transition duration-500 ease-in-out pl-4 pr-2 py-1`}
                disabled={filteredCategory === 'Month'}
                onClick={() => handleClick('Month')}
                title={`${
                    filteredCategory === 'Month'
                        ? 'Currently filtiering by Month.'
                        : 'Filter by Month.'
                }`}
            >
                Month
            </button>
            <button
                aria-label={`${
                    filteredCategory === 'Year'
                        ? 'Disabled, already filtering by Year.'
                        : 'Filter by Year.'
                }`}
                className={`${setButtonStyle(
                    'Year'
                )} w-16 sm:w-20 rounded-r-lg transition duration-500 ease-in-out pl-2 pr-4 py-1`}
                disabled={filteredCategory === 'Year'}
                onClick={() => handleClick('Year')}
                title={`${
                    filteredCategory === 'Year'
                        ? 'Currently filtiering by Year.'
                        : 'Filter by Year.'
                }`}
            >
                Year
            </button>
        </div>
    )
}

export default ActivitySwitch
