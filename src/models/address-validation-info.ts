import AdditionalAddressInformation, { AdditionalAddressInformationData } from "./additional-address-information.js";
import AddressValidationNote, { AddressValidationNoteData } from "./address-validation-note.js";
import AddressValidationResponse from "./address-validation-response.js";
import DomesticAddress, { DomesticAddressData } from "./domestic-address.js";

/** Information about a successfully validated address */
export interface AddressValidationInfoData {
    /** Typename that can be used for type guards instead of `instanceof` */
    __typename: "AddressValidationInfo";
    /** A list of warnings and corrections to the address, sorted from most critical to least critical */
    warnings: readonly AddressValidationNoteData[];
    /** The address as corrected by USPS */
    normalized_address: DomesticAddressData;
    /** The original address entered by the user */
    original_address: DomesticAddressData;
    /** Additional information about the address, mostly concerning its validity */
    additional: AdditionalAddressInformationData;
}

/** Informatin about a successful address validation */
export default class AddressValidationInfo extends AddressValidationResponse implements AddressValidationInfoData {
    public __typename = "AddressValidationInfo" as const;
    public warnings: readonly AddressValidationNote[];
    public normalized_address: DomesticAddress;
    public original_address: DomesticAddress;
    public additional: AdditionalAddressInformation;

    constructor(data: AddressValidationInfoData) {
        super(data.__typename);

        this.warnings = data.warnings.map((warning) => new AddressValidationNote(warning));
        this.normalized_address = new DomesticAddress(data.normalized_address);
        this.original_address = new DomesticAddress(data.original_address);
        this.additional = new AdditionalAddressInformation(data.additional);
    }
}
