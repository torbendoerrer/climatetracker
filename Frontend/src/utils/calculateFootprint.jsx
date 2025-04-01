export const calculateFootprint = (item) => {
    return (
        ((item.transportationMethod.emissionFactor * item.distance) /
            item.passengerCount) *
        item.transportationMethod.fuelAdjustment
    )
}
