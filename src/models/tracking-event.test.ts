import TrackingAddressAndContact from "./tracking-address-and-contact";
import TrackingEvent, { TrackingEventInterface } from "./tracking-event";
import TrackingStatus from "./tracking-status";
import TrackingStatusCode from "./tracking-status-code";

describe("TrackingEvent", () => {
    it("constructs from the server response", () => {
        const data: TrackingEventInterface = {
            event_time: "2025-01-15T12:45:56Z",
            location: {
                address: {
                    street: null,
                    city: null,
                    state_or_province_code: null,
                    postal_code: null,
                    country_code: null,
                    urbanization_code: null,
                    residential: null,
                },
                contacts: null,
            },
            status: {
                status_code: TrackingStatusCode.PRE_TRANSIT,
                status_details: "Shipping label created",
                carrier_specific: { hello: "world" },
            },
        };

        const obj = new TrackingEvent(data);

        expect(obj).toBeInstanceOf(TrackingEvent);
        expect(obj.location).toBeInstanceOf(TrackingAddressAndContact);
        expect(obj.status).toBeInstanceOf(TrackingStatus);

        expect(obj).toEqual(data);
    });

    it("parses the event time", () => {
        const data: TrackingEventInterface = {
            event_time: "2025-01-15T12:45:56Z",
            location: null,
            status: {
                status_code: TrackingStatusCode.PRE_TRANSIT,
                status_details: "Shipping label created",
                carrier_specific: { hello: "world" },
            },
        };

        const obj = new TrackingEvent(data);

        expect(obj.event_time_datetime?.iso_datetime_string).toBe("2025-01-15T12:45:56+00:00");
    });

    it("handles null event times", () => {
        const data: TrackingEventInterface = {
            event_time: null,
            location: null,
            status: {
                status_code: TrackingStatusCode.PRE_TRANSIT,
                status_details: "Shipping label created",
                carrier_specific: { hello: "world" },
            },
        };

        const obj = new TrackingEvent(data);

        expect(obj.event_time_datetime).toBeNull();
    });
});
