import BulkDomesticLabelResponse, { BulkDomesticLabelResponseInterface } from "./bulk-domestic-label-response";
import { CarrierName } from "./carrier";
import DomesticLabel from "./domestic-label";
import DomesticLabelError, { DomesticLabelErrorInterface } from "./domestic-label-error";
import DomesticLabelResponse from "./domestic-label-response";
import { ChargeType } from "./itemized-charge";
import LabelFormat from "./label-format";

describe("BulkDomesticLabelResponse", () => {
    it("constructs from the server response", () => {
        const data: BulkDomesticLabelResponseInterface<LabelFormat.NONE> = {
            batch_id: "e73a5a13-cba2-49c8-a202-c4d016f26663",
            batch_pdf_url: "https://test/batch/e73a5a13-cba2-49c8-a202-c4d016f26663.pdf",
            labels: [
                {
                    __typename: "DomesticLabelError",
                    transaction_id: "71aca75d-60dd-4171-b32e-107f22599f0c",
                    code: "ERROR",
                    message: "Something went wrong",
                },
                {
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
                },
            ],
        };

        const obj = new BulkDomesticLabelResponse(data);

        expect(obj).toBeInstanceOf(BulkDomesticLabelResponse);
        expect(obj.labels[0]).toBeInstanceOf(DomesticLabelError);
        expect(obj.labels[0]).not.toBeInstanceOf(DomesticLabel);
        expect(obj.labels[1]).toBeInstanceOf(DomesticLabel);
        expect(obj.labels[1]).not.toBeInstanceOf(DomesticLabelError);

        expect(obj).toEqual(data);
    });
});
