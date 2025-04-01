const UserIcon = ({
    handleClick = undefined,
    ref = undefined,
    title = undefined,
}) => {
    const containerStyle =
        'flex flex-col items-center justify-center outline outline-2 outline-green-600 bg-green-300 rounded-full overflow-hidden'

    const avatarStyle = 'outline outline-1 outline-slate-300 bg-slate-50'

    return (
        <>
            {handleClick ? (
                <button
                    aria-label={title}
                    className={`settings ${containerStyle} w-11 h-11
                    hover:bg-green-350
                    active:bg-green-400`}
                    onClick={handleClick}
                    ref={ref}
                    title={title}
                >
                    <div
                        className={`${avatarStyle} w-4 h-4 rounded-full mt-1 z-20`}
                    ></div>
                    <div
                        className={`${avatarStyle} w-7 h-6 rounded-xl z-10`}
                    ></div>
                </button>
            ) : (
                <div className={`${containerStyle} min-w-9 w-9 h-9`}>
                    <div
                        className={`${avatarStyle} w-3 h-3 rounded-full mt-1 z-20`}
                    ></div>
                    <div
                        className={`${avatarStyle} w-6 h-5 rounded-xl z-10`}
                    ></div>
                </div>
            )}
        </>
    )
}

export default UserIcon
