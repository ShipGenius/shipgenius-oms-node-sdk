import DeliveryWindow, { DeliveryWindowInterface } from "./delivery-window";

describe("DeliveryWindow", () => {
    it("constructs from the server response", () => {
        const data: DeliveryWindowInterface = {
            start: "2025-01-15T00:00:00Z",
            end: "2025-01-15T12:00:00Z",
        };

        const obj = new DeliveryWindow(data);

        expect(obj).toBeInstanceOf(DeliveryWindow);
        expect(obj).toEqual(data);
    });

    it("processes datetimes", () => {
        const data: DeliveryWindowInterface = {
            start: "2025-01-15T00:00:00Z",
            end: "2025-01-15T12:00:00Z",
        };

        const obj = new DeliveryWindow(data);

        expect(obj.start_datetime?.iso_datetime_string).toBe("2025-01-15T00:00:00+00:00");
        expect(obj.end_datetime?.iso_datetime_string).toBe("2025-01-15T12:00:00+00:00");
    });

    it("handles null datetimes", () => {
        const data: DeliveryWindowInterface = {
            start: null,
            end: null,
        };

        const obj = new DeliveryWindow(data);

        expect(obj.start_datetime).toBeNull();
        expect(obj.end_datetime).toBeNull();
    });
});
