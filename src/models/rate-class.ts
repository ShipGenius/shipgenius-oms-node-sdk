/** The pricing class of rates to return */
enum RateClass {
    /** The standard rate for retail customers */
    STANDARD = "STANDARD",
    /** The standard rate for commercial customers */
    COMMERCIAL = "COMMERCIAL",
    /** The best rate available on the account */
    NEGOTIATED = "NEGOTIATED",
}
export default RateClass;
