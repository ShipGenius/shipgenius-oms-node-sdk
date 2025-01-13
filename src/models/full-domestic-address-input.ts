import DomesticAddressInput from "./domestic-address-input.js";

/** Information about a domestic address and contact */
export default interface FullDomesticAddressInput extends DomesticAddressInput {
    /**
     * The first name of the person associated with the address.
     *
     * @remarks
     *
     * - Required if {@link company_name} is not provided.
     * - Required if {@link attention_last_name} is provided.
     *
     */
    attention_first_name?: string | null;
    /**
     * The last name of the person associated with the address.
     *
     * @remarks
     *
     * - Required if {@link company_name} is not provided.
     * - Required if {@link attention_first_name} is provided.
     *
     */
    attention_last_name?: string | null;
    /**
     * The name of the company associated with the address.
     *
     * @remarks
     *
     * - Required if {@link attention_first_name} and {@link attention_last_name} aren't provided.
     */
    company_name?: string | null;
    /**
     * The phone number of the contact at the address.
     */
    phone_number?: string | null;
    /**
     * The fax number of the contact at the address.
     */
    fax_number?: string | null;
    /**
     * The email address of the contact at the address.
     */
    email_address?: string | null;
}
