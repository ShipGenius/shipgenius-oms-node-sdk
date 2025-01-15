import { CarrierName } from "./carrier";
import DeliverySchedule from "./delivery-schedule";
import TrackingDeliveryInformation from "./tracking-delivery-information";
import TrackingEvent from "./tracking-event";
import TrackingInformation, { TrackingInformationInterface } from "./tracking-information";
import TrackingShipment from "./tracking-shipment";
import TrackingStatusCode from "./tracking-status-code";

describe("TrackingInformation", () => {
    it("constructs from the server response", () => {
        const data: TrackingInformationInterface = {
            shipment_info: {
                tracking_number: "abc123",
                unique_tracking_number: null,
                carrier: CarrierName.UPS,
                ship_time: null,
                origin: {
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
                destination: {
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
            },
            delivery: {
                signed_by: null,
                received_by: null,
                delivery_time: null,
                delivery_attempt_time: null,
                delivery_location: null,
            },
            schedule: {
                expected_delivery: null,
                delivery_window: null,
                on_time: null,
            },
            notices: ["First Notice", "Second Notice"],
            last_updated: "2025-01-15T12:34:56Z",
            last_known_location: {
                street: null,
                city: null,
                state_or_province_code: null,
                postal_code: null,
                country_code: null,
                urbanization_code: null,
                residential: null,
            },
            event_history: [
                {
                    event_time: null,
                    location: null,
                    status: {
                        status_code: TrackingStatusCode.PRE_TRANSIT,
                        status_details: "Tracking Label Created",
                        carrier_specific: {},
                    },
                },
                {
                    event_time: null,
                    location: null,
                    status: {
                        status_code: TrackingStatusCode.ACCEPTED,
                        status_details: "Package accepted",
                        carrier_specific: {},
                    },
                },
            ],
            carrier_specific: { hello: "world" },
        };

        const obj = new TrackingInformation(data);

        expect(obj).toBeInstanceOf(TrackingInformation);
        expect(obj.shipment_info).toBeInstanceOf(TrackingShipment);
        expect(obj.delivery).toBeInstanceOf(TrackingDeliveryInformation);
        expect(obj.schedule).toBeInstanceOf(DeliverySchedule);
        expect(obj.event_history[0]).toBeInstanceOf(TrackingEvent);
        expect(obj.event_history[1]).toBeInstanceOf(TrackingEvent);

        expect(obj).toEqual(data);
    });

    it("parses the update time", () => {
        const data: TrackingInformationInterface = {
            shipment_info: {
                tracking_number: "abc123",
                unique_tracking_number: null,
                carrier: CarrierName.UPS,
                ship_time: null,
                origin: {
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
                destination: {
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
            },
            delivery: {
                signed_by: null,
                received_by: null,
                delivery_time: null,
                delivery_attempt_time: null,
                delivery_location: null,
            },
            schedule: {
                expected_delivery: null,
                delivery_window: null,
                on_time: null,
            },
            notices: [],
            last_updated: "2025-01-15T12:34:56Z",
            last_known_location: null,
            event_history: [],
            carrier_specific: { hello: "world" },
        };

        const obj = new TrackingInformation(data);

        expect(obj.getLastUpdatedDatetime()?.iso_datetime_string).toBe("2025-01-15T12:34:56+00:00");
        expect(obj).toEqual(data);
    });

    it("handles null update times", () => {
        const data: TrackingInformationInterface = {
            shipment_info: {
                tracking_number: "abc123",
                unique_tracking_number: null,
                carrier: CarrierName.UPS,
                ship_time: null,
                origin: {
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
                destination: {
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
            },
            delivery: {
                signed_by: null,
                received_by: null,
                delivery_time: null,
                delivery_attempt_time: null,
                delivery_location: null,
            },
            schedule: {
                expected_delivery: null,
                delivery_window: null,
                on_time: null,
            },
            notices: [],
            last_updated: null,
            last_known_location: null,
            event_history: [],
            carrier_specific: { hello: "world" },
        };

        const obj = new TrackingInformation(data);

        expect(obj.getLastUpdatedDatetime()).toBeNull();
        expect(obj).toEqual(data);
    });
});
