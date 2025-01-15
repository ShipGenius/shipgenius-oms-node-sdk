import { JsonObject, OneOf } from "../typescript-utils.js";

/**
 * An ID for the shipment
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - {@link ShipmentIdentifierOption.labelgenius_id | `labelgenius_id: ID`}
 * > - {@link ShipmentIdentifierOption.shipment_id | `shipment_id: string`}
 * > - {@link ShipmentIdentifierOption.tracking_number | `tracking_number: string`}
 * > - {@link ShipmentIdentifierOption.dhl_package_id | `dhl_package_id: string`}
 *
 * @internal
 */
export interface ShipmentIdentifierOption extends JsonObject {
    /**
     * The ID of the shipment in the Shipgenius OMS database
     *
     * This value is returned in {@link "@shipgenius/oms/models".DomesticLabel.id | DomesticLabel.id}
     */
    labelgenius_id: string;
    /**
     * The shipment id, if supported by the carrier.
     *
     * If not supported by the carrier, this is the same as the tracking number
     */
    shipment_id: string;
    /** The tracking number assigned to the shipment by the carrier */
    tracking_number: string;
    /**
     * Only applicable to DHL packages.
     *
     * The package id printed on the label
     */
    dhl_package_id: string;
}

/**
 * An ID for the shipment
 *
 * > [!TIP]
 * > This maps to an input with a GraphQL {@link https://github.com/graphql/graphql-spec/pull/825 | @oneOf} directive.
 * >
 * > This means you have to specify *exactly one of* the keys:
 * > - {@link ShipmentIdentifierOption.labelgenius_id | `labelgenius_id: ID`}
 * > - {@link ShipmentIdentifierOption.shipment_id | `shipment_id: string`}
 * > - {@link ShipmentIdentifierOption.tracking_number | `tracking_number: string`}
 * > - {@link ShipmentIdentifierOption.dhl_package_id | `dhl_package_id: string`}
 *
 */
type ShipmentIdentifier = OneOf<ShipmentIdentifierOption>;
export default ShipmentIdentifier;
