import {
    AdditionalAddressInformation,
    AddressValidationError,
    AddressValidationInfo,
    AddressValidationNote,
    AddressValidationResponse,
    Address,
    BulkDomesticRateResponse,
    CarrierList,
    CarrierServiceList,
    CarrierService,
    CarrierWarning,
    Carrier,
    DomesticAddress,
    DomesticRateError,
    DomesticRateResponse,
    DomesticRate,
    ItemizedCharge,
    CarrierErrorCode,
    ShippingRegionType,
    CarrierName,
    DateInformation,
    WeightUnit,
    StateCode,
    MessageSeverity,
    FedexPickupType,
    UspsProcessingCategory,
    ChargeType,
    UpsTransportationMode,
    UpsPackagingType,
    ClassOneCompatibilityGroup,
    HazmatPackingGroup,
    HazmatDivision,
    LithiumBatteryCondition,
    LithiumBatteryContainment,
    LithiumBatteryType,
    HazmatPackagingForm,
    RateClass,
    LengthUnit,
    UspsTrackingPlusOption,
} from "./index";

describe("@shipgenius/oms/models", () => {
    it("exports expected objects", () => {
        // Classes
        expect(AdditionalAddressInformation).toBeDefined();
        expect(AddressValidationError).toBeDefined();
        expect(AddressValidationInfo).toBeDefined();
        expect(AddressValidationNote).toBeDefined();
        expect(AddressValidationResponse).toBeDefined();
        expect(Address).toBeDefined();
        expect(BulkDomesticRateResponse).toBeDefined();
        expect(CarrierList).toBeDefined();
        expect(CarrierServiceList).toBeDefined();
        expect(CarrierService).toBeDefined();
        expect(CarrierWarning).toBeDefined();
        expect(Carrier).toBeDefined();
        expect(DomesticAddress).toBeDefined();
        expect(DomesticRateError).toBeDefined();
        expect(DomesticRateResponse).toBeDefined();
        expect(DomesticRate).toBeDefined();
        expect(ItemizedCharge).toBeDefined();

        // Enums
        expect(CarrierErrorCode).toBeDefined();
        expect(ShippingRegionType).toBeDefined();
        expect(CarrierName).toBeDefined();
        expect(UspsTrackingPlusOption).toBeDefined();
        expect(LengthUnit).toBeDefined();
        expect(RateClass).toBeDefined();
        expect(HazmatPackagingForm).toBeDefined();
        expect(LithiumBatteryType).toBeDefined();
        expect(LithiumBatteryContainment).toBeDefined();
        expect(LithiumBatteryCondition).toBeDefined();
        expect(HazmatDivision).toBeDefined();
        expect(HazmatPackingGroup).toBeDefined();
        expect(ClassOneCompatibilityGroup).toBeDefined();
        expect(UpsPackagingType).toBeDefined();
        expect(UpsTransportationMode).toBeDefined();
        expect(ChargeType).toBeDefined();
        expect(UspsProcessingCategory).toBeDefined();
        expect(FedexPickupType).toBeDefined();
        expect(MessageSeverity).toBeDefined();
        expect(StateCode).toBeDefined();
        expect(WeightUnit).toBeDefined();

        // Scalars
        expect(DateInformation).toBeDefined();
    });
});
