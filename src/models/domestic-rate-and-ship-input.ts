import { JsonObject } from "../typescript-utils.js";
import AdditionalDomesticInfoInput from "./additional-domestic-info-input.js";
import DomesticPackageLabelInput from "./domestic-package-label-input.js";
import DomesticRateAndShipServiceSpecs from "./domestic-rate-and-ship-service-specs.js";
import LabelCarrierInput from "./label-carrier-input.js";
import OrderInfo from "./order-info.js";

/** Information needed to run rate-and-ship */
export default interface DomesticRateAndShipInput extends JsonObject {
    /**
     * A UUID that uniquely identifies this shipment.
     *
     * This ID can be used in {@link "@shipgenius/oms".ShipGeniusOmsClient.recoverLabel | ShipGeniusOmsClient.recoverLabel}
     * to recover the label if the label is lost in the transaction.
     *
     * > [!WARNING]
     * >
     * > This ID **must** be a UUID and **must** be unique.
     * > If either of these assumptions are not met, and error will be returned.
     * >
     * > You can use {@link https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID | crypto.randomUUID}
     * > to generate UUIDs
     *
     */
    transaction_id: string;
    /** The package to be shipped */
    package: DomesticPackageLabelInput;
    /** Specify a different service-selection rule than the default for the batch */
    override_service?: DomesticRateAndShipServiceSpecs | null;
    /** Additional information about the package */
    additional?: AdditionalDomesticInfoInput | null;
    /** Shipment information only needed/supported by specific carriers */
    carrier_specific?: LabelCarrierInput | null;
    /** Additional information and requests for the shipment */
    order_info?: OrderInfo | null;
}
