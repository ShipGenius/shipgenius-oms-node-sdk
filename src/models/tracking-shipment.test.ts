import { CarrierName } from "./carrier";
import TrackingAddressAndContact from "./tracking-address-and-contact";
import TrackingShipment, { TrackingShipmentInterface } from "./tracking-shipment";

describe("TrackingShipment", () => {
    it("constructs from the server response", () => {
        const data: TrackingShipmentInterface = {
            tracking_number: "abc123",
            unique_tracking_number: "unique-abc123",
            carrier: CarrierName.UPS,
            ship_time: "2025-01-14T12:00:00Z",
            origin: {
                address: {
                    street: ["123 Sesame St"],
                    city: "Kaysville",
                    state_or_province_code: "UT",
                    postal_code: "84037",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [
                    {
                        contact_name: "Test User",
                        role: null,
                        company_name: null,
                        phone_number: null,
                        email_address: "test@example.com",
                        fax_number: null,
                    },
                ],
            },
            destination: {
                address: {
                    street: ["456 Other Street", "#101"],
                    city: "Somewhere",
                    state_or_province_code: "NY",
                    postal_code: "12345",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [
                    {
                        contact_name: "Other User",
                        role: null,
                        company_name: null,
                        phone_number: null,
                        email_address: null,
                        fax_number: null,
                    },
                ],
            },
        };

        const obj = new TrackingShipment(data);

        expect(obj).toBeInstanceOf(TrackingShipment);
        expect(obj.origin).toBeInstanceOf(TrackingAddressAndContact);
        expect(obj.destination).toBeInstanceOf(TrackingAddressAndContact);

        expect(obj).toEqual(data);
    });

    it("gets processed datetime information", () => {
        const data: TrackingShipmentInterface = {
            tracking_number: "abc123",
            unique_tracking_number: "unique-abc123",
            carrier: CarrierName.UPS,
            ship_time: "2025-01-14T12:00:00Z",
            origin: {
                address: {
                    street: ["123 Sesame St"],
                    city: "Kaysville",
                    state_or_province_code: "UT",
                    postal_code: "84037",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [],
            },
            destination: {
                address: {
                    street: ["456 Other Street", "#101"],
                    city: "Somewhere",
                    state_or_province_code: "NY",
                    postal_code: "12345",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [],
            },
        };

        const obj = new TrackingShipment(data);

        expect(obj.getShipDatetime()?.iso_datetime_string).toBe("2025-01-14T12:00:00+00:00");
    });

    it("handles null datetime information", () => {
        const data: TrackingShipmentInterface = {
            tracking_number: "abc123",
            unique_tracking_number: "unique-abc123",
            carrier: CarrierName.UPS,
            ship_time: null,
            origin: {
                address: {
                    street: ["123 Sesame St"],
                    city: "Kaysville",
                    state_or_province_code: "UT",
                    postal_code: "84037",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [],
            },
            destination: {
                address: {
                    street: ["456 Other Street", "#101"],
                    city: "Somewhere",
                    state_or_province_code: "NY",
                    postal_code: "12345",
                    country_code: "US",
                    urbanization_code: null,
                    residential: true,
                },
                contacts: [],
            },
        };

        const obj = new TrackingShipment(data);

        expect(obj.getShipDatetime()).toBeNull();
    });
});
