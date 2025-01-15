import { CarrierName } from "./carrier";
import CarrierWarning from "./carrier-warning";
import DomesticRate, { DomesticRateInterface } from "./domestic-rate";
import DomesticRateResponse from "./domestic-rate-response";
import ItemizedCharge, { ChargeType } from "./itemized-charge";
import RateClass from "./rate-class";

const data: DomesticRateInterface = {
    __typename: "DomesticRate",
    carrier: CarrierName.UPS,
    requested_rate_class: RateClass.NEGOTIATED,
    service_code: "GND",
    account_number: null,
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
};

describe("DomesticRate", () => {
    it("constructs from server response", () => {
        const obj = new DomesticRate(data);

        expect(obj).toBeInstanceOf(DomesticRate);
        expect(obj).toBeInstanceOf(DomesticRateResponse);
        expect(obj.warnings[0]).toBeInstanceOf(CarrierWarning);
        expect(obj.warnings[1]).toBeInstanceOf(CarrierWarning);
        expect(obj.itemized_charges[0]).toBeInstanceOf(ItemizedCharge);
        expect(obj.itemized_charges[1]).toBeInstanceOf(ItemizedCharge);

        expect(obj).toEqual(data);
    });

    it("converts estimated delivery dates", () => {
        const obj = new DomesticRate({
            ...data,
            estimated_delivery: "2025-02-15",
        });

        expect(obj.getEstimatedDeliveryDate()?.fields).toEqual({
            day: 15,
            month: 2,
            year: 2025,
        });
    });

    it("handles null estimated delivery dates", () => {
        const obj = new DomesticRate({
            ...data,
            estimated_delivery: null,
        });

        expect(obj.getEstimatedDeliveryDate()).toBeNull();
    });
});
