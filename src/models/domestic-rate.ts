import { JsonObject } from "../typescript-utils.js";
import CarrierWarning, { CarrierWarningInterface } from "./carrier-warning.js";
import { DateInformation } from "./date.js";
import DomesticRateResponse, { DomesticRateResponseInterface } from "./domestic-rate-response.js";
import ItemizedCharge, { ItemizedChargeInterface } from "./itemized-charge.js";
import RateClass from "./rate-class.js";

/**
 * Interface version of {@link DomesticRate}
 *
 * @internal
 */
export interface DomesticRateInterface extends DomesticRateResponseInterface {
    readonly __typename: "DomesticRate";

    /**
     * An id that can be used to select this rate for a shipment of the same package
     *
     * Only populated if `save_rates` was specified in rate request
     */
    readonly rate_id: string | null;

    /** A list of warnings for details that might affect the final rate */
    readonly warnings: readonly CarrierWarningInterface[];
    /** A list of disclaimers to be shown to the end-user */
    readonly disclaimers: readonly string[];
    /** The actual class of rate returned by the carrier */
    readonly actual_rate_class: RateClass;
    /**
     * The amount that would be charged to your account if shipping this package with this rate
     *
     * > [!IMPORTANT]
     * > If paying with a card, use {@link labelgenius_charge_with_card_fee} instead
     */
    readonly labelgenius_charge: `${number}`;
    /** Same as {@link labelgenius_charge} but if the payment is made with a card */
    readonly labelgenius_charge_with_card_fee: `${number}`;
    /** The base price for this option before extras. */
    readonly base_price: `${number}`;
    /** The total price for this option after extras. */
    readonly total_price: `${number}`;
    /** An itemized list of charges for this option */
    readonly itemized_charges: readonly ItemizedChargeInterface[];
    /**
     * When the package is estimated to arrive at its destination.
     *
     * > [!NOTE]
     * > This field is an ISO date string string.
     * > See {@link DomesticRate.estimated_delivery_date} value in other representations
     */
    readonly estimated_delivery: string | null;
    /** Whether the carrier has a guarantee regarding the delivery time. */
    readonly guaranteed_delivery: boolean | null;
    /**
     * The billing weight of the package; either the actual weight or dimensional weight as calculated by the carrier.
     *
     * Returned in the units requested (LBS by default)
     */
    readonly billing_weight: number;
    /** Extra information returned by specific carriers */
    readonly carrier_specific: JsonObject;
}

export default class DomesticRate extends DomesticRateResponse implements DomesticRateInterface {
    public readonly __typename = "DomesticRate" as const;
    public readonly rate_id: string | null;
    public readonly warnings: readonly CarrierWarning[];
    public readonly disclaimers: readonly string[];
    public readonly actual_rate_class: RateClass;
    public readonly labelgenius_charge: `${number}`;
    public readonly labelgenius_charge_with_card_fee: `${number}`;
    public readonly base_price: `${number}`;
    public readonly total_price: `${number}`;
    public readonly itemized_charges: readonly ItemizedCharge[];
    public readonly estimated_delivery: string | null;
    public readonly guaranteed_delivery: boolean | null;
    public readonly billing_weight: number;
    public readonly carrier_specific: JsonObject;

    /** @hidden */
    constructor(data: DomesticRateInterface) {
        super(data);
        this.rate_id = data.rate_id;
        this.warnings = data.warnings.map((warning) => new CarrierWarning(warning));
        this.disclaimers = data.disclaimers;
        this.actual_rate_class = data.actual_rate_class;
        this.labelgenius_charge = data.labelgenius_charge;
        this.labelgenius_charge_with_card_fee = data.labelgenius_charge_with_card_fee;
        this.base_price = data.base_price;
        this.total_price = data.total_price;
        this.itemized_charges = data.itemized_charges.map((charge) => new ItemizedCharge(charge));
        this.estimated_delivery = data.estimated_delivery;
        this.guaranteed_delivery = data.guaranteed_delivery;
        this.billing_weight = data.billing_weight;
        this.carrier_specific = data.carrier_specific;
    }

    /** {@link estimated_delivery} in other representations */
    public get estimated_delivery_date() {
        if (this.estimated_delivery == null) {
            return null;
        }
        return new DateInformation(this.estimated_delivery);
    }
}
