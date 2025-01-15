/**
 * The result of attempting to void a label
 */
enum VoidLabelResponse {
    /**
     * The label was voided,
     * and a refund was initiated if possible
     */
    SUCCESS = "SUCCESS",
    /**
     * The label either does not exists,
     * or could not be found by the carrier.
     *
     * Label not voided. No refund was initiated.
     */
    NOT_FOUND = "NOT_FOUND",
    /**
     * The label has already been voided.
     *
     * No action taken. No refund was initiated.
     */
    ALREADY_VOIDED = "ALREADY_VOIDED",
    /**
     * The label has already been used
     * and cannot be voided.
     *
     * Label not voided. No refund was initiated.
     */
    ALREADY_SHIPPED = "ALREADY_SHIPPED",
}
export default VoidLabelResponse;

export interface VoidLabelQueryResponse {
    void_label: VoidLabelResponse;
}
