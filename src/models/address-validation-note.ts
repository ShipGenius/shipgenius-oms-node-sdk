import MessageSeverity from "./message-severity.js";

/**
 * Interface version of {@link AddressValidationNote}
 *
 * @internal
 */
export interface AddressValidationNoteInterface {
    /**
     * The severity of the note.
     *
     * - {@link MessageSeverity.CRITICAL | `CRITICAL`} = The address is likely invalid.
     * - {@link MessageSeverity.WARNING | `WARNING`} = The address was corrected.
     * - {@link MessageSeverity.NOTE | `NOTE`} = Information was added to the address
     */
    readonly severity: MessageSeverity;
    /** A human-readable explanation of the correction */
    readonly message: string;
}

/** A note or warning about the address validation */
export default class AddressValidationNote implements AddressValidationNoteInterface {
    public readonly severity: MessageSeverity;
    public readonly message: string;

    /** @hidden */
    constructor(data: AddressValidationNoteInterface) {
        this.severity = data.severity;
        this.message = data.message;
    }
}
