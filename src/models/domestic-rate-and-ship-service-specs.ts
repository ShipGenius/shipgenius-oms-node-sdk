import { GraphqlList, JsonObject, OneOf } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";

/** Which days count for determining the number of ship days */
export enum DayCountMethod {
    /** Use the actual number of days passed */
    TOTAL = "TOTAL",
    /** Exclude weekends and federal holidays from day count */
    BUSINESS = "BUSINESS",
}

/** Expect the package to arrive within a certain number of days */
export interface DeliverInDays extends JsonObject {
    /** The number of days to deliver within (integer) */
    days: number;
    /** Which days count for determining the number of ship days */
    count_method: DayCountMethod;
}

/** Expect the package to be delivered by a certain date */
export interface DeliverByDate extends JsonObject {
    /** The date to deliver by, in ISO format */
    date: string;
}

/**
 * A requirement that a package arrive by a certain date
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - {@link ShippingTimeFilterOption.deliver_in_days | `deliver_in_days`}
 * > - {@link ShippingTimeFilterOption.deliver_by | `deliver_by`}
 *
 * @internal
 */
export interface ShippingTimeFilterOption extends JsonObject {
    /** Expect the package to arrive within a certain number of days */
    deliver_in_days?: DeliverInDays;
    /** Expect the package to be delivered by a certain date */
    deliver_by?: DeliverByDate;
}

/**
 * A requirement that a package arrive by a certain date
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - {@link ShippingTimeFilterOption.deliver_in_days | `deliver_in_days`}
 * > - {@link ShippingTimeFilterOption.deliver_by | `deliver_by`}
 */
export type ShippingTimeFilter = OneOf<ShippingTimeFilterOption>;

/** A service's confidence of their delivery date */
export enum ShippingTimeGuaranteeLevel {
    /** Require that the carrier has a delivery date guarantee */
    GUARANTEED = "GUARANTEED",
    /** Require that the carrier has a delivery date estimate */
    ESTIMATED = "ESTIMATED",
}

/** Filters to remove certain rates from consideration.  */
export interface RateAndShipFilters extends JsonObject {
    /** Filter out any service that quotes a higher cost than this */
    max_cost?: `${number}` | null;
    /** Filter out any service that won't arrive before a certain time */
    shipping_time?: ShippingTimeFilter | null;
    /** Filter out services based on their confidence of delivery date */
    shipping_time_guarantee?: ShippingTimeGuaranteeLevel | null;
}

/** The metric to prioritize when selecting a service */
export enum RateAndShipPriority {
    /** Select the service with the soonest expected delivery date */
    FASTEST = "FASTEST",
    /** Select the cheapest service */
    CHEAPEST = "CHEAPEST",
}

/**
 * Information needed to specify a service for rate-and-ship
 */
export interface DomesticRateAndShipService extends JsonObject {
    /** The carrier to send shipments with */
    carrier: CarrierName;
    /**
     * The carrier service to send shipments with.
     *
     * See {@link "@shipgenius/oms".ShipGeniusOmsClient.getSupportedServices}
     * for a list of supported services for each carrier.
     */
    service_code: string;
    /**
     * The carrier account to purchase the label with.
     *
     * If left `null`, a Shipgenius-provided account will be
     * used, if available.
     */
    account_number?: string | null;
}

/** A list of carrier services and rules for how to select the best rate */
export default interface DomesticRateAndShipServiceSpecs extends JsonObject {
    /** The service or services to rate and consider for purchase */
    services: GraphqlList<DomesticRateAndShipService>;
    /** The metric to prioritize when selecting a service */
    priority: RateAndShipPriority;
    /**
     * Filters to remove certain rates from consideration.
     *
     * Useful if you would rather a shipment error out
     * and be handled manually if no services meet some criteria.
     */
    filters?: RateAndShipFilters | null;
}
