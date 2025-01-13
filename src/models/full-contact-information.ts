import FullDomesticAddressInput from "./full-domestic-address-input.js";

/** {@link FullDomesticAddressInput} with required email and phone number */
export default interface FullContactInformation extends FullDomesticAddressInput {
    email_address: string;
    phone_number: string;
}
