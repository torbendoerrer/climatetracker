const EditUsersTableError = ({ apiError = false }) => {
    return (
        <tbody>
            <tr>
                <td className="text-normal italic text-red-700">
                    {apiError
                        ? 'Unable to fetch the users.'
                        : 'Currently, there are no users available.'}
                </td>
            </tr>
        </tbody>
    )
}

export default EditUsersTableError
