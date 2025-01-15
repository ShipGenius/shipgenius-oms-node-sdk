import TrackingAddress from "./tracking-address";
import TrackingAddressAndContact, { TrackingAddressAndContactInterface } from "./tracking-address-and-contact";
import TrackingContactInfo from "./tracking-contact-info";

describe("TrackingAddressAndContact", () => {
    it("constucts from the server response", () => {
        const data: TrackingAddressAndContactInterface = {
            address: {
                street: ["123 Sesame St", "#101"],
                city: "Somewhere",
                state_or_province_code: "NY",
                postal_code: "12345",
                country_code: "US",
                urbanization_code: null,
                residential: false,
            },
            contacts: [
                {
                    contact_name: "Contact One",
                    role: "Package Inspector",
                    company_name: "Test Inc",
                    phone_number: "(123) 456-7890",
                    email_address: "test@example.com",
                    fax_number: null,
                },
                {
                    contact_name: "Some Guy",
                    role: null,
                    company_name: null,
                    phone_number: null,
                    email_address: null,
                    fax_number: "i don't know what a fax number looks like",
                },
            ],
        };

        const obj = new TrackingAddressAndContact(data);

        expect(obj).toBeInstanceOf(TrackingAddressAndContact);
        expect(obj.address).toBeInstanceOf(TrackingAddress);
        expect(obj.contacts?.[0]).toBeInstanceOf(TrackingContactInfo);
        expect(obj.contacts?.[1]).toBeInstanceOf(TrackingContactInfo);

        expect(obj).toEqual(data);
    });
});
