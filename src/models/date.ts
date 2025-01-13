const DATE_MATCHER = /(\d{4})-(\d{2})-(\d{2})/;

/** The fields of a date */
export interface DateFields {
    /** full year */
    year: number;
    /** 1-12 month number */
    month: number;
    /** 1-31 day-of-month number */
    day: number;
}

/** Different representations of a date */
export class DateInformation {
    private _date_fields: DateFields;

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
     * > [!TIP]
     * > The Typescript return type for this is currently {@link DateFields}.
     * > This is technically correct, as Temporal.PlainDate *is* a subset of that type.
     * >
     * > You can safely assert that it is a Temporal.PlainDate:
     * > ```typescript
     * > (date_information.temporal as Temporal.PlainDate).monthCode
     * > ```
     * >
     * > The marked return type will be updated as soon as Temporal is baseline available.
     *
     * @returns {@link https://tc39.es/proposal-temporal/docs/plaindate.html | Temporal.PlainDate}
     */
    public get temporal() {
        // TODO this can be simplified a lot once Temporal is available

        if ("Temporal" in globalThis) {
            return (
                globalThis as unknown as {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Temporal: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        PlainDate: {
                            from: (item: string) => DateFields;
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
