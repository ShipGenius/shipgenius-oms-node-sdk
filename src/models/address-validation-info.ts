import AdditionalAddressInformation, { AdditionalAddressInformationInterface } from "./additional-address-information.js";
import AddressValidationNote, { AddressValidationNoteInterface } from "./address-validation-note.js";
import AddressValidationResponse, { AddressValidationResponseInterface } from "./address-validation-response.js";
import DomesticAddress, { DomesticAddressInterface } from "./domestic-address.js";

/**
 * Interface version of {@link AddressValidationInfo}
 *
 * @internal
 */
export interface AddressValidationInfoInterface extends AddressValidationResponseInterface {
    readonly __typename: "AddressValidationInfo";
    /** A list of warnings and corrections to the address, sorted from most critical to least critical */
    readonly warnings: AddressValidationNoteInterface[];
    /** The address as corrected by USPS */
    readonly normalized_address: DomesticAddressInterface;
    /** The original address entered by the user */
    readonly original_address: DomesticAddressInterface;
    /** Additional information about the address, mostly concerning its validity */
    readonly additional: AdditionalAddressInformationInterface;
}

/** Informatin about a successful address validation */
export default class AddressValidationInfo extends AddressValidationResponse implements AddressValidationInfoInterface {
    public readonly __typename = "AddressValidationInfo" as const;
    public readonly warnings: AddressValidationNote[];
    public readonly normalized_address: DomesticAddress;
    public readonly original_address: DomesticAddress;
    public readonly additional: AdditionalAddressInformation;

    /** @hidden */
    constructor(data: AddressValidationInfoInterface) {
        super(data.__typename);

        this.warnings = data.warnings.map((warning) => new AddressValidationNote(warning));
        this.normalized_address = new DomesticAddress(data.normalized_address);
        this.original_address = new DomesticAddress(data.original_address);
        this.additional = new AdditionalAddressInformation(data.additional);
    }
}
