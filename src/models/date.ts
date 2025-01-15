const DATE_MATCHER = /^(\d{4})-(\d{2})-(\d{2})/; // no `$` so we can handle a datetime string

/** The fields of a date */
export interface DateFields {
    /** full year */
    readonly year: number;
    /** 1-12 month number */
    readonly month: number;
    /** 1-31 day-of-month number */
    readonly day: number;
}

/** Different representations of a date */
export class DateInformation {
    private readonly _date_fields: DateFields;

    /** The date as an ISO (yyyy-mm-dd) string */
    public get iso_date_string() {
        // TODO when Temporal is baseline, replace this function with this oneliner:
        // return this.temporal.toString();

        const year = String(this._date_fields.year);
        const month = String(this._date_fields.month).padStart(2, "0");
        const day = String(this._date_fields.day).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    /** The date as a {@link Date} object, with time set to midnight UTC */
    public get date() {
        return new Date(
            Date.UTC(
                this._date_fields.year,
                // why is javascript like this?
                this._date_fields.month - 1,
                this._date_fields.day,
            ),
        );
    }

    /**
     * The date as a {@link https://tc39.es/proposal-temporal/docs/plaindate.html | Temporal.PlainDate} object
     *
     * > [!WARNING]
     * >
     * > **At time of writing, Temporal is still Stage 3!**
     * >
     * > If you are using this in an environment where {@link https://tc39.es/proposal-temporal/docs | Temporal} is not in `globalThis`, it *will* just crash.
     * >
     *
     * @returns {@link https://tc39.es/proposal-temporal/docs/plaindate.html | Temporal.PlainDate}
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    public get temporal(): Temporal.PlainDate {
        // TODO this can be simplified a lot once Temporal is available

        if ("Temporal" in globalThis) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return (
                globalThis as unknown as {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Temporal: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        PlainDate: {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            from: (item: string) => Temporal.PlainDate;
                        };
                    };
                }
            ).Temporal.PlainDate.from(this.iso_date_string);
        }

        throw new Error("Temporal is not available");
    }

    /** The date as its constituent parts */
    public get fields(): DateFields {
        return { ...this._date_fields };
    }

    /** @hidden */
    constructor(iso_date_string: string) {
        const match = iso_date_string.match(DATE_MATCHER);

        if (!match) {
            throw Error(`Malformed ISO date string: '${iso_date_string}'`);
        }

        this._date_fields = {
            year: parseInt(match[1]),
            month: parseInt(match[2]),
            day: parseInt(match[3]),
        };
    }
}
