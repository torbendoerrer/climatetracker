const FormSubmit = ({ disabled, handleClick, value }) => {
    return (
        <input
            type="button"
            className="w-24 sm:w-32 self-center text-large zinc-100 px-2 py-1 mb-1 mt-4 rounded-full
            enabled:hover:bg-zinc-300 enabled:active:bg-zinc-400"
            aria-disabled={disabled}
            aria-label={`${value}${disabled ? ' disabled.' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            title={`${value}${disabled ? ' disabled.' : ''}`}
            value={value}
        />
    )
}

export default FormSubmit
