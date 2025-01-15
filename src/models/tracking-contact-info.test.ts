import TrackingContactInfo, { TrackingContactInfoInterface } from "./tracking-contact-info";

describe("TrackingContactInfo", () => {
    it("constructs from server response", () => {
        const data: TrackingContactInfoInterface = {
            contact_name: "Test Handler",
            role: "Package Inspector",
            company_name: "Test Inc",
            phone_number: "(123) 456-7890",
            email_address: "test@example.com",
            fax_number: null,
        };

        const obj = new TrackingContactInfo(data);

        expect(obj).toBeInstanceOf(TrackingContactInfo);
        expect(obj).toEqual(data);
    });
});
