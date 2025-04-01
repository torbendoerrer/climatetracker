const FormSwitch = ({ isSigningUp, handleClick }) => {
    const loginStyle = isSigningUp
        ? 'bg-zinc-300 hover:bg-zinc-100 active:bg-green-200'
        : 'bg-green-500'

    const signupStyle = isSigningUp
        ? 'bg-green-500'
        : 'bg-zinc-300 hover:bg-zinc-100 active:bg-green-200'

    return (
        <div className="flex justify-center text-normal py-2">
            <button
                aria-label={`Switch to ${
                    isSigningUp ? 'Login' : 'Signup'
                }. Currently, ${isSigningUp ? 'Signup' : 'Login'} is selected.`}
                className="flex outline-zinc-500 outline outline-2 rounded-lg
                focus-visible:outline-offset-1"
                onClick={handleClick}
                title={`Switch to ${
                    isSigningUp ? 'Login' : 'Signup'
                }. Currently, ${isSigningUp ? 'Signup' : 'Login'} is selected.`}
            >
                <div
                    className={`${loginStyle} w-16 md:w-20 rounded-l-lg transition duration-500 ease-in-out pl-4 pr-2 py-1`}
                >
                    Login
                </div>
                <div
                    className={`${signupStyle} w-16 md:w-20 rounded-r-lg transition duration-500 ease-in-out pl-2 pr-4 py-1`}
                >
                    Signup
                </div>
            </button>
        </div>
    )
}

export default FormSwitch
