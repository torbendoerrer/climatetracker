const ActivityNext = ({ filteredCategory, handleNext, value }) => {
    return (
        <button
            aria-label={`Go to next ${filteredCategory}.`}
            className="w-18 md:w-20 outline outline-2 outline-zinc-500/50 text-ellipsis overflow-hidden rounded-lg px-2 py-1
        hover:bg-slate-200 active:bg-slate-300"
            onClick={handleNext}
            title={`Go to ${value.toLowerCase()} ${filteredCategory.toLowerCase()}.`}
        >
            {value}
        </button>
    )
}

export default ActivityNext
