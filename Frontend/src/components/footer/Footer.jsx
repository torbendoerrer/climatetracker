import FooterAnchor from './FooterAnchor'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <footer className="flex flex-col w-full max-w-5xl text-pretty text-center text-small pb-2 pt-4 px-4 mb-1 mt-auto">
            <span>
                Copyright &#169; {year} Michael Münzenhofer and Torben Dörrer.
                All Rights Reserved.
            </span>
            <div className="flex flex-wrap gap-x-2 justify-center">
                <FooterAnchor
                    author="Michael Münzenhofer"
                    href="https://mygit.th-deg.de/mm29126/climate-tracker"
                    technology="Frontend"
                />
                <FooterAnchor
                    author="Torben Dörrer"
                    href="https://mygit.th-deg.de/td02197/climate-tracker-backend"
                    technology="Backend"
                />
            </div>
        </footer>
    )
}

export default Footer
