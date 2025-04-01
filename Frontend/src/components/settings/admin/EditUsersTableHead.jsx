const EditUsersTableHead = () => {
    const headStyle = 'pb-2 px-1'

    return (
        <thead>
            <tr className="text-normal">
                <th className={headStyle} scope="col">
                    User Name
                </th>
                <th className={headStyle} scope="col">
                    Role
                </th>
                <th className={headStyle} scope="col">
                    Elevate to Admin?
                </th>
            </tr>
        </thead>
    )
}

export default EditUsersTableHead
