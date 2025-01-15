/** The type of tracking event */
enum TrackingStatusCode {
    /** The package has not yet shipped */
    PRE_TRANSIT = "PRE_TRANSIT",
    /** The carrier picked up the package from the shipper */
    ACCEPTED = "ACCEPTED",
    /** The package is in transit to its destination */
    IN_TRANSIT = "IN_TRANSIT",
    /** The package is being returned to the sender */
    RETURN_TO_SENDER = "RETURN_TO_SENDER",
    /**
     * The carrier unsuccessfully attempted to deliver the package.
     *
     * The recipient needs to take action to obtain the package.
     */
    DELIVERY_ATTEMPT_ACTION_NEEDED = "DELIVERY_ATTEMPT_ACTION_NEEDED",
    /**
     * The carrier unsuccessfully attempted to deliver the package.
     *
     * The carrier will make another attempt.
     */
    DELIVERY_ATTEMPT_NO_ACTION_NEEDED = "DELIVERY_ATTEMPT_NO_ACTION_NEEDED",
    /**
     * The package is being held for pickup by the recipient
     */
    AVAILABLE_FOR_PICKUP = "AVAILABLE_FOR_PICKUP",
    /** The package was delivered to the recipient */
    DELIVERED = "DELIVERED",
    /**
     * The package was tendered to a different shipping company
     * to complete the next portion of the delivery or transport
     */
    TENDERED_TO_SHIPPING_PARTNER = "TENDERED_TO_SHIPPING_PARTNER",
    /** The shipment was canceled */
    CANCELED = "CANCELED",
    /**
     * This event is merely informational and doesn't necessarily
     * correspond to an actual tracking event
     */
    INFO = "INFO",
    /** The shipment is being delayed */
    DELAY = "DELAY",
    /** Something happened to the shipment that requires attention */
    ALERT = "ALERT",
}
export default TrackingStatusCode;
