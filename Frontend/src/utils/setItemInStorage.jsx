export const setItemInStorage = (key, value) => {
    const storage = sessionStorage.getItem('climate-tracker')
    const parsedTracker = storage ? JSON.parse(storage) : {}
    parsedTracker[key] = value
    sessionStorage.setItem('climate-tracker', JSON.stringify(parsedTracker))
}
