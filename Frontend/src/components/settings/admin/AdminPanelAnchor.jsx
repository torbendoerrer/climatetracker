const AdminPanelAnchor = ({ href, ref = undefined, value }) => {
    const handleKeyDown = (e, href) => {
        if (e.key === ' ') {
            window.location = href
        }
    }

    return (
        <a
            aria-label={value}
            className="w-full text-normal zinc-100 px-2 py-1 rounded-md
            hover:bg-zinc-300 active:bg-zinc-400 focus-visible:outline-green-600"
            href={href}
            ref={ref}
            title={value}
            onKeyDown={(e) => handleKeyDown(e, href)}
        >
            {value}
        </a>
    )
}

export default AdminPanelAnchor
