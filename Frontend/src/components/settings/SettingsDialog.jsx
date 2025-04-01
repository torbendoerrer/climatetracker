import { useContext, useRef, useState } from 'react'
import SettingsDialogItem from './SettingsDialogItem'
import UserIcon from '../ui/UserIcon'
import {
    ContextIsLoggedIn,
    ContextIsSettingsOpen,
    ContextScreenWidth,
} from '../../App'
import { setItemInStorage } from '../../utils/setItemInStorage'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { useDialogOpacity } from '../../hooks/useDialogOpacity'

const SettingsDialog = ({ ref, role, user }) => {
    // eslint-disable-next-line
    const [_contextIsLoggedIn, setContextIsLoggedIn] =
        useContext(ContextIsLoggedIn)
    // eslint-disable-next-line
    const [_contextIsSettingsOpen, setContextIsSettingsOpen] = useContext(
        ContextIsSettingsOpen
    )
    const contextScreenWidth = useContext(ContextScreenWidth)

    const [dialogOpacity, setDialogOpacity] = useState('opacity-100')

    const settingsRef = useRef(null)
    const timerRef = useRef(null)

    useAutoFocus(settingsRef)
    useDialogOpacity({ setDialogOpacity, timerRef })

    const handleClose = () => {
        setContextIsSettingsOpen(false)
    }

    const handleLogout = () => {
        setContextIsLoggedIn(false)
        setItemInStorage('isfiltered', false)
        setItemInStorage('isloggedin', false)
        setItemInStorage('issigningup', false)
        setItemInStorage('role', '')
        setItemInStorage('token', '')
        window.location = '/'
    }

    return (
        <aside
            className={`flex flex-col slate-100 ${
                contextScreenWidth === 'MOBILE'
                    ? 'w-full max-w-0.8 mt-2'
                    : `absolute top-16 -right-2 max-w-80 min-w-48 ${dialogOpacity}`
            } rounded-md p-2 z-10`}
            ref={ref}
        >
            <div
                className="flex gap-2 items-center pb-2 border border-solid border-t-0 border-x-0 border-b-2 border-green-500"
                title={user}
            >
                <UserIcon />
                {role === 'Admin' ? (
                    <div className="flex flex-col text-ellipsis overflow-hidden">
                        <span className="text-normal text-ellipsis overflow-hidden max-w-64">
                            {user}
                        </span>
                        <span className="text-very-small">{role}</span>
                    </div>
                ) : (
                    <span className="text-normal text-ellipsis overflow-hidden max-w-64">
                        {user}
                    </span>
                )}
            </div>
            <SettingsDialogItem
                href={role === 'Admin' ? '/admin' : '/delete'}
                ref={settingsRef}
                value="Settings"
            />
            <SettingsDialogItem handleClick={handleLogout} value="Logout" />
            {contextScreenWidth === 'MOBILE' && (
                <SettingsDialogItem handleClick={handleClose} value="Close" />
            )}
        </aside>
    )
}

export default SettingsDialog
