import TrackingStatus, { TrackingStatusInterface } from "./tracking-status";
import TrackingStatusCode from "./tracking-status-code";

describe("TrackingStatus", () => {
    it("constructs from the server response", () => {
        const data: TrackingStatusInterface = {
            status_code: TrackingStatusCode.PRE_TRANSIT,
            status_details: "Shipping label created",
            carrier_specific: {
                hello: "world",
            },
        };

        const obj = new TrackingStatus(data);

        expect(obj).toBeInstanceOf(TrackingStatus);
        expect(obj).toEqual(data);
    });
});
