import { useRef } from 'react'
import AdminPanelAnchor from './AdminPanelAnchor'
import FormHeader from '../../form/FormHeader'
import { useAutoFocus } from './../../../hooks/useAutoFocus'

const AdminPanel = () => {
    const anchorRef = useRef(null)

    useAutoFocus(anchorRef)

    return (
        <div className="main-content">
            <FormHeader header="Admin Panel" />
            <div className="flex flex-col gap-4 text-center mt-4">
                <AdminPanelAnchor
                    href="admin/users"
                    ref={anchorRef}
                    value="Edit Users"
                />
                <AdminPanelAnchor
                    href="admin/new-transportation"
                    value="New Transportation Method"
                />
                <AdminPanelAnchor
                    href="admin/edit-transportation"
                    value="Edit Transportation Method"
                />
            </div>
        </div>
    )
}

export default AdminPanel
