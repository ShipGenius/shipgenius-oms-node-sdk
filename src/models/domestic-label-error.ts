import DomesticLabelResponse, { DomesticLabelResponseInterface } from "./domestic-label-response.js";

/**
 * Interface version of {@link DomesticLabelError}
 *
 * @internal
 */
export interface DomesticLabelErrorInterface extends DomesticLabelResponseInterface {
    readonly __typename: "DomesticLabelError";
    /** A code identifying the type of error */
    readonly code: string;
    /** A human-facing message explaining the error, if available */
    readonly message: string | null;
}

/** An error occurring  */
export default class DomesticLabelError extends DomesticLabelResponse implements DomesticLabelErrorInterface {
    public readonly __typename: "DomesticLabelError" = "DomesticLabelError" as const;
    public readonly code: string;
    public readonly message: string | null;
    public readonly transaction_id: string;

    /** @hidden */
    constructor(data: DomesticLabelErrorInterface) {
        super(data);
        this.code = data.code;
        this.message = data.message;
        this.transaction_id = data.transaction_id;
    }
}
