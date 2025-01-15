import { DatetimeFields, DatetimeInformation } from "./date-time";

describe("DatetimeInformation.fields", () => {
    it("throws an error on a malformed datetime string", () => {
        expect(() => new DatetimeInformation(":)")).toThrow();
    });

    it("handles full UTC datetimes", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789Z");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: 0,
        });
    });

    it("handles datetimes without a timezone", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: null,
        });
    });

    it("handles datetimes without fractional seconds", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0,
            utc_offset: null,
        });
    });

    it("handles datetimes without seconds", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 0,
            second_fraction: 0,
            utc_offset: null,
        });
    });

    it("handles datetimes without minutes", () => {
        const dt = new DatetimeInformation("2025-01-15T12");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 0,
            second: 0,
            second_fraction: 0,
            utc_offset: null,
        });
    });

    it("handles datetimes without minutes with timezone", () => {
        const dt = new DatetimeInformation("2025-01-15T12Z");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 0,
            second: 0,
            second_fraction: 0,
            utc_offset: 0,
        });
    });

    it("handles datetimes without time information", () => {
        const dt = new DatetimeInformation("2025-01-15");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 0,
            minute: 0,
            second: 0,
            second_fraction: 0,
            utc_offset: null,
        });
    });

    it("handles positive integer timezones", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+05");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: 5,
        });
    });

    it("handles negative integer timezones", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789-07");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: -7,
        });
    });

    it("handles positive fractional timezones", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+05:30");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: 5.5,
        });
    });

    it("handles negative fractional timezones", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789-05:30");

        expect(dt.fields).toEqual({
            year: 2025,
            month: 1,
            day: 15,
            hour: 12,
            minute: 34,
            second: 56,
            second_fraction: 0.789,
            utc_offset: -5.5,
        });
    });
});

describe("DatetimeInformation.iso_datetime_string", () => {
    it("handles full UTC datetime string", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789Z");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789+00:00");
    });

    it("handles datetime string with positive integer offset", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+01");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789+01:00");
    });

    it("handles datetime string with negative integer offset", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+07");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789+07:00");
    });

    it("handles datetime string with positive fractional offset", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+01:30");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789+01:30");
    });

    it("handles datetime string with negative fractional offset", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789+07:30");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789+07:30");
    });

    it("handles datetime string with no timezone", () => {
        const dt = new DatetimeInformation("2025-01-15T12:34:56.789");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:34:56.789");
    });

    it("handles datetime string with missing time information", () => {
        const dt = new DatetimeInformation("2025-01-15T12-07");

        expect(dt.iso_datetime_string).toBe("2025-01-15T12:00:00-07:00");
    });
});

describe("DatetimeInformation.temporal", () => {
    it("throws an error if Temporal is not in globalThis", () => {
        const info = new DatetimeInformation("2025-01-15T12:34:56Z");

        delete (globalThis as unknown as { Temporal?: object }).Temporal;
        expect(() => info.temporal).toThrow();
    });
    it("returns a PlainDateTime if there is no timezone information", () => {
        class MockPlainDateTime implements DatetimeFields {
            hour: number = 12;
            minute: number = 34;
            second: number = 56;
            second_fraction: number = 0.789;
            utc_offset: number | null = null;
            year: number = 2025;
            month: number = 1;
            day: number = 15;
        }

        (
            globalThis as unknown as {
                Temporal: {
                    PlainDateTime: {
                        from: (item: string) => MockPlainDateTime;
                    };
                };
            }
        ).Temporal = {
            PlainDateTime: {
                from: (item: string) => {
                    if (item !== "2025-01-15T12:34:56") {
                        throw new Error("Incorrect argument passed to Temporal.PlainDate");
                    }

                    return new MockPlainDateTime();
                },
            },
        };

        const { temporal } = new DatetimeInformation("2025-01-15T12:34:56");
        expect(temporal).toBeInstanceOf(MockPlainDateTime);
    });
    it("returns an Instant if there is timezone information", () => {
        class MockInstant implements DatetimeFields {
            hour: number = 12;
            minute: number = 34;
            second: number = 56;
            second_fraction: number = 0.789;
            utc_offset: number | null = 0;
            year: number = 2025;
            month: number = 1;
            day: number = 15;
        }

        (
            globalThis as unknown as {
                Temporal: {
                    Instant: {
                        from: (item: string) => MockInstant;
                    };
                };
            }
        ).Temporal = {
            Instant: {
                from: (item: string) => {
                    if (item !== "2025-01-15T12:34:56+00:00") {
                        throw new Error("Incorrect argument passed to Temporal.PlainDate");
                    }

                    return new MockInstant();
                },
            },
        };

        const { temporal } = new DatetimeInformation("2025-01-15T12:34:56Z");
        expect(temporal).toBeInstanceOf(MockInstant);
    });
});

describe("DatetimeInformation.date", () => {
    it("returns a Date with timezone information", () => {
        const { date } = new DatetimeInformation("2025-01-15T12:34:56");
        expect(date).toBeInstanceOf(Date);
        expect(date.valueOf()).toBe(new Date("2025-01-15T12:34:56").valueOf());
    });
    it("returns a Date without timezone information", () => {
        const { date } = new DatetimeInformation("2025-01-15T12:34:56Z");
        expect(date).toBeInstanceOf(Date);
        expect(date.valueOf()).toBe(new Date("2025-01-15T12:34:56+00:00").valueOf());
    });
});
