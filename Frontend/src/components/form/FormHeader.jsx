const FormHeader = ({ header, subHeader }) => {
    const subHeaderStyle = 'text-center text-large px-1'
    const subHeaderElement = (() => {
        switch (subHeader) {
            case 'delete':
                return (
                    <h3 className={subHeaderStyle}>
                        Your account and all your data will be permanently
                        deleted.
                    </h3>
                )
            case 'required':
                return (
                    <h3 className={subHeaderStyle}>
                        All fields marked with{' '}
                        <span className="text-red-700">*</span> are required.
                    </h3>
                )
            default:
                return null
        }
    })()

    return (
        <>
            <h2 className="text-center font-semibold text-extra-large">
                {header}
            </h2>
            {subHeaderElement}
        </>
    )
}

export default FormHeader
