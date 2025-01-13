import { JsonObject, OneOf } from "../typescript-utils.js";
import FullContactInformation from "./full-contact-information.js";
import WeightInput from "./weight-input.js";

/** How the hazmat is packaged */
export enum HazmatPackagingForm {
    /** The hazmat packaging is itself packaged */
    OVER_PACKED = "OVER_PACKED",
    /** The package directly contains the hazmat */
    ALL_PACKED_IN_ONE = "ALL_PACKED_IN_ONE",
}

/** Base class for hazmat information */
export interface GenericHazmat extends JsonObject {
    /**
     * A description of the hazmat
     *
     * This has no effect on the request and is only included to prevent weirdness with types.
     */
    description?: string | null;
}

/** Information UPS needs for dry ice shipments */
export interface UpsSpecificDryIceInfo extends JsonObject {
    /** Indicator for if the shipment is for medical use */
    medical_use: boolean;
}

/** Information specific carriers need for dry ice */
export interface CarrierSpecificDryIceInfo extends JsonObject {
    /** Information UPS needs for dry ice shipments */
    ups: UpsSpecificDryIceInfo | null;
}

/** Information needed to ship a package containing dry ice */
export interface HazmatDryIce extends GenericHazmat {
    /** The weight of the dry ice */
    weight: WeightInput;
    /** Information specific carriers need for dry ice */
    carrier_specific?: CarrierSpecificDryIceInfo | null;
}

/** The type of lithium battery */
export enum LithiumBatteryType {
    /** A lithium metal battery */
    LITHIUM_METAL = "LITHIUM_METAL",
    /** A lithium ion battery */
    LITHIUM_ION = "LITHIUM_ION",
}

/** How the lithium battery is packaged */
export enum LithiumBatteryContainment {
    /** The battery is contained within the equipment it's meant to power */
    CONTAINED_IN_EQUIPMENT = "CONTAINED_IN_EQUIPMENT",
    /** The battery is packed alongside the equipment it's meant to power */
    PACKED_WITH_EQUIPMENT = "PACKED_WITH_EQUIPMENT",
    /** The battery is not packed with the equipment it's meant to power */
    STAND_ALONE = "STAND_ALONE",
}

/** What condition the lithium battery is in */
export enum LithiumBatteryCondition {
    /** The battery is new */
    NEW = "NEW",
    /**
     * The batter is used, but is not damaged
     *
     * > [!CAUTION]
     * >
     * > **No carrier accepts damaged lithium batteries!**
     * >
     * > If you have damaged lithium batteries, do not send them through the mail.
     * > Check your local regulations to learn how to dispose of them properly.
     */
    USED_NOT_DAMAGED = "USED_NOT_DAMAGED",
}

/** Information needed to ship a package containing lithium batteries */
export interface HazmatLithiumBattery extends GenericHazmat {
    /** The type of lithium battery being shipped */
    battery_type: LithiumBatteryType;
    /** Where the lithium battery is contained in the packagge */
    containment: LithiumBatteryContainment;
    /** The condition of the lithium battery */
    condition: LithiumBatteryCondition;
    /** Whether the package has a lithium battery indicator label on the outside */
    marked: boolean;
}

/**
 * Magnets that can deflect a compass from 7 feet must be marked as hazmat for air shipments.
 *
 * Magnets that can deflect a compass from 15 feet may not be shipped via air.
 */
export interface HazmatMagnet extends GenericHazmat {}

/**
 * Hazardous materials in quantities low enough to be classified as
 * [Limited Quantity](https://www.ecfr.gov/current/title-49/section-172.315).
 *
 * This is generally <= 1.0 Liters for liquids and <= 2.0 Kilograms for solids.
 * However, please check the regulations regarding your specific materials.
 */
export interface HazmatLimitedQuantity extends GenericHazmat {
    /**
     * [ID8000 Consumer Commodities](https://www.ecfr.gov/current/title-49/section-173.167)
     * are Limited Quantity hazardous materials eligible for all modes of transportation.
     *
     * This generally covers materials that are allowed as cargo on a passanger aircraft.
     * However, please check the regulations regarding your specific materials.
     *
     * @default false
     */
    id8000?: boolean;
}

/** The class and division of the hazmat */
export enum HazmatDivision {
    /** Class 1 -- Explosives */
    CLASS_1 = "CLASS_1",
    /** Class 1, Division 1 -- Explosives With a Mass Explosion Hazard */
    DIVISION_1_1 = "DIVISION_1_1",
    /** Class 1, Division 2 -- Explosives With a Projection Hazard */
    DIVISION_1_2 = "DIVISION_1_2",
    /** Class 1, Division 3 -- Explosives With Predominately a Fire Hazard */
    DIVISION_1_3 = "DIVISION_1_3",
    /** Class 1, Division 4 -- Explosives With No Significant Blast Hazard */
    DIVISION_1_4 = "DIVISION_1_4",
    /** Class 1, Division 5 -- Explosives, Very Insensitive; Blasting Agents */
    DIVISION_1_5 = "DIVISION_1_5",
    /** Class 1, Division 6 -- Explosives, Extremely Insentitive */
    DIVISION_1_6 = "DIVISION_1_6",
    /** Class 2 -- Gases */
    CLASS_2 = "CLASS_2",
    /** Class 2, Division 1 -- Gases, Flammable */
    DIVISION_2_1 = "DIVISION_2_1",
    /** Class 2, Division 2 -- Gases, Non-Flammable, Compressed */
    DIVISION_2_2 = "DIVISION_2_2",
    /** Class 2, Division 3 -- Gases, Poisonous */
    DIVISION_2_3 = "DIVISION_2_3",
    /** Class 3 -- Flammable and Combustible Liquids */
    CLASS_3 = "CLASS_3",
    /** Class 4 -- Flammable Solids, Spontaneously Combustible Materials, */
    CLASS_4 = "CLASS_4",
    /** Class 4, Division 1 -- Flammable Solids */
    DIVISION_4_1 = "DIVISION_4_1",
    /** Class 4, Division 2 -- Spontaneously Combustible Materials */
    DIVISION_4_2 = "DIVISION_4_2",
    /** Class 4, Division 3 -- Dangerous When Wet Materials */
    DIVISION_4_3 = "DIVISION_4_3",
    /** Class 5 -- Oxidizers and Organic Peroxides */
    CLASS_5 = "CLASS_5",
    /** Class 5, Division 1 -- Oxidizers */
    DIVISION_5_1 = "DIVISION_5_1",
    /** Class 5, Division 2 -- Organic Peroxides */
    DIVISION_5_2 = "DIVISION_5_2",
    /** Class 6 -- Toxins and Biohazards */
    CLASS_6 = "CLASS_6",
    /** Class 6, Division 1 -- Toxins */
    DIVISION_6_1 = "DIVISION_6_1",
    /** Class 6, Division 2 -- Biohazards */
    DIVISION_6_2 = "DIVISION_6_2",
    /** Class 7 -- Radioactive Materials */
    CLASS_7 = "CLASS_7",
    /** Class 8 -- Corrosive Materials */
    CLASS_8 = "CLASS_8",
    /** Class 9 -- Miscellaneous Hazardous Material */
    CLASS_9 = "CLASS_9",
}

/**
 * A packing group specifying how dangerous the hazmat is
 */
export enum HazmatPackingGroup {
    /** Material does not have a packing group */
    NO_PACKING_GROUP = "NO_PACKING_GROUP",
    /** PGI -- Great Danger */
    PACKING_GROUP_I = "PACKINGING_GROUP_I",
    /** PGII -- Medium Danger */
    PACKING_GROUP_II = "PACKINGING_GROUP_II",
    /** PGIII -- Minor Danger */
    PACKING_GROUP_III = "PACKINGING_GROUPP_III",
}

/**
 * Hazardous materials in quantities low enough to be classified as
 * [Excepted Quantity](https://www.ecfr.gov/current/title-49/section-173.4a).
 *
 * The qualifications for this exception are very strict.
 * Please ensure that the package you are shipping qualifies.
 */
export interface HazmatExceptedQuantity extends GenericHazmat {
    /** The class and division of the hazmat */
    hazmat_division: HazmatDivision;
    /** A packing group specifying how dangerous the hazmat is */
    packing_group: HazmatPackingGroup;
    /** The name of the shipper */
    shipper_name: string;
}

/**
 * Hazardous materials in quantities low enough to be classified as
 * [Small Quantity](https://www.ecfr.gov/current/title-49/section-173.4)
 *
 * This is generally <= 30 Milliliters for liquids and <= 30 Grams for solids.
 * However, please check the regulations regarding your specific materials.
 */
export interface HazmatSmallQuantity extends GenericHazmat {}

/**
 * The compatibility group for Class 1 Hazardous Materials
 * as described in [49 CFR 173.52](https://www.ecfr.gov/current/title-49/section-173.52)
 */
export enum ClassOneCompatibilityGroup {
    /** Primary explosive substance */
    GROUP_A = "GROUP_A",
    /**
     * Article containing a primary explosive substance and not containing two or
     * more effective protective features. Some articles, such as detonators for blasting,
     * detonator assemblies for blasting and primers, cap-type, are included,
     * even though they do not contain primary explosives.
     */
    GROUP_B = "GROUP_B",
    /**
     * Propellant explosive substance or other deflagrating explosive substance
     * or article containing such explosive substance
     */
    GROUP_C = "GROUP_C",
    /**
     * Secondary detonating explosive substance or black powder or article containing
     * a secondary detonating explosive substance, in each case without means of initiation and
     * without a propelling charge, or article containing a primary explosive substance and
     * containing two or more effective protective features
     */
    GROUP_D = "GROUP_D",
    /**
     * Article containing a secondary detonating explosive substance, without means of initiation,
     * with a propelling charge (other than one containing flammable liquid or gel or hypergolic liquid)
     */
    GROUP_E = "GROUP_E",
    /**
     * Article containing a secondary detonating explosive substance with its means of initiation,"
     * with a propelling charge (other than one containing flammable liquid or gel or hypergolic liquid)"
     * or without a propelling charge
     */
    GROUP_F = "GROUP_F",
    /**
     * Pyrotechnic substance or article containing a pyrotechnic substance,
     * or article containing both an explosive substance and an illuminating, incendiary, tear-producing or
     * smoke-producing substance (other than a water-activated article or one containing white phosphorus,
     * phosphide or flammable liquid or gel or hypergolic liquid)
     */
    GROUP_G = "GROUP_G",
    /** Article containing both an explosive substance and white phosphorus */
    GROUP_H = "GROUP_H",
    /** Article containing both an explosive substance and flammable liquid or gel */
    GROUP_J = "GROUP_J",
    /** Article containing both an explosive substance and a toxic chemical agent */
    GROUP_K = "GROUP_K",
    /**
     * Explosive substance or article containing an explosive substance and presenting a special risk
     * (e.g., due to water-activation or presence of hybergolic liquids, phosphides or pyrophoric substances)
     * needing isolation of each type
     */
    GROUP_L = "GROUP_L",
    /** Articles predominantly containing extremely insensitive substances */
    GROUP_N = "GROUP_N",
    /**
     * Substance or article so packed or designed that any hazardous effects arising from accidental
     * functioning are limited to the extent that they do not significantly hinder or prohibit fire fighting
     * or other emergency response efforts in the immediate vicinity of the package
     */
    GROUP_S = "GROUP_S",
}

/** A measurement with arbitrary units */
export interface ArbitraryMeasurement extends JsonObject {
    /** A decimal measure in the units specified */
    measure: number | `${number}`;
    /** A unit of measure ('IN', 'CM', 'FT', etc...) */
    unit: string;
}

/** The hazmat container type for UPS */
export enum UpsPackagingType {
    /** Hazmat packaged in some other packaging */
    OTHER = "OTHER",

    /** Hazmat packaged in a fiberboard box */
    FIBERBOARD_BOX = "FIBERBOARD_BOX",
    /** Hazmat packaged in a wooden box */
    WOODEN_BOX = "WOODEN_BOX",
    /** Hazmat packaged in a wood box */
    WOOD_BOX = "WOOD_BOX",
    /** Hazmat packaged in a plastic jerrican */
    PLASTIC_JERRICAN = "PLASTIC_JERRICAN",
    /** Hazmat packaged in a metal box */
    METAL_BOX = "METAL_BOX",
    /** Hazmat packaged in a steel drum */
    STEEL_DRUM = "STEEL_DRUM",
    /** Hazmat packaged in a plastic box */
    PLASTIC_BOX = "PLASTIC_BOX",
    /** Hazmat packaged in a plastic drum */
    PLASTIC_DRUM = "PLASTIC_DRUM",
    /** Hazmat packaged in a styrofoam box */
    STYROFOAM_BOX = "STYROFOAM_BOX",
    /** Hazmat packaged in a cylinders */
    CYLINDERS = "CYLINDERS",
    /** Hazmat packaged in am envirotainer */
    ENVIROTAINER = "ENVIROTAINER",
    /** Hazmat packaged in a plywood box */
    PLYWOOD_BOX = "PLYWOOD_BOX",
    /** Hazmat packaged in an aluminum drum */
    ALUMINUM_DRUM = "ALUMINUM_DRUM",
    /** Hazmat packaged in aluminum cylinders */
    ALUMINUM_CYLINDERS = "ALUMINUM_CYLINDERS",
    /** Hazmat packaged in a plastic pail */
    PLASTIC_PAIL = "PLASTIC_PAIL",
    /** Hazmat packaged in a plywood drum */
    PLYWOOD_DRUM = "PLYWOOD_DRUM",
    /** Hazmat packaged in a fiber drum */
    FIBER_DRUM = "FIBER_DRUM",
    /** Hazmat packaged in a steel jerrican */
    STEEL_JERRICAN = "STEEL_JERRICAN",
    /** Hazmat packaged in an aluminum jerrican */
    ALUMINUM_JERRICAN = "ALUMINUM_JERRICAN",
    /** Hazmat packaged in a steel box */
    STEEL_BOX = "STEEL_BOX",
    /** Hazmat packaged in a carton */
    CARTON = "CARTON",
    /** Hazmat packaged in an aluminum box */
    ALUMINUM_BOX = "ALUMINUM_BOX",
}

/**
 * The allowed transportation mode for UPS
 */
export enum UpsTransportationMode {
    /** Package must be transported on highways */
    HIGHWAY = "HIGHWAY",
    /** Package must be transported by group methods */
    GROUND = "GROUND",
    /** Package may be transported on passenger aircraft */
    PASSENGER_AIRCRAFT = "PASSENGER_AIRCRAFT",
    /** Package may be transported on non-passenfer aircraft */
    CARGO_AIRCRAFT_ONLY = "CARGO_AIRCRAFT_ONLY",
}

/** Information only UPS needs for hazmat */
export interface UpsSpecificOtherHazmatInformation extends JsonObject {
    /** The number of items for which this hazmat declaration applies */
    count_of_items: number;
    /** Other Hazmat Divisions that apply to this material, other than the primary division */
    subrisk_hazmat_divisions?: HazmatDivision[];
    /**
     * Whether the quantity being shipped is considered reportable according to
     * [40 CFR 117.3](https://www.ecfr.gov/current/title-40/section-117.3).
     */
    reportable_quantity: boolean;
    /** The UNECE packaging code, if applicable */
    packaging_instruction_code?: string | null;
    /** The hazard labels applied to the shipment */
    hazard_labels_applied: string[];
    /** Notes about special provisions applied to the shipment */
    special_provision_remarks?: string | null;
    /** The type of packaging used for the material */
    packaging_type: UpsPackagingType;
    /** The mode of transport approved for the material */
    transportation_mode: UpsTransportationMode;
    /** A user-provided measurement with arbitrary units */
    quantity: ArbitraryMeasurement;
}

/** Information only specific carriers need for fully-regulated hazmat */
export interface CarrierSpecificOtherHazmatInformation extends JsonObject {
    /** UPS-specific information for hazmat */
    ups?: UpsSpecificOtherHazmatInformation;
}

/** Hazardous materials that are not classified as any other option. */
export interface HazmatOther extends GenericHazmat {
    /** The class and division of the hazmat */
    hazmat_division: HazmatDivision;
    /** The packing group of the hazmat */
    packing_group: HazmatPackingGroup;
    /** Technical/formal name of the material */
    technical_name?: string | null;
    /**
     * Proper name assigned in
     * [49 CFR 172.101](https://www.ecfr.gov/current/title-49/section-172.101),
     * Column 2
     */
    proper_name: string;
    /**
     * The UN, NA, or ID identification number of the material (including the 'UN'/'NA'/'ID') prefix.
     *
     * UN ids can be found in [49 CFR 172.101](https://www.ecfr.gov/current/title-49/section-172.101), Column 4
     */
    material_id_number: string;
    /**
     * Only applicable for Class 1 Hazardous Materials.
     *
     * The compatibility as described in [49 CFR 173.52](https://www.ecfr.gov/current/title-49/section-173.52)
     */
    compatibility_group?: ClassOneCompatibilityGroup | null;
    /** Information specific carriers need for hazmat shipping */
    carrier_specific?: CarrierSpecificOtherHazmatInformation | null;
}

/**
 * A hazardous material
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `dry_ice: ` {@link HazmatDryIce}
 * > - `lithium_battery: ` {@link HazmatLithiumBattery}
 * > - `magnetized: ` {@link HazmatMagnet}
 * > - `limited_quantity: ` {@link HazmatLimitedQuantity}
 * > - `excepted_quantity: ` {@link HazmatExceptedQuantity}
 * > - `small_quantity: ` {@link HazmatSmallQuantity}
 * > - `other: ` {@link HazmatOther}
 * >
 *
 * @internal
 */
export interface HazmatOption extends JsonObject {
    /** Information about a dry ice hazmat shipment */
    dry_ice?: HazmatDryIce;
    /** Information about a lithium battery hazmat shipment */
    lithium_battery?: HazmatLithiumBattery;
    /** Information about a magnetized hazmat shipment */
    magnetized?: HazmatMagnet;
    /** Information about a limited quantity hazmat shipment */
    limited_quantity?: HazmatLimitedQuantity;
    /** Information about an excepted quantity hazmat shipment */
    excepted_quantity?: HazmatExceptedQuantity;
    /** Information about a small quantity hazmat shipment */
    small_quantity?: HazmatSmallQuantity;
    /** Default value for other hazmat information */
    other?: HazmatOther;
}

/**
 * A hazardous material
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `dry_ice: ` {@link HazmatDryIce}
 * > - `lithium_battery: ` {@link HazmatLithiumBattery}
 * > - `magnetized: ` {@link HazmatMagnet}
 * > - `limited_quantity: ` {@link HazmatLimitedQuantity}
 * > - `excepted_quantity: ` {@link HazmatExceptedQuantity}
 * > - `small_quantity: ` {@link HazmatSmallQuantity}
 * > - `other: ` {@link HazmatOther}
 * >
 */
export type Hazmat = OneOf<HazmatOption>;

/** Information needed to ship hazardous materials */
export default interface HazmatInfo extends JsonObject {
    /** The full contact information required for a hazmat shipment */
    emergency_contact: FullContactInformation;
    /** How the hazmat is packaged */
    packaging_format: HazmatPackagingForm;
    /** A list of hazmat options for a shipment */
    materials: Hazmat[];
}
