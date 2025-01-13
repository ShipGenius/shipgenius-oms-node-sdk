import Carrier, { CarrierName } from "./carrier";
import CarrierService, { CarrierServiceInterface, ShippingRegionType } from "./carrier-service";

describe("CarrierService", () => {
    it("constructs from the server response", () => {
        const data: CarrierServiceInterface = {
            id: "2",
            name: "USPS Ground Advantage",
            code: "USPS_GROUND_ADVANTAGE",
            enabled_for_retail_user: true,
            shipping_region_type: ShippingRegionType.US_DOMESTIC,
            description: "USPS Ground Shipment",
            carrier: {
                id: "1",
                name: CarrierName.USPS,
                description: "This is USPS",
            },
        };

        const obj = new CarrierService(data);

        expect(obj).toBeInstanceOf(CarrierService);
        expect(obj.carrier).toBeInstanceOf(Carrier);
        expect(obj).toEqual(data);
    });

    it("constructs from the server response with null carrier", () => {
        const data: CarrierServiceInterface = {
            id: "2",
            name: "USPS Ground Advantage",
            code: "USPS_GROUND_ADVANTAGE",
            enabled_for_retail_user: true,
            shipping_region_type: ShippingRegionType.US_DOMESTIC,
            description: "USPS Ground Shipment",
            carrier: null,
        };

        const obj = new CarrierService(data);

        expect(obj).toBeInstanceOf(CarrierService);
        expect(obj).toEqual(data);
    });
});
