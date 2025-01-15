import TrackingAddress, { TrackingAddressInterface } from "./tracking-address.js";
import TrackingContactInfo, { TrackingContactInfoInterface } from "./tracking-contact-info.js";

/**
 * Interface version of {@link TrackingAddressAndContact}
 *
 * @internal
 */
export interface TrackingAddressAndContactInterface {
    /** An address relevant to tracking */
    readonly address: TrackingAddressInterface;
    /** Contacts at the address */
    readonly contacts: readonly TrackingContactInfoInterface[] | null;
}

export default class TrackingAddressAndContact implements TrackingAddressAndContactInterface {
    public readonly address: TrackingAddress;
    public readonly contacts: readonly TrackingContactInfo[] | null;

    /** @hidden */
    constructor(data: TrackingAddressAndContactInterface) {
        this.address = new TrackingAddress(data.address);
        this.contacts = data.contacts ? data.contacts.map((contact) => new TrackingContactInfo(contact)) : null;
    }
}
