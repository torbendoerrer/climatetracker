import { useContext } from 'react'
import { PasswordVisibilityContext } from './Form'

const FormInput = ({
    autoComplete,
    disabled = false,
    error,
    hidden,
    id,
    label,
    maxLength,
    minLength,
    onInput,
    onKeyDown = undefined,
    title,
    value,
}) => {
    const [isPasswordHidden, setIsPasswordHidden] = useContext(
        PasswordVisibilityContext
    )
    const marginBottom = error ? 'mb-1' : 'mb-5 md:mb-6'

    const handleTogglePasswordVisibility = () => {
        setIsPasswordHidden((prev) => !prev)
    }

    return (
        <>
            <div className="flex gap-x-4 justify-between py-1 md:py-0">
                <label htmlFor={id} className="text-large py-1">
                    {label} <span className="text-red-700">*</span>
                </label>
                <span className="flex gap-2 items-center">
                    <label htmlFor={`show-${id}`} className="text-normal">
                        {hidden ? 'show' : 'hide'}
                    </label>
                    <input
                        id={`show-${id}`}
                        aria-checked={!isPasswordHidden}
                        aria-disabled={disabled}
                        aria-label={`${disabled ? 'Currently disabled. ' : ''}${
                            hidden ? 'Show' : 'Hide'
                        } password.`}
                        checked={!hidden}
                        disabled={disabled}
                        onChange={handleTogglePasswordVisibility}
                        title={`${disabled ? 'Currently disabled. ' : ''}${
                            hidden ? 'Show' : 'Hide'
                        } password.`}
                        type="checkbox"
                    />
                </span>
            </div>
            <input
                id={id}
                className={`zinc-50 text-normal w-full ${marginBottom} rounded px-2 py-1
                enabled:hover:bg-zinc-200`}
                aria-disabled={disabled}
                aria-required="true"
                aria-label={title}
                autoComplete={autoComplete}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                name={label.replace(/\s/g, '').toLowerCase()}
                onInput={onInput}
                onKeyDown={onKeyDown}
                placeholder="password"
                required
                title={title}
                type={isPasswordHidden ? 'password' : 'text'}
                value={value}
            />
        </>
    )
}

export default FormInput
