import { CarrierName } from "./carrier";
import DomesticRateResponse, { DomesticRateResponseInterface } from "./domestic-rate-response";
import RateClass from "./rate-class";

describe("DomesticRateResponse", () => {
    it("constructs from server response", () => {
        const data: DomesticRateResponseInterface = {
            __typename: "DomesticRate",
            carrier: CarrierName.DHL,
            requested_rate_class: RateClass.STANDARD,
            service_code: "GND",
        };

        const obj = new DomesticRateResponse(data);

        expect(obj).toBeInstanceOf(DomesticRateResponse);
        expect(obj).toEqual(data);
    });
});
