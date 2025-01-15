/**
 * Interfaces and classes describing the input and output types for the API
 *
 * All output types are described by a class, while input types are an interface.
 *
 * Output types are also given interfaces, but these are meant mostly for internal use.
 *
 * @module @shipgenius/oms/models
 */

// GraphQL type classes
export { default as AdditionalAddressInformation } from "./additional-address-information.js";
export { default as AddressValidationError } from "./address-validation-error.js";
export { default as AddressValidationInfo } from "./address-validation-info.js";
export { default as AddressValidationNote } from "./address-validation-note.js";
export { default as AddressValidationResponse } from "./address-validation-response.js";
export { default as Address } from "./address.js";
export { default as BulkDomesticRateResponse } from "./bulk-domestic-rate-response.js";
export { default as CarrierList } from "./carrier-list.js";
export { default as CarrierServiceList } from "./carrier-service-list.js";
export { default as CarrierService } from "./carrier-service.js";
export { default as CarrierWarning } from "./carrier-warning.js";
export { default as Carrier } from "./carrier.js";
export { default as DomesticAddress } from "./domestic-address.js";
export { default as DomesticRateError } from "./domestic-rate-error.js";
export { default as DomesticRateResponse } from "./domestic-rate-response.js";
export { default as DomesticRate } from "./domestic-rate.js";
export { default as ItemizedCharge } from "./itemized-charge.js";
export { default as TrackingInformation } from "./tracking-information.js";
export { default as TrackingShipment } from "./tracking-shipment.js";
export { default as TrackingDeliveryInformation } from "./tracking-delivery-information.js";
export { default as DeliverySchedule } from "./delivery-schedule.js";
export { default as TrackingAddress } from "./tracking-address.js";
export { default as TrackingEvent } from "./tracking-event.js";
export { default as TrackingAddressAndContact } from "./tracking-address-and-contact.js";
export { default as TrackingContactInfo } from "./tracking-contact-info.js";
export { default as DeliveryWindow } from "./delivery-window.js";
export { default as TrackingStatus } from "./tracking-status.js";

// GraphQL type interfaces
export type { AdditionalAddressInformationInterface } from "./additional-address-information.js";
export type { AddressValidationErrorInterface } from "./address-validation-error.js";
export type { AddressValidationInfoInterface } from "./address-validation-info.js";
export type { AddressValidationNoteInterface } from "./address-validation-note.js";
export type { AddressValidationResponseInterface } from "./address-validation-response.js";
export type { AddressInterface } from "./address.js";
export type { BulkDomesticRateResponseInterface } from "./bulk-domestic-rate-response.js";
export type { CarrierListInterface } from "./carrier-list.js";
export type { CarrierServiceListInterface } from "./carrier-service-list.js";
export type { CarrierServiceInterface } from "./carrier-service.js";
export type { CarrierWarningInterface } from "./carrier-warning.js";
export type { CarrierInterface } from "./carrier.js";
export type { DomesticAddressInterface } from "./domestic-address.js";
export type { DomesticRateErrorInterface } from "./domestic-rate-error.js";
export type { DomesticRateResponseInterface } from "./domestic-rate-response.js";
export type { DomesticRateInterface } from "./domestic-rate.js";
export type { ItemizedChargeInterface } from "./itemized-charge.js";
export type { TrackingInformationInterface } from "./tracking-information.js";
export type { TrackingShipmentInterface } from "./tracking-shipment.js";
export type { TrackingDeliveryInformationInterface } from "./tracking-delivery-information.js";
export type { DeliveryScheduleInterface } from "./delivery-schedule.js";
export type { TrackingAddressInterface } from "./tracking-address.js";
export type { TrackingEventInterface } from "./tracking-event.js";
export type { TrackingAddressAndContactInterface } from "./tracking-address-and-contact.js";
export type { TrackingContactInfoInterface } from "./tracking-contact-info.js";
export type { DeliveryWindowInterface } from "./delivery-window.js";
export type { TrackingStatusInterface } from "./tracking-status.js";

// GraphQL inputs
export type { default as AdditionalDomesticInfoInput } from "./additional-domestic-info-input.js";
export type { default as AddressInput } from "./address-input.js";
export type { default as DomesticPackageRateInput } from "./domestic-package-rate-input.js";
export type { default as CarrierServiceRateInput } from "./carrier-service-rate-input.js";
export type { default as DomesticAddressInput } from "./domestic-address-input.js";
export type {
    default as HazmatInfo,
    Hazmat,
    HazmatOption,
    HazmatDryIce,
    HazmatLithiumBattery,
    HazmatMagnet,
    HazmatLimitedQuantity,
    HazmatExceptedQuantity,
    HazmatSmallQuantity,
    HazmatOther,
    GenericHazmat,
    CarrierSpecificDryIceInfo,
    UpsSpecificDryIceInfo,
    CarrierSpecificOtherHazmatInformation,
    UpsSpecificOtherHazmatInformation,
    ArbitraryMeasurement,
} from "./hazmat-info.js";
export type { default as DomesticRateInput } from "./domestic-rate-input.js";
export type {
    default as ExtraService,
    CarrierRelease,
    SignatureMail,
    CarrierDependentExtraService,
    CarrierSpecificExtraService,
    UspsSpecificExtraService,
    UspsRegisteredMail,
    UspsTrackingPlus,
    UspsReturnReceipt,
    SaturdayPickup,
    SaturdayDelivery,
    SundayDelivery,
    CarbonNeutral,
    DisallowForwarding,
    ShipmentInsurance,
    CarrierSpecificShipmentInsurance,
    UspsSpecificShipmentInsurance,
    CarrierSpecificSignatureMail,
    UspsSpecificSignatureMail,
    FedexSpecificSignatureMail,
    GenericExtraService,
    ExtraServiceOption,
    CarrierSpecificExtraServiceOption,
    CarrierDependentExtraServiceOption,
    UspsSpecificExtraServiceOption,
} from "./extra-service.js";
export type { default as FullContactInformation } from "./full-contact-information.js";
export type { default as FullDomesticAddressInput } from "./full-domestic-address-input.js";
export type { default as FullShipmentIdentifier } from "./full-shipment-identifier.js";
export type { default as LabelCarrierInput, UspsLabelInput, FedExLabelInput } from "./label-carrier-input.js";
export type { default as LengthInput } from "./length-input.js";
export type { default as Packaging, PackagingOption, BoxDimensions, BagDimensions, CarrierSpecificPackaging } from "./packaging.js";
export type { default as ShipmentIdentifier, ShipmentIdentifierOption } from "./shipment-identifier.js";
export type { default as WeightInput } from "./weight-input.js";
export type { Trackingsubscription, TrackingRecipient, PartiallySupportedTrackingSubscriptionOptions } from "./tracking-subscription.js";

// GraphQL enums
export { default as CarrierErrorCode } from "./carrier-error-code.js";
export { ShippingRegionType } from "./carrier-service.js";
export { CarrierName } from "./carrier.js";
export { UspsTrackingPlusOption } from "./extra-service.js";
export { default as LengthUnit } from "./length-unit.js";
export { default as RateClass } from "./rate-class.js";
export {
    HazmatPackagingForm,
    LithiumBatteryType,
    LithiumBatteryContainment,
    LithiumBatteryCondition,
    HazmatDivision,
    HazmatPackingGroup,
    ClassOneCompatibilityGroup,
    UpsPackagingType,
    UpsTransportationMode,
} from "./hazmat-info.js";
export { ChargeType } from "./itemized-charge.js";
export { UspsProcessingCategory, FedexPickupType } from "./label-carrier-input.js";
export { default as MessageSeverity } from "./message-severity.js";
export { default as StateCode } from "./state-code.js";
export { default as WeightUnit } from "./weight-unit.js";
export { default as TrackingStatusCode } from "./tracking-status-code.js";
export { default as VoidLabelResponse } from "./void-label-response.js";
export { TrackingNotificationLevel, ShipmentRelation as RelationToShipment } from "./tracking-subscription.js";
export { default as Locale } from "./locale.js";

// Scalar info
export { DateInformation } from "./date.js";
export type { DateFields } from "./date.js";
export { DatetimeInformation } from "./date-time.js";
export type { DatetimeFields } from "./date-time.js";
