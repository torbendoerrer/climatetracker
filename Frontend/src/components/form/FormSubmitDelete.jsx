const FormSubmitDelete = ({ disabled, handleDelete, value }) => {
    return (
        <input
            aria-disabled={disabled}
            aria-label={value}
            className="w-24 sm:w-32 self-center text-large zinc-100 px-2 py-1 mt-4 rounded-full
            hover:bg-zinc-300 active:bg-zinc-400"
            disabled={disabled}
            onClick={handleDelete}
            title={value}
            type="button"
            value={value}
        />
    )
}

export default FormSubmitDelete
