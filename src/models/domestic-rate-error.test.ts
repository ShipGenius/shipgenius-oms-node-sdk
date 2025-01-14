import { CarrierName } from "./carrier";
import CarrierErrorCode from "./carrier-error-code";
import DomesticRateError, { DomesticRateErrorInterface } from "./domestic-rate-error";
import DomesticRateResponse from "./domestic-rate-response";
import RateClass from "./rate-class";

describe("DomesticRateError", () => {
    it("constructs from server response", () => {
        const data: DomesticRateErrorInterface = {
            __typename: "DomesticRateError",
            code: CarrierErrorCode.COULD_NOT_CONNECT,
            message: "Could not connect to server",
            carrier: CarrierName.UPS,
            requested_rate_class: RateClass.STANDARD,
            service_code: "GND",
            account_number: null,
        };

        const obj = new DomesticRateError(data);

        expect(obj).toBeInstanceOf(DomesticRateError);
        expect(obj).toBeInstanceOf(DomesticRateResponse);

        expect(obj).toEqual(data);
    });
});
