import Carrier, { CarrierName } from "./carrier";
import CarrierList, { CarrierListInterface } from "./carrier-list";

describe("CarrierList", () => {
    it("constructs from the server response", () => {
        const data: CarrierListInterface = {
            carriers: [
                {
                    id: "1",
                    name: CarrierName.UPS,
                    description: "This is UPS",
                },
                {
                    id: "2",
                    name: CarrierName.USPS,
                    description: "This is USPS",
                },
            ],
        };

        const obj = new CarrierList(data);

        expect(obj).toBeInstanceOf(CarrierList);
        expect(obj.carriers[0]).toBeInstanceOf(Carrier);
        expect(obj.carriers[1]).toBeInstanceOf(Carrier);
        expect(obj).toEqual(data);
    });
});
