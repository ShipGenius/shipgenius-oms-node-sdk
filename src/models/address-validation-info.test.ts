import AdditionalAddressInformation from "./additional-address-information";
import AddressValidationInfo, { AddressValidationInfoInterface } from "./address-validation-info";
import AddressValidationNote from "./address-validation-note";
import AddressValidationResponse from "./address-validation-response";
import CarrierErrorCode from "./carrier-error-code";
import DomesticAddress from "./domestic-address";
import MessageSeverity from "./message-severity";
import StateCode from "./state-code";

describe("AddressValidationInfo", () => {
    it("constructs from server response", () => {
        const data: AddressValidationInfoInterface = {
            __typename: "AddressValidationInfo",
            warnings: [
                {
                    severity: MessageSeverity.NOTE,
                    message: "This is a note",
                },
                {
                    severity: MessageSeverity.WARNING,
                    message: "This is a warning",
                },
            ],
            normalized_address: {
                state: StateCode.UT,
                zip_code: "84037",
                urbanization_code: null,
                street: ["553 N KAYS DR"],
                city: "KAYSVILLE",
            },
            original_address: {
                state: StateCode.NV,
                zip_code: "84036",
                urbanization_code: null,
                street: ["553 Kays Dr"],
                city: "Kaysville",
            },
            additional: {
                residential: false,
                occupied: true,
                known_address: true,
                known_secondary_address: true,
            },
        };

        const obj = new AddressValidationInfo(data);

        expect(obj).toBeInstanceOf(AddressValidationInfo);
        expect(obj).toBeInstanceOf(AddressValidationResponse);
        expect(obj.warnings[0]).toBeInstanceOf(AddressValidationNote);
        expect(obj.warnings[1]).toBeInstanceOf(AddressValidationNote);
        expect(obj.normalized_address).toBeInstanceOf(DomesticAddress);
        expect(obj.original_address).toBeInstanceOf(DomesticAddress);
        expect(obj.additional).toBeInstanceOf(AdditionalAddressInformation);

        expect(obj).toEqual(data);
    });
});
