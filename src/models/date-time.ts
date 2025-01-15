// Doesn't support fraction-of-an-hour or fraction-of-a-minute options
// but I don't think the server ever sends those
// Sorry it's a little gross.
const DATETIME_MATCHER =
    /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})([T|\s](?<hour>\d{2})(:(?<minute>\d{2})(:(?<second>\d{2})(\.(?<fraction>\d+))?)?)?)?(?<timezone>Z|[+-]\d{2}(:\d{2})?)?$/i;

import { DateFields } from "./date";

/** The fields of a datetime */
export interface DatetimeFields extends DateFields {
    /** the 0-23 hour of the day */
    readonly hour: number;
    /** the 0-59 minute of the hour */
    readonly minute: number;
    /** the 0-59 second of the minute */
    readonly second: number;
    /** 0.0-0.999... faction of the second */
    readonly second_fraction: number;
    /** The offset from utc */
    readonly utc_offset: number | null;
}

/** Different representations */
export class DatetimeInformation {
    private readonly _datetime_fields: DatetimeFields;

    public get iso_datetime_string() {
        // TODO when Temporal is baseline, replace this function with this oneliner:
        // return this.temporal.toString();

        const year = String(this._datetime_fields.year);
        const month = String(this._datetime_fields.month).padStart(2, "0");
        const day = String(this._datetime_fields.day).padStart(2, "0");
        const hour = String(this._datetime_fields.hour).padStart(2, "0");
        const minute = String(this._datetime_fields.minute).padStart(2, "0");
        const second = String(this._datetime_fields.second).padStart(2, "0");
        const second_fraction = this._datetime_fields.second_fraction
            ? "." + String(this._datetime_fields.second_fraction).replace("0.", "")
            : "";

        let utc_offset: string;
        const utc_offset_hours = this._datetime_fields.utc_offset;
        if (utc_offset_hours === null) {
            utc_offset = "";
        } else {
            const hour_part = Math.trunc(utc_offset_hours);
            const minute_part = Math.round(Math.abs(utc_offset_hours - hour_part) * 60);
            const hour_part_string = (hour_part < 0 ? "-" : "+") + String(Math.abs(hour_part)).padStart(2, "0");
            const minute_part_string = String(minute_part).padStart(2, "0");
            utc_offset = `${hour_part_string}:${minute_part_string}`;
        }

        return `${year}-${month}-${day}T${hour}:${minute}:${second}${second_fraction}${utc_offset}`;
    }

    /**
     * The date as a {@link Date} object
     *
     * If no timezone is specified, local time is assumed
     */
    public get date() {
        return new Date(this.iso_datetime_string);
    }

    /**
     * The date as a
     * {@link https://tc39.es/proposal-temporal/docs/plaindatetime.html | `Temporal.PlainDateTime`}
     * or {@link https://tc39.es/proposal-temporal/docs/instant.html | `Temporal.Instant`}
     *
     * If `datetime.fields.utc_offset` is null, a `PlainDateTime` will be returned,
     * otherwise an `Instant` will be returned
     *
     * > [!WARNING]
     * >
     * > **At time of writing, Temporal is still Stage 3!**
     * >
     * > If you are using this in an environment where {@link https://tc39.es/proposal-temporal/docs | Temporal}
     * > is not in `globalThis`, it *will* just crash.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    public get temporal(): Temporal.PlainDateTime | Temporal.Instant {
        // TODO this can be simplified a lot once Temporal is available
        if ("Temporal" in globalThis) {
            if (this._datetime_fields.utc_offset === null) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return (
                    globalThis as unknown as {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Temporal: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            PlainDateTime: {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                from: (item: string) => Temporal.PlainDateTIme;
                            };
                        };
                    }
                ).Temporal.PlainDateTime.from(this.iso_datetime_string);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return (
                    globalThis as unknown as {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Temporal: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            Instant: {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                from: (item: string) => Temporal.Instant;
                            };
                        };
                    }
                ).Temporal.Instant.from(this.iso_datetime_string);
            }
        }

        throw new Error("Temporal is not available");
    }

    /** The datetime as its constituent parts */
    public get fields(): DatetimeFields {
        return { ...this._datetime_fields };
    }

    /** @hidden */
    constructor(iso_datetime_string: string) {
        // TODO this can be simplified a lot once Temporal is available

        const match = iso_datetime_string.match(DATETIME_MATCHER);

        if (!match) {
            throw new Error(`Malformed ISO datetime string: '${iso_datetime_string}'`);
        }

        const timezone = match.groups!.timezone as undefined | "z" | "Z" | `${"+" | "-"}${number}` | `${"+" | "-"}${number}:${number}`;

        let utc_offset: number | null = null;
        if (timezone?.toUpperCase() === "Z") {
            utc_offset = 0;
        } else if (timezone?.match(/^[+-]\d+$/)) {
            utc_offset = parseInt(timezone);
        } else {
            const timezone_parts = timezone?.match(/^(?<direction>[+-])(?<hour>\d+):(?<minute>\d+)$/);
            if (timezone_parts) {
                const offset_hours = parseInt(timezone_parts.groups!.hour);
                const offset_minutes = parseInt(timezone_parts.groups!.minute);
                const offset_direction = timezone_parts.groups!.direction as "+" | "-";

                const offset_total_hours = offset_hours + offset_minutes / 60;
                utc_offset = offset_direction === "-" ? -offset_total_hours : offset_total_hours;
            }
        }

        this._datetime_fields = {
            year: parseInt(match.groups!.year),
            month: parseInt(match.groups!.month),
            day: parseInt(match.groups!.day),
            hour: parseInt(match.groups!.hour ?? "00"),
            minute: parseInt(match.groups!.minute ?? "00"),
            second: parseInt(match.groups!.second ?? "00"),
            second_fraction: parseFloat("0." + (match.groups!.fraction ?? "0")),
            utc_offset,
        };
    }
}
