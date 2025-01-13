import { DateFields, DateInformation } from "./date";

describe("DateInformation", () => {
    it("throws an error for a malformed date", () => {
        expect(() => new DateInformation("2025-10")).toThrow();
    });

    it("normalizes the date string", () => {
        const { iso_date_string } = new DateInformation("2025-01-13T16:18:23Z");
        expect(iso_date_string).toBe("2025-01-13");
    });

    it("can create a js Date object", () => {
        const { date } = new DateInformation("2025-01-13T16:18:23Z");
        expect(date).toBeInstanceOf(Date);
        expect(date.toISOString()).toMatch(/^2025\-01\-13T00:00:00(\.0+)?Z$/i);
    });

    it("can pull out the date fields", () => {
        const { fields } = new DateInformation("2025-01-13T16:18:23Z");
        expect(fields).toEqual({
            year: 2025,
            month: 1,
            day: 13,
        });
    });

    it("throws an error in Temporal is not available when getting Temporal object", () => {
        const info = new DateInformation("2025-01-13T16:18:23Z");

        delete (globalThis as unknown as { Temporal?: object }).Temporal;
        expect(() => info.temporal).toThrow();
    });

    it("can convert to a Temporal PlainDate object", () => {
        class MockPlainDate implements DateFields {
            year: number = 2025;
            month: number = 1;
            day: number = 13;
        }

        (
            globalThis as unknown as {
                Temporal: {
                    PlainDate: {
                        from: (item: string) => DateFields;
                    };
                };
            }
        ).Temporal = {
            PlainDate: {
                from: (item: string) => {
                    if (item !== "2025-01-13") {
                        throw new Error("Incorrect argument passed to Temporal.PlainDate");
                    }

                    return new MockPlainDate();
                },
            },
        };

        const { temporal } = new DateInformation("2025-01-13T16:18:23Z");
        expect(temporal).toBeInstanceOf(MockPlainDate);
    });
});
