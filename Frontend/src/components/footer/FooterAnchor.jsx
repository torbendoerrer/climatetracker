const FooterAnchor = ({ author, href, technology }) => {
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            window.open(href, '_blank')
        }
    }

    return (
        <a
            aria-label={`Open the GitLab Repository ${technology} by ${author} in a new tab.`}
            className="underline decoration-green-700 text-nowrap text-ellipsis overflow-hidden rounded-md px-2 py-1 mx-1 mt-1
            hover:decoration-green-800 hover:bg-green-350
            active:decoration-green-950 active:opacity-70"
            href={href}
            onKeyDown={handleKeyDown}
            rel="noopener noreferrer external"
            target="_blank"
            title={`Open the GitLab Repository ${technology} by ${author} in a new tab.`}
        >
            GitLab Repository {technology}
        </a>
    )
}

export default FooterAnchor
