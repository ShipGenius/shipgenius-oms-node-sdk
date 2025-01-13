import ItemizedCharge, { ChargeType, ItemizedChargeInterface } from "./itemized-charge";

describe("ItemizedCharge", () => {
    it("constructs from the server response", () => {
        const data: ItemizedChargeInterface = {
            code: ChargeType.OVERSIZE_FEE,
            carrier_charge_code: "OVERSIZE",
            carrier_charge_description: "Package too big",
            charge_amount: "5.27",
        };

        const obj = new ItemizedCharge(data);
        expect(obj).toBeInstanceOf(ItemizedCharge);
        expect(obj).toEqual(data);
    });
});
