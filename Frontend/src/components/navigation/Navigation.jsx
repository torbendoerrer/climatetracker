import { useContext, useRef, useState } from 'react'
import Breadcrumbs from './../breadcrumbs/Breadcrumbs'
import NavigationLogo from './NavigationLogo'
import SettingsDialog from '../settings/SettingsDialog'
import UserIcon from '../ui/UserIcon'
import { ContextIsLoggedIn } from '../../App'
import { ContextIsSettingsOpen } from '../../App'
import { ContextLoggedInUser } from '../../App'
import { ContextScreenWidth } from '../../App'
import { useCloseSettingsDialog } from '../../hooks/useCloseSettingsDialog'
import { useFocusTrapSettings } from '../../hooks/useFocusTrapSettings'
import { useNavigationOpacity } from '../../hooks/useNavigationOpacity'

const Navigation = () => {
    // eslint-disable-next-line
    const [contextIsLoggedIn, _setContextIsLoggedIn] =
        useContext(ContextIsLoggedIn)
    const [contextIsSettingsOpen, setContextIsSettingsOpen] = useContext(
        ContextIsSettingsOpen
    )
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)
    const contextScreenWidth = useContext(ContextScreenWidth)

    const [navOpacity, setNavOpacity] = useState('opacity-100')
    const [shadowOpacity, setShadowOpacity] = useState('shadow-green-700/50')

    const settingsDialogRef = useRef(null)
    const timerRef = useRef(null)
    const userIconRef = useRef(null)

    useNavigationOpacity({ setNavOpacity, setShadowOpacity, timerRef })

    useFocusTrapSettings({ contextIsSettingsOpen })

    useCloseSettingsDialog({
        contextIsSettingsOpen,
        setContextIsSettingsOpen,
        settingsDialogRef,
        userIconRef,
    })

    const toggleSettingsOpen = () => {
        setContextIsSettingsOpen((prev) => !prev)
    }

    return (
        <>
            <nav
                className={`sticky top-0 z-50 h-18 flex items-center bg-green-400 w-full transition-all duration-500 ease-in-out shadow-md ${shadowOpacity} px-2 sm:px-4 py-1 md:py-2 ${navOpacity}`}
            >
                <div className="flex relative max-w-7xl w-full justify-between items-center m-auto">
                    <NavigationLogo />
                    {contextIsLoggedIn && (
                        <UserIcon
                            handleClick={toggleSettingsOpen}
                            ref={userIconRef}
                            title={`${
                                contextIsSettingsOpen ? 'Close' : 'Open'
                            } Settings.`}
                        />
                    )}
                    {contextIsSettingsOpen &&
                        contextIsLoggedIn &&
                        contextScreenWidth !== 'MOBILE' && (
                            <SettingsDialog
                                ref={settingsDialogRef}
                                role={contextLoggedInUser.role}
                                user={contextLoggedInUser.user}
                            />
                        )}
                </div>
            </nav>
            <Breadcrumbs />
            {contextIsSettingsOpen &&
                contextIsLoggedIn &&
                contextScreenWidth === 'MOBILE' && (
                    <SettingsDialog
                        ref={settingsDialogRef}
                        role={contextLoggedInUser.role}
                        user={contextLoggedInUser.user}
                    />
                )}
        </>
    )
}

export default Navigation
