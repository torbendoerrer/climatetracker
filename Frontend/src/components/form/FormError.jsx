const FormError = ({ error }) => {
    return (
        <>
            {error ? (
                <div className="text-red-700 text-small text-pretty">
                    {error}
                </div>
            ) : undefined}
        </>
    )
}

export default FormError
