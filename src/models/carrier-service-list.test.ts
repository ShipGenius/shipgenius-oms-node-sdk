import { CarrierName } from "./carrier";
import CarrierService, { ShippingRegionType } from "./carrier-service";
import CarrierServiceList, { CarrierServiceListInterface } from "./carrier-service-list";

describe("CarrierList", () => {
    it("constructs from the server response", () => {
        const data: CarrierServiceListInterface = {
            services: [
                {
                    id: "1",
                    name: "UPS Ground",
                    code: "GND",
                    enabled_for_retail_user: true,
                    shipping_region_type: ShippingRegionType.US_DOMESTIC,
                    description: "UPS Ground Shipment",
                    carrier: {
                        id: "2",
                        name: CarrierName.UPS,
                        description: "This is UPS",
                    },
                },
                {
                    id: "3",
                    name: "USPS International",
                    code: "USPS_INTERNATIONAL",
                    enabled_for_retail_user: false,
                    shipping_region_type: ShippingRegionType.INTERNATIONAL_FROM_US,
                    description: "USPS International Shipment",
                    carrier: {
                        id: "4",
                        name: CarrierName.USPS,
                        description: "This is USPS",
                    },
                },
            ],
        };

        const obj = new CarrierServiceList(data);

        expect(obj).toBeInstanceOf(CarrierServiceList);
        expect(obj.services[0]).toBeInstanceOf(CarrierService);
        expect(obj.services[1]).toBeInstanceOf(CarrierService);
        expect(obj).toEqual(data);
    });
});
