/** The type of issue encountered in request to a carrier */
enum CarrierErrorCode {
    /** Failed to connect to the carrier's API. It may be down. */
    COULD_NOT_CONNECT = "COULD_NOT_CONNECT",
    /** The carrier indicated that the credentials associated with your account are invalid. */
    CREDENTIALS_INVALID = "CREDENTIALS_INVALID",
    /** The carrier's API responded with an unexpected error */
    CARRIER_ERROR = "CARRIER_ERROR",
    /** Failed to fetch the given rate */
    COULD_NOT_FIND_RATE = "COULD_NOT_FIND_RATE",
    /** Either this carrier service does not exist, or it is not supported */
    SERVICE_NOT_FOUND = "SERVICE_NOT_FOUND",
    /** The specified packaging cannot be used with the carrier */
    INVALID_PACKAGING = "INVALID_PACKAGING",
    /** Not enough information was provided to complete the request */
    INCOMPLETE_REQUEST = "INCOMPLETE_REQUEST",
    /**
     * The request has been been attempted with a duplicate id.
     *
     * All requests initiating a payment or refund need a new UUID.
     */
    DUPLICATE_REQUEST_ID = "DUPLICATE_REQUEST_ID",

    /** An error was returned from the carrier that we cannot interpret */
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export default CarrierErrorCode;
