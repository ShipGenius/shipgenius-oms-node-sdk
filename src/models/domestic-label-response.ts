/**
 * Interface version of {@link DomesticLabelResponse}
 *
 * @interface
 */
export interface DomesticLabelResponseInterface {
    /**
     * A typename that can be used as a typeguard if preferred over `isinstance`
     */
    readonly __typename: "DomesticLabelError" | "DomesticLabel";
    /**
     * The UUID of the label-creation transaction.
     *
     * Can be used with {@link "@shipgenius/oms".ShipGeniusOmsClient.recoverLabel | recoverLabel}
     * to recover the label if the label data is lost.
     */
    readonly transaction_id: string;
}

export default class DomesticLabelResponse implements DomesticLabelResponseInterface {
    public readonly __typename: "DomesticLabelError" | "DomesticLabel";
    public readonly transaction_id: string;

    /** @hidden */
    constructor(data: DomesticLabelResponseInterface) {
        this.__typename = data.__typename;
        this.transaction_id = data.transaction_id;
    }
}
