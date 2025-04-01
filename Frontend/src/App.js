import { createContext, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import ActivityHistory from './components/transportation/ActivityHistory'
import ActivityOverview from './components/transportation/ActivityOverview'
import AddActivity from './components/transportation/AddActivity'
import AdminPanel from './components/settings/admin/AdminPanel'
import EditTransportation from './components/settings/admin/EditTransportation'
import EditUsersTable from './components/settings/admin/EditUsersTable'
import Footer from './components/footer/Footer'
import Form from './components/form/Form'
import GoToTop from './components/ui/GoToTop'
import Navigation from './components/navigation/Navigation'
import NewTransportation from './components/settings/admin/NewTransportation'
import NotFound from './components/404/NotFound'
import UserDelete from './components/settings/user/UserDelete'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { useFocusTrap } from './hooks/useFocusTrap'
import { useScreenWidth } from './hooks/useScreenWidth'
import { useWindowScrollY } from './hooks/useWindowScrollY'

export const ContextActivityDateRef = createContext(undefined)
export const ContextActivityHistory = createContext(undefined)
export const ContextIsLoggedIn = createContext(undefined)
export const ContextIsSettingsOpen = createContext(undefined)
export const ContextLoggedInUser = createContext(undefined)
export const ContextMethodToSelect = createContext(undefined)
export const ContextScreenWidth = createContext(undefined)
export const ContextTransportationMethods = createContext(undefined)
export const ContextUsers = createContext(undefined)

const App = () => {
    const activityDateRef = useRef(null)
    const [activityHistory, setActivityHistory] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(sessionStorage.getItem('climate-tracker'))?.isloggedin ||
            false
    )
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState({
        user:
            JSON.parse(sessionStorage.getItem('climate-tracker'))?.username ||
            '',
        role: JSON.parse(sessionStorage.getItem('climate-tracker'))?.role || '',
        token:
            JSON.parse(sessionStorage.getItem('climate-tracker'))?.token || '',
    })
    const [methodToSelect, setMethodToSelect] = useState('')
    const screenWidth = useScreenWidth()
    const [transportationMethods, setTransportationMethods] = useState([])
    const [users, setUsers] = useState([])

    useFocusTrap()
    useDocumentTitle()
    useWindowScrollY()

    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-green-200 to-green-300">
            <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <ContextIsSettingsOpen.Provider
                    value={[isSettingsOpen, setIsSettingsOpen]}
                >
                    <ContextLoggedInUser.Provider
                        value={[loggedInUser, setLoggedInUser]}
                    >
                        <ContextScreenWidth.Provider value={screenWidth}>
                            <Navigation />
                            <main className="flex flex-col items-center w-full my-4 sm:my-8 px-2">
                                <ContextTransportationMethods.Provider
                                    value={[
                                        transportationMethods,
                                        setTransportationMethods,
                                    ]}
                                >
                                    <BrowserRouter>
                                        <ContextMethodToSelect.Provider
                                            value={[
                                                methodToSelect,
                                                setMethodToSelect,
                                            ]}
                                        >
                                            <Routes>
                                                <Route
                                                    path="/"
                                                    element={
                                                        isLoggedIn ? (
                                                            <ContextActivityHistory.Provider
                                                                value={[
                                                                    activityHistory,
                                                                    setActivityHistory,
                                                                ]}
                                                            >
                                                                <ContextActivityDateRef.Provider
                                                                    value={
                                                                        activityDateRef
                                                                    }
                                                                >
                                                                    <AddActivity />
                                                                    <ActivityHistory />
                                                                    <ActivityOverview />
                                                                    <GoToTop />
                                                                </ContextActivityDateRef.Provider>
                                                            </ContextActivityHistory.Provider>
                                                        ) : (
                                                            <Form />
                                                        )
                                                    }
                                                />
                                                {loggedInUser.role ===
                                                    'Admin' && (
                                                    <Route path="/admin">
                                                        <Route
                                                            index
                                                            element={
                                                                <AdminPanel />
                                                            }
                                                        />
                                                        <Route
                                                            path="edit-transportation"
                                                            element={
                                                                <EditTransportation />
                                                            }
                                                        />
                                                        <Route
                                                            path="new-transportation"
                                                            element={
                                                                <NewTransportation />
                                                            }
                                                        />
                                                        <Route
                                                            path="users"
                                                            element={
                                                                <ContextUsers.Provider
                                                                    value={[
                                                                        users,
                                                                        setUsers,
                                                                    ]}
                                                                >
                                                                    <EditUsersTable />
                                                                </ContextUsers.Provider>
                                                            }
                                                        />
                                                    </Route>
                                                )}
                                                {loggedInUser.role ===
                                                    'User' && (
                                                    <Route
                                                        path="/delete"
                                                        element={<UserDelete />}
                                                    />
                                                )}
                                                <Route
                                                    path="*"
                                                    element={<NotFound />}
                                                />
                                            </Routes>
                                        </ContextMethodToSelect.Provider>
                                    </BrowserRouter>
                                </ContextTransportationMethods.Provider>
                            </main>
                            <Footer />
                        </ContextScreenWidth.Provider>
                    </ContextLoggedInUser.Provider>
                </ContextIsSettingsOpen.Provider>
            </ContextIsLoggedIn.Provider>
        </div>
    )
}

export default App
