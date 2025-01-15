import DeliverySchedule, { DeliveryScheduleInterface } from "./delivery-schedule";
import DeliveryWindow from "./delivery-window";

describe("DeliverySchedule", () => {
    it("constructs from the server response", () => {
        const data: DeliveryScheduleInterface = {
            expected_delivery: "2025-12-15T00:00:00Z",
            delivery_window: {
                start: "2025-12-15T00:00:00Z",
                end: "2025-12-16T00:00:00Z",
            },
            on_time: true,
        };

        const obj = new DeliverySchedule(data);

        expect(obj).toBeInstanceOf(DeliverySchedule);
        expect(obj.delivery_window).toBeInstanceOf(DeliveryWindow);
        expect(obj).toEqual(data);
    });

    it("processes the expected datetime", () => {
        const data: DeliveryScheduleInterface = {
            expected_delivery: "2025-12-15T00:00:00Z",
            delivery_window: null,
            on_time: null,
        };

        const obj = new DeliverySchedule(data);
        expect(obj.getExpectedDeliveryDatetime()?.iso_datetime_string).toBe("2025-12-15T00:00:00+00:00");
    });

    it("handles null expected datetimes", () => {
        const data: DeliveryScheduleInterface = {
            expected_delivery: null,
            delivery_window: null,
            on_time: null,
        };

        const obj = new DeliverySchedule(data);
        expect(obj.getExpectedDeliveryDatetime()).toBeNull();
    });
});
