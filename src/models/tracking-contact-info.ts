/**
 * Interface version of {@link TrackingContactInfo}
 *
 * @internal
 */
export interface TrackingContactInfoInterface {
    /** The contact's name */
    readonly contact_name: string | null;
    /** The contact's role in the organization at the address */
    readonly role: string | null;
    /** The name of the company at the address */
    readonly company_name: string | null;
    /** The contact's or address's phone number */
    readonly phone_number: string | null;
    /** The contact's or address's email address */
    readonly email_address: string | null;
    /** The contact's or address's fax number */
    readonly fax_number: string | null;
}

/** A contact at an address relevant to the tracking of a shipment */
export default class TrackingContactInfo implements TrackingContactInfoInterface {
    public readonly contact_name: string | null;
    public readonly role: string | null;
    public readonly company_name: string | null;
    public readonly phone_number: string | null;
    public readonly email_address: string | null;
    public readonly fax_number: string | null;

    /** @hidden */
    constructor(data: TrackingContactInfoInterface) {
        this.contact_name = data.contact_name;
        this.role = data.role;
        this.company_name = data.company_name;
        this.phone_number = data.phone_number;
        this.email_address = data.email_address;
        this.fax_number = data.fax_number;
    }
}
