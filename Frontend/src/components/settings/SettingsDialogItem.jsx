const SettingsDialogItem = ({
    handleClick = undefined,
    href = undefined,
    ref = undefined,
    value,
}) => {
    const itemStyle =
        'settings text-left text-normal mt-2 px-2 py-1 rounded-md hover:bg-slate-200 active:bg-slate-300'

    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            window.location = href
        }
    }

    return (
        <>
            {handleClick ? (
                <button
                    aria-label={value}
                    className={itemStyle}
                    onClick={handleClick}
                    title={value}
                >
                    {value}
                </button>
            ) : (
                <a
                    aria-label={value}
                    className={itemStyle}
                    href={href}
                    onKeyDown={handleKeyDown}
                    ref={ref}
                    title={value}
                >
                    {value}
                </a>
            )}
        </>
    )
}

export default SettingsDialogItem
