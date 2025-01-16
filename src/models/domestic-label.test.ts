import { CarrierName } from "./carrier";
import CarrierWarning from "./carrier-warning";
import DomesticLabel, { DomesticLabelInterface } from "./domestic-label";
import DomesticLabelResponse from "./domestic-label-response";
import ItemizedCharge, { ChargeType } from "./itemized-charge";
import LabelFormat from "./label-format";
import LabelImage from "./label-image";

describe("DomesticLabel", () => {
    it("constructs from the server response (no image)", () => {
        const data: DomesticLabelInterface<LabelFormat.NONE> = {
            __typename: "DomesticLabel",
            transaction_id: "4061d9d2-341e-4a7a-91e6-b11b7d1b4347",
            id: "123",
            carrier: CarrierName.UPS,
            service_code: "GND",
            account_number: null,
            warnings: [
                {
                    code: "Warning",
                    message: "This is a warning",
                },
            ],
            disclaimers: ["hello"],
            estimated_delivery: "2025-12-15",
            guaranteed_delivery: true,
            carrier_specific: { hello: "world" },
            shipment_id: "abc123",
            tracking_number: "def456",
            label_uuid: "4a5fe80d-2c58-4e0b-97e7-db134d85e7f4",
            labelgenius_charge: "12.95",
            itemized_charges: [
                {
                    code: ChargeType.BASE_CHARGE,
                    carrier_charge_code: "Transport",
                    carrier_charge_description: "Transportation of package",
                    charge_amount: "10.00",
                },
                {
                    code: ChargeType.FUEL_SURCHARGE,
                    carrier_charge_code: "FUEL",
                    carrier_charge_description: "Fueld for transportation",
                    charge_amount: "2.95",
                },
            ],
            base_price: "10.00",
            total_price: "2.95",
            billing_weight: 5,
            label: null,
        };

        const obj = new DomesticLabel<LabelFormat.NONE>(data);

        expect(obj).toBeInstanceOf(DomesticLabel);
        expect(obj).toBeInstanceOf(DomesticLabelResponse);
        expect(obj.warnings[0]).toBeInstanceOf(CarrierWarning);
        expect(obj.itemized_charges[0]).toBeInstanceOf(ItemizedCharge);
        expect(obj).toEqual(data);
    });

    it("constructs from the server response (png)", () => {
        const data: DomesticLabelInterface<LabelFormat.PNG> = {
            __typename: "DomesticLabel",
            transaction_id: "4061d9d2-341e-4a7a-91e6-b11b7d1b4347",
            id: "123",
            carrier: CarrierName.UPS,
            service_code: "GND",
            account_number: null,
            warnings: [
                {
                    code: "Warning",
                    message: "This is a warning",
                },
            ],
            disclaimers: ["hello"],
            estimated_delivery: "2025-12-15",
            guaranteed_delivery: true,
            carrier_specific: { hello: "world" },
            shipment_id: "abc123",
            tracking_number: "def456",
            label_uuid: "4a5fe80d-2c58-4e0b-97e7-db134d85e7f4",
            labelgenius_charge: "12.95",
            itemized_charges: [
                {
                    code: ChargeType.BASE_CHARGE,
                    carrier_charge_code: "Transport",
                    carrier_charge_description: "Transportation of package",
                    charge_amount: "10.00",
                },
                {
                    code: ChargeType.FUEL_SURCHARGE,
                    carrier_charge_code: "FUEL",
                    carrier_charge_description: "Fueld for transportation",
                    charge_amount: "2.95",
                },
            ],
            base_price: "10.00",
            total_price: "2.95",
            billing_weight: 5,
            // @ts-expect-error `label.zpl` won't actually be in response
            label: {
                png: {
                    mime_type: "image/png",
                    url: "https://test/image.png",
                    base64_encoded: "abcd",
                },
            },
        };

        const obj = new DomesticLabel<LabelFormat.PNG>(data);

        expect(obj).toBeInstanceOf(DomesticLabel);
        expect(obj.warnings[0]).toBeInstanceOf(CarrierWarning);
        expect(obj.itemized_charges[0]).toBeInstanceOf(ItemizedCharge);
        expect(obj.label).toBeInstanceOf(LabelImage);
        expect(obj).toEqual({
            ...data,
            label: {
                ...data.label,
                zpl: null,
            },
        });
    });

    it("constructs from the server response (zpl)", () => {
        const data: DomesticLabelInterface<LabelFormat.ZPL> = {
            __typename: "DomesticLabel",
            transaction_id: "4061d9d2-341e-4a7a-91e6-b11b7d1b4347",
            id: "123",
            carrier: CarrierName.UPS,
            service_code: "GND",
            account_number: null,
            warnings: [
                {
                    code: "Warning",
                    message: "This is a warning",
                },
            ],
            disclaimers: ["hello"],
            estimated_delivery: "2025-12-15",
            guaranteed_delivery: true,
            carrier_specific: { hello: "world" },
            shipment_id: "abc123",
            tracking_number: "def456",
            label_uuid: "4a5fe80d-2c58-4e0b-97e7-db134d85e7f4",
            labelgenius_charge: "12.95",
            itemized_charges: [
                {
                    code: ChargeType.BASE_CHARGE,
                    carrier_charge_code: "Transport",
                    carrier_charge_description: "Transportation of package",
                    charge_amount: "10.00",
                },
                {
                    code: ChargeType.FUEL_SURCHARGE,
                    carrier_charge_code: "FUEL",
                    carrier_charge_description: "Fueld for transportation",
                    charge_amount: "2.95",
                },
            ],
            base_price: "10.00",
            total_price: "2.95",
            billing_weight: 5,
            // @ts-expect-error `label.png` won't actually be in response
            label: {
                zpl: {
                    mime_type: "application/zpl",
                    url: "https://test/image.zpl",
                    base64_encoded: "abcd",
                },
            },
        };

        const obj = new DomesticLabel<LabelFormat.ZPL>(data);

        expect(obj).toBeInstanceOf(DomesticLabel);
        expect(obj.warnings[0]).toBeInstanceOf(CarrierWarning);
        expect(obj.itemized_charges[0]).toBeInstanceOf(ItemizedCharge);
        expect(obj.label).toBeInstanceOf(LabelImage);
        expect(obj).toEqual({
            ...data,
            label: {
                ...data.label,
                png: null,
            },
        });
    });

    it("parses delivery date", () => {
        const data: DomesticLabelInterface<LabelFormat.NONE> = {
            __typename: "DomesticLabel",
            transaction_id: "4061d9d2-341e-4a7a-91e6-b11b7d1b4347",
            id: "123",
            carrier: CarrierName.UPS,
            service_code: "GND",
            account_number: null,
            warnings: [
                {
                    code: "Warning",
                    message: "This is a warning",
                },
            ],
            disclaimers: ["hello"],
            estimated_delivery: "2025-12-15",
            guaranteed_delivery: true,
            carrier_specific: { hello: "world" },
            shipment_id: "abc123",
            tracking_number: "def456",
            label_uuid: "4a5fe80d-2c58-4e0b-97e7-db134d85e7f4",
            labelgenius_charge: "12.95",
            itemized_charges: [
                {
                    code: ChargeType.BASE_CHARGE,
                    carrier_charge_code: "Transport",
                    carrier_charge_description: "Transportation of package",
                    charge_amount: "10.00",
                },
                {
                    code: ChargeType.FUEL_SURCHARGE,
                    carrier_charge_code: "FUEL",
                    carrier_charge_description: "Fueld for transportation",
                    charge_amount: "2.95",
                },
            ],
            base_price: "10.00",
            total_price: "2.95",
            billing_weight: 5,
            label: null,
        };

        const obj = new DomesticLabel<LabelFormat.NONE>(data);

        expect(obj.getEstimatedDeliveryDate()?.fields).toEqual({
            year: 2025,
            month: 12,
            day: 15,
        });
    });

    it("handles null delivery date", () => {
        const data: DomesticLabelInterface<LabelFormat.NONE> = {
            __typename: "DomesticLabel",
            transaction_id: "4061d9d2-341e-4a7a-91e6-b11b7d1b4347",
            id: "123",
            carrier: CarrierName.UPS,
            service_code: "GND",
            account_number: null,
            warnings: [
                {
                    code: "Warning",
                    message: "This is a warning",
                },
            ],
            disclaimers: ["hello"],
            estimated_delivery: null,
            guaranteed_delivery: true,
            carrier_specific: { hello: "world" },
            shipment_id: "abc123",
            tracking_number: "def456",
            label_uuid: "4a5fe80d-2c58-4e0b-97e7-db134d85e7f4",
            labelgenius_charge: "12.95",
            itemized_charges: [
                {
                    code: ChargeType.BASE_CHARGE,
                    carrier_charge_code: "Transport",
                    carrier_charge_description: "Transportation of package",
                    charge_amount: "10.00",
                },
                {
                    code: ChargeType.FUEL_SURCHARGE,
                    carrier_charge_code: "FUEL",
                    carrier_charge_description: "Fueld for transportation",
                    charge_amount: "2.95",
                },
            ],
            base_price: "10.00",
            total_price: "2.95",
            billing_weight: 5,
            label: null,
        };

        const obj = new DomesticLabel<LabelFormat.NONE>(data);

        expect(obj.getEstimatedDeliveryDate()).toBeNull();
    });
});
