import CarrierWarning, { CarrierWarningInterface } from "./carrier-warning";

describe("CarrierWarning", () => {
    it("constructs from server response", () => {
        const data: CarrierWarningInterface = {
            code: "WARNING_CODE",
            message: "Warning message",
        };

        const obj = new CarrierWarning(data);

        expect(obj).toBeInstanceOf(CarrierWarning);

        expect(obj).toEqual(data);
    });
});
