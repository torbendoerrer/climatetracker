const EditUsersTableFilter = ({ isFiltered, ref, toggleFilter }) => {
    return (
        <button
            aria-label={
                isFiltered
                    ? 'Show all Users. Currently, only non-Admins are displayed.'
                    : 'Only show non-Admins. Currently, all Users are displayed.'
            }
            className="text-normal slate-100 w-full mt-2 px-2 py-1 rounded-md
            hover:bg-slate-200 active:bg-slate-300
            focus-visible:outline-green-600"
            onClick={toggleFilter}
            ref={ref}
            title={
                isFiltered
                    ? 'Show all Users. Currently, only non-Admins are displayed.'
                    : 'Only show non-Admins. Currently, all Users are displayed.'
            }
        >
            {isFiltered ? 'Show all Users' : 'Only show non-Admins'}
        </button>
    )
}

export default EditUsersTableFilter
