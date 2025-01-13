import { JsonObject, OneOf } from "../typescript-utils.js";

/**
 * A base class for other extra services
 */
export interface GenericExtraService extends JsonObject {
    /**
     * Optional description of the service
     *
     * This value has no effect on the result,
     * and is just here to prevent weird typing issues
     */
    description?: string | null;
}

/** Information required by USPS for insuring a package */
export interface UspsSpecificShipmentInsurance extends JsonObject {
    /**
     * Require the package to be signed for by the addressee
     *
     * @default false
     */
    restricted_delivery?: boolean;
}

/** Carrier-specific information needed for insuring a package */
export interface CarrierSpecificShipmentInsurance extends JsonObject {
    /** USPS-specific information needed for insuring a package */
    usps?: UspsSpecificShipmentInsurance;
}

/** Request pickup on a Saturday, if available. */
export interface SaturdayPickup extends GenericExtraService {}
/** Request Saturday delivery, if available. */
export interface SaturdayDelivery extends GenericExtraService {}
/** Request Sunday delivery, if available. */
export interface SundayDelivery extends GenericExtraService {}
/** Attempt to ship the package in a carbon-neutral way */
export interface CarbonNeutral extends GenericExtraService {}
/** Request the shipment not be forwarded if the recipient has a new address. */
export interface DisallowForwarding extends GenericExtraService {}
/** A request to insure a package */
export interface ShipmentInsurance extends GenericExtraService {
    /** Insurance information specific to a carrier */
    carrier_specific?: CarrierSpecificShipmentInsurance | null;
}

/**
 * Carrier services that apply to multiple carriers, but may be ignored by some carriers
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `saturday_pickup: ` {@link SaturdayPickup}
 * > - `saturday_delivery: ` {@link SaturdayDelivery}
 * > - `sunday_delivery: ` {@link SundayDelivery}
 * > - `carbon_neutral: ` {@link CarbonNeutral}
 * > - `disallow_forwarding: ` {@link DisallowForwarding}
 * > - `insurance: ` {@link ShipmentInsurance}
 *
 * @internal
 */
export interface CarrierDependentExtraServiceOption extends JsonObject {
    /** Request pickup on a Saturday, if available. */
    saturday_pickup?: SaturdayPickup;
    /** Request Saturday delivery, if available. */
    saturday_delivery?: SaturdayDelivery;
    /** Request Sunday delivery, if available. */
    sunday_delivery?: SundayDelivery;
    /** Request carbon-neutral shipping, if available. */
    carbon_neutral?: CarbonNeutral;
    /** Request the shipment not be forwarded if the recipient has a new address. */
    disallow_forwarding?: DisallowForwarding;
    /** Add insurance for the shipment, if available. */
    insurance?: ShipmentInsurance;
}

/**
 * Carrier services that apply to multiple carriers, but may be ignored by some carriers
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `saturday_pickup: ` {@link SaturdayPickup}
 * > - `saturday_delivery: ` {@link SaturdayDelivery}
 * > - `sunday_delivery: ` {@link SundayDelivery}
 * > - `carbon_neutral: ` {@link CarbonNeutral}
 * > - `disallow_forwarding: ` {@link DisallowForwarding}
 * > - `insurance: ` {@link ShipmentInsurance}
 */
export type CarrierDependentExtraService = OneOf<CarrierDependentExtraServiceOption>;

/**
 * A request for USPS Registered Mail
 *
 * @deprecated The USPS API currently doesn't support Registered Mail shipments,
 * despite supporting Registered Mail rating
 */
export interface UspsRegisteredMail extends GenericExtraService {
    /**
     * Set to `true` to require a signature from the addressee.
     *
     * @default false
     */
    restricted_delivery?: boolean;
}

/** Options for USPS Tracking Plus */
export enum UspsTrackingPlusOption {
    /** Keep tracking information for six months */
    SIX_MONTHS = "SIX_MONTHS",
    /** Keep tracking information for one year */
    ONE_YEAR = "ONE_YEAR",
    /** Keep tracking information for three years */
    THREE_YEARS = "THREE_YEARS",
    /** Keep tracking information for five years */
    FIVE_YEARS = "FIVE_YEARS",
    /** Keep tracking information for seven years */
    SEVEN_YEARS = "SEVEN_YEARS",
    /** Keep tracking information for ten years */
    TEN_YEARS = "TEN_YEARS",

    /** Keep signature information for three years */
    SIGNATURE_THREE_YEARS = "SIGNATURE_THREE_YEARS",
    /** Keep signature information for five years */
    SIGNATURE_FIVE_YEARS = "SIGNATURE_FIVE_YEARS",
    /** Keep signature information for seven years */
    SIGNATURE_SEVEN_YEARS = "SIGNATURE_SEVEN_YEARS",
    /** Keep signature information for ten years */
    SIGNATURE_TEN_YEARS = "SIGNATURE_TEN_YEARS",
}

/**
 * A request for [USPS Tracking Plus](https://faq.usps.com/s/article/USPS-Tracking-Plus-The-Basics)
 */
export interface UspsTrackingPlus extends GenericExtraService {
    /** The type of tracking plus to add to the request */
    option: UspsTrackingPlusOption;
}

/** A request for USPS Return Receipt */
export interface UspsReturnReceipt extends GenericExtraService {
    /**
     * Whether to request an electronic return receipt
     *
     * @default true
     */
    electronic?: boolean;
}

/**
 * A USPS-specific extra service
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `registered_mail: ` {@link UspsRegisteredMail}
 * > - `tracking_plus: ` {@link UspsTrackingPlus}
 * > - `return_receipt: ` {@link UspsReturnReceipt}
 *
 * @internal
 */
export interface UspsSpecificExtraServiceOption extends JsonObject {
    /**
     * USPS registered mail service.
     *
     * @deprecated The USPS API currently doesn't support Registered Mail shipments,
     * despite supporting Registered Mail rating
     */
    registered_mail?: UspsRegisteredMail;
    /** USPS tracking plus service */
    tracking_plus?: UspsTrackingPlus;
    /** USPS return receipt service */
    return_receipt?: UspsReturnReceipt;
}

/**
 * A USPS-specific extra service
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `registered_mail: ` {@link UspsRegisteredMail}
 * > - `tracking_plus: ` {@link UspsTrackingPlus}
 * > - `return_receipt: ` {@link UspsReturnReceipt}
 */
export type UspsSpecificExtraService = OneOf<UspsSpecificExtraServiceOption>;

/** Permission for the carrier to release a package without signature */
export interface CarrierRelease extends GenericExtraService {}

/** USPS-specific information about signing for a package */
export interface UspsSpecificSignatureMail extends JsonObject {
    /**
     * Set to `true` to require the addressee to be the one to sign for the package
     *
     * @default false
     */
    restricted_delivery?: boolean;
    /**
     * Set to `true` to request [USPS Certified Mail](https://faq.usps.com/s/article/Certified-Mail-The-Basics)
     *
     * @default false
     */
    certified_mail?: boolean;
}

/** FedEx-specific information about signing for a packages */
export interface FedexSpecificSignatureMail extends JsonObject {
    /**
     * Set to `true` to require the addressee to be the one to sign for the package
     *
     * @default false
     */
    direct?: boolean;
}

/** Carrier-specific information about signing for a package */
export interface CarrierSpecificSignatureMail extends JsonObject {
    /** USPS-specific information about signing for a package */
    usps?: UspsSpecificSignatureMail | null;
    /** FedEx-specific information about signing for a package */
    fedex?: FedexSpecificSignatureMail | null;
}

/** A request that a package must be signed for */
export interface SignatureMail extends GenericExtraService {
    /**
     * Set to `true` to require the package be signed for by an adult
     *
     * @default false
     */
    adult_signature_only?: boolean;
    /** Carrier-specific information about signing for the package */
    carrier_specific?: CarrierSpecificSignatureMail | null;
}

/**
 * Carrier services that apply to a specific carrier.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `usps: ` {@link UspsSpecificExtraService}
 *
 * @internal
 */
export interface CarrierSpecificExtraServiceOption extends JsonObject {
    /** The specific extra service options for USPS */
    usps?: UspsSpecificExtraService;
}

/**
 * Carrier services that apply to a specific carrier.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `usps: ` {@link UspsSpecificExtraService}
 */
export type CarrierSpecificExtraService = OneOf<CarrierSpecificExtraServiceOption>;

/**
 * A request for an extra service.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `carrier_release: ` {@link CarrierRelease}
 * > - `require_signature: ` {@link SignatureMail}
 * > - `carrier_dependent: ` {@link CarrierDependentExtraService}
 * > - `carrier_specific: ` {@link CarrierSpecificExtraService}
 * >
 *
 * @internal
 */
export interface ExtraServiceOption extends JsonObject {
    /** Permission for the carrier to release a package without signature */
    carrier_release?: CarrierRelease;
    /** A request that a package must be signed for */
    require_signature?: SignatureMail;
    /** Carrier services that apply to multiple carriers, but may be ignored by some carriers */
    carrier_dependent?: CarrierDependentExtraService;
    /** Carrier services that apply to a specific carrier */
    carrier_specific?: CarrierSpecificExtraService;
}

/**
 * A request for an extra service.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `carrier_release: ` {@link CarrierRelease}
 * > - `require_signature: ` {@link SignatureMail}
 * > - `carrier_dependent: ` {@link CarrierDependentExtraService}
 * > - `carrier_specific: ` {@link CarrierSpecificExtraService}
 * >
 */
type ExtraService = OneOf<ExtraServiceOption>;
export default ExtraService;
