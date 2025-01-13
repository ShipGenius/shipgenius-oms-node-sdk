import BulkDomesticRateResponse, { BulkDomesticRateResponseInterface } from "./bulk-domestic-rate-response";
import { CarrierName } from "./carrier";
import CarrierErrorCode from "./carrier-error-code";
import DomesticRate, { DomesticRateInterface } from "./domestic-rate";
import DomesticRateError, { DomesticRateErrorInterface } from "./domestic-rate-error";
import { ChargeType } from "./itemized-charge";
import RateClass from "./rate-class";

describe("BulkDomesticRateResponse", () => {
    it("constructs from server response", () => {
        const data: BulkDomesticRateResponseInterface = {
            request_id: "abc123",
            rates: [
                {
                    __typename: "DomesticRateError",
                    carrier: CarrierName.UPS,
                    requested_rate_class: RateClass.NEGOTIATED,
                    service_code: "WHATEVER",
                    code: CarrierErrorCode.SERVICE_NOT_FOUND,
                    message: "UPS does not offer service 'WHATEVER'",
                } as DomesticRateErrorInterface,
                {
                    __typename: "DomesticRate",
                    carrier: CarrierName.UPS,
                    requested_rate_class: RateClass.NEGOTIATED,
                    service_code: "GND",
                    rate_id: "def456",
                    warnings: [
                        {
                            code: "NOTE",
                            message: "We like adding notes for no reason :)",
                        },
                        {
                            code: "SOMETHING",
                            message: "Delivery dates are an estimate",
                        },
                    ],
                    disclaimers: ["Disclaimer 1", "Disclaimer 2"],
                    actual_rate_class: RateClass.COMMERCIAL,
                    labelgenius_charge: "25.87",
                    labelgenius_charge_with_card_fee: "27.12",
                    base_price: "20.05",
                    total_price: "25.87",
                    itemized_charges: [
                        {
                            code: ChargeType.BASE_CHARGE,
                            charge_amount: "20.05",
                            carrier_charge_code: "TRANSPORT",
                            carrier_charge_description: "Transportation of package",
                        },
                        {
                            code: ChargeType.FUEL_SURCHARGE,
                            charge_amount: "5.82",
                            carrier_charge_code: "FUEL",
                            carrier_charge_description: "Fuel used in transportation",
                        },
                    ],
                    estimated_delivery: "2025-02-15",
                    guaranteed_delivery: true,
                    billing_weight: 10,
                    carrier_specific: {
                        hello: "world",
                    },
                } as DomesticRateInterface,
            ],
        };

        const obj = new BulkDomesticRateResponse(data);

        expect(obj).toBeInstanceOf(BulkDomesticRateResponse);
        expect(obj.rates[0]).toBeInstanceOf(DomesticRateError);
        expect(obj.rates[1]).toBeInstanceOf(DomesticRate);
        expect(obj).toEqual(data);
    });
});
