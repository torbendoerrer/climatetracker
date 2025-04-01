import { useContext, useMemo, useState } from 'react'
import ActivityChooseDate from './ActivityChooseDate'
import ActivityNext from './ActivityNext'
import ActivitySwitch from './ActivitySwitch'
import ActivityToday from './ActivityToday'
import FormHeader from '../form/FormHeader'
import { ContextActivityHistory } from '../../App'
import { calculateFilteredTime } from '../../utils/calculateFilteredTime'
import { calculateFilteredTimeBorder } from '../../utils/calculateFilteredTimeBorder'
import { calculateFootprint } from '../../utils/calculateFootprint'
import { formatFootprint } from '../../utils/formatFootprint'
import { getFullDate } from '../../utils/getFullDate'
import { useErrorDate } from './../../hooks/useError'

const ActivityOverview = () => {
    // eslint-disable-next-line
    const [contextActivityHistory, _setContextActivityHistory] = useContext(
        ContextActivityHistory
    )
    // eslint-disable-next-line
    const [currentTime, _setCurrentTime] = useState(new Date())
    const [dateManually, setDateManually] = useState('')
    const [filteredCategory, setFilteredCategory] = useState('Day')
    const [filteredTime, setFilteredTime] = useState(() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        return now.getTime()
    })
    const [filteredTimeBorder, setFilteredTimeBorder] = useState(() => {
        const now = new Date()
        now.setHours(23, 59, 59, 999)
        return now.getTime()
    })

    const datePattern = useMemo(() => /^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/, [])

    const [errorDate, setErrorDate] = useState('')

    useErrorDate({ dateManually, datePattern, setErrorDate })

    const setButtonStyle = (filter) => {
        return filteredCategory === filter
            ? 'bg-green-500'
            : 'bg-zinc-300 hover:bg-zinc-100 active:bg-green-200 focus-visible:z-10'
    }

    const handleClick = (filter) => {
        setFilteredCategory(filter)
        setFilteredTime(calculateFilteredTime({ filter, filteredTime }))
        setFilteredTimeBorder(
            calculateFilteredTimeBorder({
                filter,
                filteredTime,
                filteredTimeBorder,
            })
        )
    }

    const handleClickManually = (date) => {
        switch (filteredCategory) {
            case 'Day':
                setFilteredTime(new Date(date).setHours(0, 0, 0, 0))
                setFilteredTimeBorder(new Date(date).setHours(23, 59, 59, 999))
                break
            case 'Month':
                setFilteredTime(
                    new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
                )
                setFilteredTimeBorder(
                    new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        0,
                        0,
                        0,
                        0,
                        0
                    )
                )
                break
            case 'Year':
                setFilteredTime(new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0))
                setFilteredTimeBorder(
                    new Date(date.getFullYear(), 11, 31, 0, 0, 0, 0)
                )
                break
            default:
                break
        }
    }

    const handleDateInput = (e) => {
        setDateManually(e.target.value)
    }

    const handleNext = () => {
        const date = new Date(filteredTime)
        const next = new Date(filteredTimeBorder)

        switch (filteredCategory) {
            case 'Day':
                date.setDate(date.getDate() + 1)
                next.setDate(next.getDate() + 1)
                break
            case 'Month':
                date.setMonth(date.getMonth() + 1, 1)
                next.setMonth(next.getMonth() + 2, 1)
                next.setDate(next.getDate() - 1)
                break
            case 'Year':
                date.setFullYear(date.getFullYear() + 1)
                next.setFullYear(next.getFullYear() + 1)
                break
            default:
                break
        }

        setFilteredTime(date.getTime())
        setFilteredTimeBorder(next.getTime())
    }

    const handlePrevious = () => {
        const date = new Date(filteredTime)
        const border = new Date(filteredTimeBorder)

        switch (filteredCategory) {
            case 'Day':
                date.setDate(date.getDate() - 1)
                border.setDate(border.getDate() - 1)
                break
            case 'Month':
                date.setMonth(date.getMonth() - 1, 1)
                border.setMonth(border.getMonth(), 1)
                border.setDate(border.getDate() - 1)
                break
            case 'Year':
                date.setFullYear(date.getFullYear() - 1)
                border.setFullYear(border.getFullYear() - 1)
                break
            default:
                break
        }

        setFilteredTime(date.getTime())
        setFilteredTimeBorder(border.getTime())
    }

    return (
        <div className="main-content overflow-hidden">
            <FormHeader header="Activity Overview" />
            <div className="flex flex-col gap-4 text-normal w-full items-center justify-center p-2">
                <ActivitySwitch
                    filteredCategory={filteredCategory}
                    handleClick={handleClick}
                    setButtonStyle={setButtonStyle}
                />
                <ActivityToday
                    currentTime={currentTime}
                    filteredCategory={filteredCategory}
                    filteredTime={filteredTime}
                    handleClickToday={() => handleClickManually(currentTime)}
                />
                <ActivityChooseDate
                    dateManually={dateManually}
                    datePattern={datePattern}
                    errorDate={errorDate}
                    handleClickChoose={() =>
                        handleClickManually(new Date(dateManually))
                    }
                    handleDateInput={handleDateInput}
                />
                <div className="flex flex-col flex-wrap gap-4 w-full slate-100 text-normal  rounded-md p-2">
                    <div className="flex w-full gap-2 justify-between items-center">
                        <ActivityNext
                            filteredCategory={filteredCategory}
                            handleNext={handlePrevious}
                            value="Previous"
                        />
                        <strong>
                            {getFullDate({
                                date: new Date(filteredTime),
                                filteredCategory,
                            })}
                        </strong>
                        <ActivityNext
                            filteredCategory={filteredCategory}
                            handleNext={handleNext}
                            value="Next"
                        />
                    </div>
                    <div>
                        {contextActivityHistory.length ? (
                            contextActivityHistory.filter(
                                (item) =>
                                    filteredTime <= Date.parse(item.date) &&
                                    filteredTimeBorder >= Date.parse(item.date)
                            ).length ? (
                                <div className="flex flex-col gap-1 justify-between font-semibold">
                                    <span>
                                        Total CO
                                        <sub>2</sub> Footprint:
                                    </span>
                                    <span>
                                        {formatFootprint(
                                            contextActivityHistory
                                                .filter(
                                                    (item) =>
                                                        filteredTime <=
                                                            Date.parse(
                                                                item.date
                                                            ) &&
                                                        filteredTimeBorder >=
                                                            Date.parse(
                                                                item.date
                                                            )
                                                )
                                                .reduce(
                                                    (total, item) =>
                                                        parseFloat(total) +
                                                        parseFloat(
                                                            calculateFootprint(
                                                                item
                                                            )
                                                        ),
                                                    0
                                                )
                                        )}
                                        <sub>2</sub>/person
                                    </span>
                                </div>
                            ) : (
                                <div className="text-center text-normal italic text-red-700 pb-2">
                                    For this filter there is no data available.
                                </div>
                            )
                        ) : (
                            <div className="text-center text-normal italic text-red-700 pb-2">
                                You have not added any Activites yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityOverview
