import { JsonObject } from "../typescript-utils.js";

/** A reference number connecting a shipment to an external id */
export default interface ReferenceNumber extends JsonObject {
    /** The reference number to associate with the shipment */
    number: string;
    /**
     * Whether to print the reference number on the label.
     *
     * If the carrier limits how many references numbers can
     * be printed on the label, the first reference numbers
     * specified will be given priority.
     *
     * > [!CAUTION]
     * >
     * > **Do not use this field to hide sensitive information.**
     * >
     * > This does not guarantee the presence or absence of
     * > a reference number on the label.
     * >
     * > Some carriers do not have an option to prevent reference numbers
     * > from being displayed on the label, and some carriers do not
     * > have an option to display reference numbers on a the label at all.
     *
     * @default true
     */
    print?: boolean;
}
