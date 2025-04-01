import logo from './../../assets/images/logo.png'

const NavigationLogo = () => {
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            window.location = '/'
        }
    }

    return (
        <a
            aria-label="Back to the Homepage."
            className="flex gap-4 items-center rounded-md px-2 py-1
            hover:bg-green-350
            active:bg-green-300"
            href="/"
            onKeyDown={handleKeyDown}
            title="Back to the Homepage."
        >
            <img
                className="rounded-full"
                alt="Back to the Homepage."
                loading="lazy"
                src={logo}
                width={44}
            />
            <h1 className="text-large hidden sm:block">Climate Tracker</h1>
        </a>
    )
}

export default NavigationLogo
