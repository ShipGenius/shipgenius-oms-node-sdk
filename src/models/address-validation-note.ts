import MessageSeverity from "./message-severity.js";

/** Interface version of {@link AddressValidationNote} */
export interface AddressValidationNoteInterface {
    /**
     * The severity of the note.
     *
     * - `CRITICAL` = The address is likely invalid.
     * - `WARNING` = The address was corrected.
     * - `NOTE` = Information was added to the address
     */
    severity: MessageSeverity;
    /** A human-readable explanation of the correction */
    message: string;
}

/** A note or warning about the address validation */
export default class AddressValidationNote implements AddressValidationNoteInterface {
    public severity: MessageSeverity;
    public message: string;

    constructor(data: AddressValidationNoteInterface) {
        this.severity = data.severity;
        this.message = data.message;
    }
}
