import { JsonObject } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";
import CarrierWarning, { CarrierWarningInterface } from "./carrier-warning.js";
import { DateInformation } from "./date.js";
import ItemizedCharge, { ItemizedChargeInterface } from "./itemized-charge.js";
import LabelFormat from "./label-format.js";
import LabelImage, { LabelImageInterface } from "./label-image.js";
import DomesticLabelResponse, { DomesticLabelResponseInterface } from "./domestic-label-response.js";

/**
 * Interface version of {@link DomesticLabel}
 *
 * @template Format The format to return the image in
 *
 * @internal
 */
export interface DomesticLabelInterface<Format extends LabelFormat = LabelFormat.NONE> extends DomesticLabelResponseInterface {
    __typename: "DomesticLabel";
    /**
     * The id of the label in the Shipgenius OMS database.
     *
     * Can be used in {@link "@shipgenius/oms/models".ShipmentIdentifierOption.labelgenius_id | ShipmentIdentifier.labelgenius_id}
     */
    readonly id: string;
    /** The carrier who is accepting the shipment */
    readonly carrier: CarrierName;
    /** The carrier service being used for the shipment */
    readonly service_code: string;
    /**
     * The carrier account being used for the shipment
     *
     * If `null`, a Shipgenius-provided account was used.
     * Otherwise, your own account was used.
     */
    readonly account_number: string | null;
    /**
     * A list of warnings the carrier issued about the shipment
     */
    readonly warnings: CarrierWarningInterface[];
    /** Disclaimers issued by the carrier about the shipment */
    readonly disclaimers: string[];
    /**
     * An ISO date specifying the expected delivery date
     *
     * See {@link DomesticLabel.getEstimatedDeliveryDate | getEstimatedDeliveryDate}
     * for this value in other representations.
     */
    readonly estimated_delivery: string | null;
    /** Whether the carrier is offering a guarntee on their delivery date */
    readonly guaranteed_delivery: boolean | null;
    /** Carrier-specific extra fields with metadata about the shipment */
    readonly carrier_specific: JsonObject;
    /**
     * The ID of the shipment in the carrier's system.
     *
     * For most carriers, this is the same value as the tracking number.
     */
    readonly shipment_id: string;
    /** The tracking number for the shipment */
    readonly tracking_number: string;
    /** The UUID that can be used to find the label in the `/media` endpoints */
    readonly label_uuid: string;
    /**
     * The amount charged by Shipgenius for the label.
     *
     * Includes card fees, but does not include fees charged directly
     * by carriers when using your own carrier account.
     *
     * > [!TIP]
     * > If you want the total price including what you're
     * > being charged by the carrier on your own account,
     * > see {@link total_price}
     */
    readonly labelgenius_charge: `${number}`;
    /**
     * An itemized list of charges for the label
     */
    readonly itemized_charges: ItemizedChargeInterface[];
    /**
     * The price for the shipment before extras and fees.
     */
    readonly base_price: `${number}`;
    /**
     * The total price for the shipment after extras, but not including card fees.
     *
     * > [!TIP]
     * > This is the total price for the shipment including charges
     * > from both the carrier and from Shipgenius.
     * >
     * > If you're looking for the price being charged by Shipgenius
     * > including card fees, see {@link labelgenius_charge}
     */
    readonly total_price: `${number}`;
    /**
     * The billed weight of the package.
     *
     * This is the greater of the package's physical weight and its dimensional weight.
     */
    readonly billing_weight: number;
    /**
     * An image of the label
     *
     * > [!NOTE]
     * > Fields here are dependent on what was selected as the label format
     * > in the call to fetch the label.
     * >
     * > By default, no label image is returned and this field is `null`.
     */
    readonly label: Format extends LabelFormat.NONE ? null : LabelImageInterface<Format>;
}

/**
 * A created shipping label.
 *
 * @template Format The format to return the image in
 */
export default class DomesticLabel<Format extends LabelFormat = LabelFormat.NONE>
    extends DomesticLabelResponse
    implements DomesticLabelInterface<Format>
{
    public readonly __typename = "DomesticLabel" as const;
    public readonly id: string;
    public readonly carrier: CarrierName;
    public readonly service_code: string;
    public readonly account_number: string | null;
    public readonly warnings: CarrierWarning[];
    public readonly disclaimers: string[];
    public readonly estimated_delivery: string | null;
    public readonly guaranteed_delivery: boolean | null;
    public readonly carrier_specific: JsonObject;
    public readonly shipment_id: string;
    public readonly tracking_number: string;
    public readonly label_uuid: string;
    public readonly labelgenius_charge: `${number}`;
    public readonly itemized_charges: ItemizedCharge[];
    public readonly base_price: `${number}`;
    public readonly total_price: `${number}`;
    public readonly billing_weight: number;
    public readonly label: Format extends LabelFormat.NONE ? null : LabelImage<Format>;

    /** @hidden */
    constructor(data: DomesticLabelInterface<Format>) {
        super(data);
        this.id = data.id;
        this.carrier = data.carrier;
        this.service_code = data.service_code;
        this.account_number = data.account_number;
        this.warnings = data.warnings.map((warning) => new CarrierWarning(warning));
        this.disclaimers = data.disclaimers;
        this.estimated_delivery = data.estimated_delivery;
        this.guaranteed_delivery = data.guaranteed_delivery;
        this.carrier_specific = data.carrier_specific;
        this.shipment_id = data.shipment_id;
        this.tracking_number = data.tracking_number;
        this.label_uuid = data.label_uuid;
        this.labelgenius_charge = data.labelgenius_charge;
        this.itemized_charges = data.itemized_charges.map((charge) => new ItemizedCharge(charge));
        this.base_price = data.base_price;
        this.total_price = data.total_price;
        this.billing_weight = data.billing_weight;
        this.label = (data.label ? new LabelImage<Format>(data.label as LabelImage<Format>) : null) as Format extends LabelFormat.NONE
            ? null
            : LabelImage<Format>;
    }

    /**
     * {@link estimated_delivery} in other representations
     */
    public getEstimatedDeliveryDate(): DateInformation | null {
        if (this.estimated_delivery === null) {
            return null;
        }
        return new DateInformation(this.estimated_delivery);
    }
}
