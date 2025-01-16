import { JsonObject } from "../typescript-utils.js";
import Locale from "./locale.js";

/**
 * Where to send tracking information to.
 *
 * Note that this is technically a oneOf field,
 * but there is only one option at the moment,
 * so it was simpler to implement as this.
 *
 * If more options are added, `TrackingRecipient`
 * will become a `OneOf` type, and a new
 * `TrackingRecipientOption` will be created
 * with the various options.
 *
 * This would be a backwards-compatible change.
 */
export interface TrackingRecipient extends JsonObject {
    /** The email address to send notifications to */
    email: string;
}

/** The subscriber's relation to the shipping of the package */
export enum ShipmentRelation {
    /** The subscriber is the one who sent the package */
    SHIPPER = "SHIPPER",
    /** The subscriber is the recipient of the package */
    RECIPIENT = "RECIPIENT",
    /** The subscriber is a customs broker */
    BROKER = "BROKER",
    /** The subscriber is a different third party to the shipment */
    OTHER = "OTHER",
}

/** Additional options that may be ignored depending on which carrier the request is sent to. */
export interface PartiallySupportedTrackingSubscriptionOptions extends JsonObject {
    /**
     * The email address to show as the sender of notification emails.
     *
     * > [!WARNING]
     * > This may require special DNS settings to
     * > prevent the emails being marked as spoofed.
     * >
     * > Only set this field if you know what you are doing.
     */
    reply_to_address?: string | null;
    /**
     * The name to show as the sender of notification emails.
     */
    from_name?: string | null;
    /**
     * The subject line to use on the notification emails
     */
    subject?: string | null;
    /**
     * Text to add to email notification bodies
     */
    memo?: string | null;
    /** The language and dialect to send the email in */
    locale?: Locale | null;
    /** The subscriber's relation to the shipping of the package */
    relation_to_shipment?: ShipmentRelation | null;
}

/**
 * The types of events that will trigger notifications
 */
export enum TrackingNotificationLevel {
    /** Subscribe to all tracking updates */
    VERBOSE = "VERBOSE",
    /** Subscribe only to events that require attention */
    ALERTS_ONLY = "ALERTS_ONLY",
}

/** Information needed to subscribe to tracking events */
export interface Trackingsubscription extends JsonObject {
    /** Where to send tracking notifications to */
    recipient: TrackingRecipient;
    /**
     * The first name of the subscriber,
     * which may get displayed in notifications
     */
    recipient_first_name?: string | null;
    /**
     * The last name of the subscriber,
     * which may get displayed in notifications
     */
    recipient_last_name?: string | null;
    /**
     * The types of events that will trigger notifications
     */
    level: TrackingNotificationLevel;
    /**
     * Extra parameters for the notification that
     * only some carriers and services support
     */
    carrier_dependent?: PartiallySupportedTrackingSubscriptionOptions | null;
}
