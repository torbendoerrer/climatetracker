import { useContext, useEffect } from 'react'
import FormHeader from '../form/FormHeader'
import { ContextActivityHistory, ContextLoggedInUser } from '../../App'
import { calculateFootprint } from './../../utils/calculateFootprint'
import { formatFootprint } from '../../utils/formatFootprint'
import { getFormattedDate } from './../../utils/getFormattedDate'

const ActivityHistory = () => {
    const [contextActivityHistory, setContextActivityHistory] = useContext(
        ContextActivityHistory
    )
    // eslint-disable-next-line
    const [contextLoggedInUser, _setContextLoggedInUser] =
        useContext(ContextLoggedInUser)

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(
                    `/activity?username=${encodeURIComponent(
                        contextLoggedInUser.user
                    )}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${btoa(
                                `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                            )}`,
                        },
                    }
                )

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Error:', errorData)
                    return
                }

                const data = await response.json()
                setContextActivityHistory(
                    data.sort((a, b) => new Date(a.date) - new Date(b.date))
                )
            } catch (error) {
                console.error(error)
            }
        }
        fetchActivities()
    }, [
        contextLoggedInUser.token,
        contextLoggedInUser.user,
        setContextActivityHistory,
    ])

    const handleDelete = async (dateTime) => {
        try {
            const response = await fetch('/activity', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${contextLoggedInUser.user}:${contextLoggedInUser.token}`
                    )}`,
                },
                body: JSON.stringify({ date: dateTime }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error:', errorData)
                return
            }

            setContextActivityHistory(
                contextActivityHistory.filter((item) => item.date !== dateTime)
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="main-content my-8 sm:my-16">
            <FormHeader header="Activity History" />
            <form
                autoComplete="on"
                aria-label="Delete Activity?"
                name="activity-delete"
                method="post"
                target="_self"
                title="Delete Activity?"
            >
                {contextActivityHistory.length ? (
                    contextActivityHistory.map((item) => {
                        return (
                            <div
                                className="flex flex-col gap-2 text-normal zinc-100 overflow-hidden p-2 mt-4 rounded-md"
                                key={item.id}
                            >
                                <div className="font-semibold">
                                    {getFormattedDate(item.date)}
                                </div>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-between">
                                    <div className="text-ellipsis overflow-hidden">
                                        {item.transportationMethod.name}
                                    </div>
                                    <div className="text-ellipsis overflow-hidden">
                                        {item.distance} km
                                    </div>
                                    <div className="text-ellipsis overflow-hidden">
                                        {item.passengerCount} Passenger
                                        {item.passengerCount !== 1 ? 's' : ''}
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-around font-semibold">
                                    <div>
                                        CO<sub>2</sub> Footprint:
                                    </div>
                                    <div>
                                        {formatFootprint(
                                            calculateFootprint(item)
                                        )}
                                        <sub>2</sub>/person
                                    </div>
                                </div>
                                <input
                                    type="button"
                                    aria-label="Delete Activity."
                                    className="w-full text-normal zinc-100 px-2 py-1 rounded-lg
                                    hover:bg-zinc-300 active:bg-zinc-400 focus-visible:outline-green-600"
                                    onClick={() => handleDelete(item.date)}
                                    title="Delete"
                                    value="Delete"
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center text-normal italic text-red-700 pt-2">
                        You have not added any Activites yet.
                    </div>
                )}
            </form>
        </div>
    )
}

export default ActivityHistory
