import Address from "./address";
import DomesticAddress, { DomesticAddressInterface } from "./domestic-address";
import StateCode from "./state-code";

describe("DomesticAddress", () => {
    it("constructs from server response", () => {
        const data: DomesticAddressInterface = {
            state: StateCode.UT,
            zip_code: "84037",
            urbanization_code: "1234",
            street: ["553 N Kays Dr", "Unit B"],
            city: "Kaysville",
        };

        const obj = new DomesticAddress(data);

        expect(obj).toBeInstanceOf(DomesticAddress);
        expect(obj).toBeInstanceOf(Address);
        expect(obj).toEqual(data);
    });
});
