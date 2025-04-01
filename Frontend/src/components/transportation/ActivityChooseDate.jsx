import FormError from '../form/FormError'
import FormInput from '../form/FormInput'

const ActivityChooseDate = ({
    dateManually,
    datePattern,
    errorDate,
    handleClickChoose,
    handleDateInput,
}) => {
    return (
        <div className="w-full pt-2">
            <FormInput
                autoComplete="off"
                error={errorDate}
                id="timeActivityOverview"
                label="Select Date Manually"
                maxLength={undefined}
                minLength={undefined}
                onInput={handleDateInput}
                placeholder={undefined}
                required={false}
                title="Optionally, select a date manually."
                type="date"
                value={dateManually}
            />
            <FormError error={errorDate} />
            <div className="flex justify-center w-full">
                <button
                    aria-label={`${
                        !datePattern.test(dateManually)
                            ? 'Disabled, select a valid date beforehand.'
                            : 'Choose the manually selected date.'
                    }`}
                    className="w-48 sm:w-60 zinc-100 text-normal  px-2 py-1 mt-1 mb-4 rounded-lg
                    enabled:hover:bg-zinc-300 enabled:active:bg-zinc-400
                    disabled:bg-zinc-300 disabled:text-zinc-600
                    focus-visible:outline-green-600"
                    disabled={!datePattern.test(dateManually)}
                    title={`${
                        !datePattern.test(dateManually)
                            ? 'Disabled, select a valid date beforehand.'
                            : 'Choose the manually selected date.'
                    }`}
                    onClick={handleClickChoose}
                >
                    Choose Date
                </button>
            </div>
        </div>
    )
}

export default ActivityChooseDate
