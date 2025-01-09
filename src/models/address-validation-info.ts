import AdditionalAddressInformation, { AdditionalAddressInformationInterface } from "./additional-address-information.js";
import AddressValidationNote, { AddressValidationNoteInterface } from "./address-validation-note.js";
import AddressValidationResponse from "./address-validation-response.js";
import DomesticAddress, { DomesticAddressInterface } from "./domestic-address.js";

/** Interface version of {@link AddressValidationInfo} */
export interface AddressValidationInfoInterface {
    /** Typename that can be used for type guards instead of `instanceof` */
    __typename: "AddressValidationInfo";
    /** A list of warnings and corrections to the address, sorted from most critical to least critical */
    warnings: readonly AddressValidationNoteInterface[];
    /** The address as corrected by USPS */
    normalized_address: DomesticAddressInterface;
    /** The original address entered by the user */
    original_address: DomesticAddressInterface;
    /** Additional information about the address, mostly concerning its validity */
    additional: AdditionalAddressInformationInterface;
}

/** Informatin about a successful address validation */
export default class AddressValidationInfo extends AddressValidationResponse implements AddressValidationInfoInterface {
    public __typename = "AddressValidationInfo" as const;
    public warnings: readonly AddressValidationNote[];
    public normalized_address: DomesticAddress;
    public original_address: DomesticAddress;
    public additional: AdditionalAddressInformation;

    constructor(data: AddressValidationInfoInterface) {
        super(data.__typename);

        this.warnings = data.warnings.map((warning) => new AddressValidationNote(warning));
        this.normalized_address = new DomesticAddress(data.normalized_address);
        this.original_address = new DomesticAddress(data.original_address);
        this.additional = new AdditionalAddressInformation(data.additional);
    }
}
