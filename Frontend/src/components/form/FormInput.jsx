const FormInput = ({
    autoComplete,
    error,
    id,
    label,
    maxLength,
    minLength,
    onInput,
    onPaste = undefined,
    onKeyDown = undefined,
    placeholder,
    ref = undefined,
    required = true,
    step = undefined,
    title,
    type,
    value,
}) => {
    const marginBottom = error ? 'mb-1' : 'mb-5 md:mb-6'

    return (
        <>
            <label htmlFor={id} className="text-large py-2 md:py-1">
                {label} {required && <span className="text-red-700">*</span>}
            </label>
            <input
                id={id}
                className={`zinc-50 text-normal w-full ${marginBottom} rounded px-2 py-1
                enabled:hover:bg-zinc-200`}
                aria-label={title}
                aria-required={required}
                autoComplete={autoComplete}
                max={type === 'number' ? maxLength : undefined}
                maxLength={type !== 'number' ? maxLength : undefined}
                min={type === 'number' ? minLength : undefined}
                minLength={type !== 'number' ? minLength : undefined}
                name={label.replace(/\s/g, '').toLowerCase()}
                onInput={onInput}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                ref={ref}
                required={required}
                step={step}
                title={title}
                type={type}
                value={value}
            />
        </>
    )
}

export default FormInput
