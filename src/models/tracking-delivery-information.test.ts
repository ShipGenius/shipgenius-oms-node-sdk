import TrackingDeliveryInformation, { TrackingDeliveryInformationInterface } from "./tracking-delivery-information";

describe("TrackingDeliveryInformation", () => {
    it("constructs from the server response", () => {
        const data: TrackingDeliveryInformationInterface = {
            signed_by: "Test Person",
            received_by: "Other Person",
            delivery_time: "2025-12-01T12:00:00Z",
            delivery_attempt_time: "2025-11-29T12:00:00Z",
            delivery_location: "Porch",
        };

        const obj = new TrackingDeliveryInformation(data);

        expect(obj).toBeInstanceOf(TrackingDeliveryInformation);
        expect(obj).toEqual(data);
    });

    it("parses delivery time", () => {
        const data: TrackingDeliveryInformationInterface = {
            signed_by: null,
            received_by: null,
            delivery_time: "2025-12-01T12:00:00Z",
            delivery_attempt_time: "2025-11-29T12:00:00Z",
            delivery_location: null,
        };

        const obj = new TrackingDeliveryInformation(data);
        expect(obj.getDeliveryTimeDatetime()?.iso_datetime_string).toBe("2025-12-01T12:00:00+00:00");
        expect(obj.getDeliveryAttemptTimeDatetime()?.iso_datetime_string).toBe("2025-11-29T12:00:00+00:00");
    });

    it("handles null delivery times", () => {
        const data: TrackingDeliveryInformationInterface = {
            signed_by: null,
            received_by: null,
            delivery_time: null,
            delivery_attempt_time: null,
            delivery_location: null,
        };

        const obj = new TrackingDeliveryInformation(data);
        expect(obj.getDeliveryTimeDatetime()).toBeNull();
        expect(obj.getDeliveryAttemptTimeDatetime()).toBeNull();
    });
});
