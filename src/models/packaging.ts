import { JsonObject, OneOf } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";
import LengthInput from "./length-input.js";

/** A custom rigid corrugated box used for packaging */
export interface BoxDimensions extends JsonObject {
    /** The length of the package */
    length: LengthInput;
    /** The width of the package */
    width: LengthInput;
    /** The height of the package */
    height: LengthInput;
}
/** A custom bag (soft or polybag) used for packaging */
export interface BagDimensions extends BoxDimensions {
    /** The girth of the package (widest circumference perpendicular to the longest axis) */
    girth: LengthInput;
}
/** A carrier specific packaging code is used instead of a custom bag or box */
export interface CarrierSpecificPackaging extends JsonObject {
    /** The carrier that takes the packaging */
    carrier: CarrierName;
    /**
     * The package code of the carrier-specific packaging
     *
     * See TODO
     */
    package_code: string;
    /** The girth of the packaging when filled, if the packaging is a bag/envelope */
    girth?: LengthInput | null;
}

/**
 * The type and dimensions of the packaging used.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `custom_box: ` {@link BoxDimensions | `BoxDimensions`}
 * > - `custom_bag: ` {@link BagDimensions | `BagDimensions`}
 * > - `carrier_specific: ` {@link CarrierSpecificPackaging | `CarrierSpecificPackaging`}
 *
 * @internal
 */
export type PackagingOption = {
    /** A custom rigid corrugated box used for packaging */
    custom_box?: BoxDimensions;
    /** A custom bag (soft or polybag) used for packaging */
    custom_bag?: BagDimensions;
    /** A carrier specific packaging code is used instead of a custom bag or box */
    carrier_specific?: CarrierSpecificPackaging;
};

/**
 * The type and dimensions of the packaging used.
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - `custom_box: ` {@link BoxDimensions | `BoxDimensions`}
 * > - `custom_bag: ` {@link BagDimensions | `BagDimensions`}
 * > - `carrier_specific: ` {@link CarrierSpecificPackaging | `CarrierSpecificPackaging`}
 */
type Packaging = OneOf<PackagingOption>;

export default Packaging;
