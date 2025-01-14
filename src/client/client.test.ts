import AddressValidationError from "../models/address-validation-error";
import AddressValidationInfo from "../models/address-validation-info";
import BulkDomesticRateResponse from "../models/bulk-domestic-rate-response";
import Carrier, { CarrierName } from "../models/carrier";
import CarrierService from "../models/carrier-service";
import LengthUnit from "../models/length-unit";
import RateClass from "../models/rate-class";
import StateCode from "../models/state-code";
import WeightUnit from "../models/weight-unit";
import ShipGeniusOmsClient from "./client";
import { GraphqlError, HttpError, ServerEnvironment } from "./client-types";

describe("ShipGeniusOmsClient", () => {
    let original_fetch = globalThis.fetch;
    afterEach(() => {
        globalThis.fetch = original_fetch;
    });

    it("handles connecting to a literal url", () => {
        const client = new ShipGeniusOmsClient("abc123", { url: "https://api.test" });

        expect(client.url).toBe("https://api.test");
    });

    it("handles connecting to an environment", () => {
        const client = new ShipGeniusOmsClient("abc123", { environment: ServerEnvironment.PRODUCTION });

        expect(client.url).toBe("https://api.lite.shipgeni.us");
    });

    it("defaults to latest API version", () => {
        const client = new ShipGeniusOmsClient("abc123", { url: "https://api.test" });

        expect(client.version).toBe("latest");
    });

    it("allows setting API version", () => {
        const client = new ShipGeniusOmsClient("abc123", { url: "https://api.test" }, { version: "v2_5" });

        expect(client.version).toBe("v2_5");
    });

    it("handles passed in query parameters as a dictionary", () => {
        // NOTE This is a test of a private method.
        // If this test is failing, it doesn't necessarily
        // mean the the API was broken.

        // TODO remove this test when it's replaced
        // by a test of a public method that uses query params

        class Test extends ShipGeniusOmsClient {
            public getProcessedUrl() {
                return this["processUrl"]("/some-endpoint", false, {
                    param: "test",
                    list_value: ["hello", "world"],
                });
            }
        }

        const client = new Test("abc123", { url: "https://api.test" });

        expect(client.getProcessedUrl()).toBe("https://api.test/latest/some-endpoint?param=test&list_value=hello&list_value=world");
    });

    it("handles passed in query parameters as a URLSearchParams", () => {
        // NOTE This is a test of a private method.
        // If this test is failing, it doesn't necessarily
        // mean the the API was broken.

        // TODO remove this test when it's replaced
        // by a test of a public method that uses query params

        class Test extends ShipGeniusOmsClient {
            public getProcessedUrl() {
                return this["processUrl"](
                    "/some-endpoint",
                    false,
                    new URLSearchParams([
                        ["param", "test"],
                        ["list_value", "hello"],
                        ["list_value", "world"],
                    ]),
                );
            }
        }

        const client = new Test("abc123", { url: "https://api.test" });

        expect(client.getProcessedUrl()).toBe("https://api.test/latest/some-endpoint?param=test&list_value=hello&list_value=world");
    });

    it("handles merging params from path", () => {
        // NOTE This is a test of a private method.
        // If this test is failing, it doesn't necessarily
        // mean the the API was broken.

        // TODO remove this test when it's replaced
        // by a test of a public method that uses query params

        class Test extends ShipGeniusOmsClient {
            public getProcessedUrl() {
                return this["processUrl"]("/some-endpoint?extra=more", false, {
                    param: "test",
                    list_value: ["hello", "world"],
                });
            }
        }

        const client = new Test("abc123", { environment: ServerEnvironment.PRODUCTION });

        expect(client.getProcessedUrl()).toBe(
            "https://api.lite.shipgeni.us/latest/some-endpoint?param=test&list_value=hello&list_value=world&extra=more",
        );
    });

    it("fetches a list of supported carriers", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/latest/carrier/list");
            expect(args).toEqual({
                body: undefined,
                headers: {
                    Authorization: "Bearer abc123",
                },
                method: "GET",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        carriers: [
                            {
                                id: "123",
                                name: "USPS",
                                description: "This is USPS",
                            },
                        ],
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("abc123", { url: "https://api.test" });
        const { carriers } = await client.getSupportedCarriers();
        expect(carriers.length).toBe(1);
        expect(carriers[0]).toBeInstanceOf(Carrier);
        expect(carriers[0]).toEqual({
            id: "123",
            name: CarrierName.USPS,
            description: "This is USPS",
        });

        expect(fetch_expectations_passed).toBe(true);
    });

    it("handles http errors when fetching a list of supported carriers", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.lite.shipgeni.us/v2_5/carrier/list");
            expect(args).toEqual({
                body: undefined,
                headers: {
                    Authorization: "Bearer def456",
                },
                method: "GET",
            });

            fetch_expectations_passed = true;

            return {
                ok: false,
                json: async () => {
                    return {};
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { environment: ServerEnvironment.PRODUCTION }, { version: "v2_5" });
        expect(async () => await client.getSupportedCarriers()).rejects.toThrow(HttpError);
        expect(fetch_expectations_passed).toBe(true);
    });

    it("fetches a list of supported carrier services", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/latest/carrier/service/list");
            expect(args).toEqual({
                body: undefined,
                headers: {
                    Authorization: "Bearer abc123",
                },
                method: "GET",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        services: [
                            {
                                id: "123",
                                name: "UPS Ground",
                                code: "GND",
                                enabled_for_retail_user: true,
                                shipping_region_type: "US_DOMESTIC",
                                description: "UPS Ground Service",
                                carrier: {
                                    id: "100",
                                    name: "UPS",
                                    description: "This is UPS",
                                },
                            },
                        ],
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("abc123", { url: "https://api.test" });
        const { services } = await client.getSupportedServices();
        expect(services.length).toBe(1);
        expect(services[0]).toBeInstanceOf(CarrierService);
        expect(services[0]).toEqual({
            carrier: {
                description: "This is UPS",
                id: "100",
                name: "UPS",
            },
            code: "GND",
            description: "UPS Ground Service",
            enabled_for_retail_user: true,
            id: "123",
            name: "UPS Ground",
            shipping_region_type: "US_DOMESTIC",
        });

        expect(fetch_expectations_passed).toBe(true);
    });

    it("handles http errors when fetching a list of supported carrier services", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.lite.shipgeni.us/latest/carrier/service/list");
            expect(args).toEqual({
                body: undefined,
                headers: {
                    Authorization: "Bearer def456",
                },
                method: "GET",
            });

            fetch_expectations_passed = true;

            return {
                ok: false,
                json: async () => {
                    return {};
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { environment: ServerEnvironment.PRODUCTION });
        expect(async () => await client.getSupportedServices()).rejects.toThrow(HttpError);
        expect(fetch_expectations_passed).toBe(true);
    });

    it("handles GraphQL requests", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: { query: "query Test($value: Boolean!) { hello(value: $value) }", variables: { value: true } },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            hello: "world",
                        },
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });
        const response = await client.runGraphql("query Test($value: Boolean!) { hello(value: $value) }", { value: true });

        expect(fetch_expectations_passed).toBe(true);
        expect(response).toEqual({
            hello: "world",
        });
    });

    it("handles GraphQL errors", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: { query: "query Test($value: Boolean!) { hello(value: $value) }", variables: { value: true } },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            hello: "world",
                        },
                        errors: [
                            {
                                message: "I don't like this request",
                            },
                        ],
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });

        let exception_thrown = false;
        try {
            await client.runGraphql("query Test($value: Boolean!) { hello(value: $value) }", { value: true });
        } catch (err) {
            if (err instanceof GraphqlError) {
                exception_thrown = true;

                expect(err.message).toBe("I don't like this request");
            }
        }

        expect(fetch_expectations_passed).toBe(true);
        expect(exception_thrown).toBe(true);
    });

    it("handles empty GraphQL responses", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: { query: "query Test($value: Boolean!) { hello(value: $value) }", variables: { value: true } },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {};
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });

        expect(
            async () => await client.runGraphql("query Test($value: Boolean!) { hello(value: $value) }", { value: true }),
        ).rejects.toThrow(GraphqlError);

        expect(fetch_expectations_passed).toBe(true);
    });
    it("handles empty GraphQL http errors", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: { query: "query Test($value: Boolean!) { hello(value: $value) }", variables: { value: true } },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: false,
                json: async () => {
                    return {};
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });

        expect(
            async () => await client.runGraphql("query Test($value: Boolean!) { hello(value: $value) }", { value: true }),
        ).rejects.toThrow(HttpError);

        expect(fetch_expectations_passed).toBe(true);
    });

    it("validates addresses", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: {
                    documentId: "ValidateAddress",
                    variables: {
                        address: [
                            {
                                city: "City One",
                                state: "UT",
                                street: "123 Sesame Street",
                                zip_code: "84037",
                            },
                            {
                                city: "City Two",
                                state: "NY",
                                street: ["345 Sesame St", "#101"],
                                zip_code: "12345",
                            },
                        ],
                        zip_plus_four: true,
                    },
                },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            address_validation: [
                                {
                                    __typename: "AddressValidationInfo",
                                    warnings: [
                                        {
                                            severity: "NOTE",
                                            message: "Spelling changed",
                                        },
                                    ],
                                    original_address: {
                                        city: "City One",
                                        state: "UT",
                                        zip_code: "84037",
                                        street: "123 Sesame Street",
                                        urbanization_code: null,
                                    },
                                    normalized_address: {
                                        city: "CITY ONE",
                                        state: "UT",
                                        zip_code: "84037-1234",
                                        street: "123 SESAME ST",
                                        urbanization_code: null,
                                    },
                                    additional: {
                                        residential: true,
                                        occupied: true,
                                        known_address: true,
                                        known_secondary_address: true,
                                    },
                                },
                                {
                                    __typename: "AddressValidationError",
                                    error_code: "UNKNOWN_ERROR",
                                    error_message: "Something went wrong",
                                },
                            ],
                        },
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });
        const response = await client.validateAddress(
            [
                {
                    city: "City One",
                    state: StateCode.UT,
                    zip_code: "84037",
                    street: "123 Sesame Street",
                },
                {
                    city: "City Two",
                    state: StateCode.NY,
                    zip_code: "12345",
                    street: ["345 Sesame St", "#101"],
                },
            ],
            {
                zip_plus_four: true,
            },
        );

        expect(fetch_expectations_passed).toBe(true);
        expect(response.length).toBe(2);
        expect(response[0]).toBeInstanceOf(AddressValidationInfo);
        expect(response[1]).toBeInstanceOf(AddressValidationError);

        expect(response[0]).toEqual({
            __typename: "AddressValidationInfo",
            additional: {
                known_address: true,
                known_secondary_address: true,
                occupied: true,
                residential: true,
            },
            normalized_address: {
                city: "CITY ONE",
                state: "UT",
                street: "123 SESAME ST",
                urbanization_code: null,
                zip_code: "84037-1234",
            },
            original_address: {
                city: "City One",
                state: "UT",
                street: "123 Sesame Street",
                urbanization_code: null,
                zip_code: "84037",
            },
            warnings: [
                {
                    message: "Spelling changed",
                    severity: "NOTE",
                },
            ],
        });
        expect(response[1]).toEqual({
            __typename: "AddressValidationError",
            error_code: "UNKNOWN_ERROR",
            error_message: "Something went wrong",
        });
    });

    it("validates addresses with default options", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: {
                    documentId: "ValidateAddress",
                    variables: {
                        address: [
                            {
                                city: "City Two",
                                state: "NY",
                                street: ["345 Sesame St", "#101"],
                                zip_code: "12345",
                            },
                        ],
                    },
                },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            address_validation: [
                                {
                                    __typename: "AddressValidationError",
                                    error_code: "UNKNOWN_ERROR",
                                    error_message: "Something went wrong",
                                },
                            ],
                        },
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });
        const response = await client.validateAddress([
            {
                city: "City Two",
                state: StateCode.NY,
                zip_code: "12345",
                street: ["345 Sesame St", "#101"],
            },
        ]);

        expect(fetch_expectations_passed).toBe(true);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(AddressValidationError);
        expect(response[0]).toEqual({
            __typename: "AddressValidationError",
            error_code: "UNKNOWN_ERROR",
            error_message: "Something went wrong",
        });
    });

    it("fetches domestic shipping rates", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: {
                    documentId: "DomesticRate",
                    variables: {
                        request: {
                            request_id: "1234",
                            package: {
                                packaging: {
                                    custom_box: {
                                        length: {
                                            measure: 8,
                                            unit: LengthUnit.IN,
                                        },
                                        width: {
                                            measure: 6,
                                            unit: LengthUnit.IN,
                                        },
                                        height: {
                                            measure: 4,
                                            unit: LengthUnit.IN,
                                        },
                                    },
                                },
                                weight: {
                                    measure: 5,
                                    unit: WeightUnit.LBS,
                                },
                                extra_services: [
                                    {
                                        require_signature: {},
                                    },
                                ],
                                ship_to: {
                                    zip_code: "12345",
                                    state: StateCode.NY,
                                    street: ["123 Sesame St", "#102"],
                                    city: "Somewhere",
                                    residential: true,
                                },
                                ship_from: {
                                    zip_code: "84037",
                                    state: StateCode.UT,
                                    street: "553 N Kays Dr",
                                    city: "Kaysville",
                                    residential: false,
                                },
                            },
                            additional: {
                                ship_date: "2025-02-18",
                            },
                        },
                        services: {
                            carrier: CarrierName.UPS,
                            rate_class: RateClass.NEGOTIATED,
                            service_code: "GND",
                        },
                        save_rates: false,
                        weight_unit: "KG",
                    },
                },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            domestic_rate: [
                                {
                                    request_id: "1234",
                                    rates: [
                                        {
                                            __typename: "DomesticRateError",
                                            carrier: "UPS",
                                            requested_rate_class: "NEGOTIATED",
                                            service_code: "GND",
                                            code: "CARRIER_ERROR",
                                            message: "UPS doesn't want it",
                                        },
                                    ],
                                },
                            ],
                        },
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });
        const response = await client.getDomesticRate(
            {
                request_id: "1234",
                package: {
                    packaging: {
                        custom_box: {
                            length: {
                                measure: 8,
                                unit: LengthUnit.IN,
                            },
                            width: {
                                measure: 6,
                                unit: LengthUnit.IN,
                            },
                            height: {
                                measure: 4,
                                unit: LengthUnit.IN,
                            },
                        },
                    },
                    weight: {
                        measure: 5,
                        unit: WeightUnit.LBS,
                    },
                    extra_services: [
                        {
                            require_signature: {},
                        },
                    ],
                    ship_to: {
                        zip_code: "12345",
                        state: StateCode.NY,
                        street: ["123 Sesame St", "#102"],
                        city: "Somewhere",
                        residential: true,
                    },
                    ship_from: {
                        zip_code: "84037",
                        state: StateCode.UT,
                        street: "553 N Kays Dr",
                        city: "Kaysville",
                        residential: false,
                    },
                },
                additional: {
                    ship_date: "2025-02-18",
                },
            },
            {
                carrier: CarrierName.UPS,
                rate_class: RateClass.NEGOTIATED,
                service_code: "GND",
            },
            {
                save_rates: false,
                weight_unit: WeightUnit.KG,
            },
        );

        expect(fetch_expectations_passed).toBe(true);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(BulkDomesticRateResponse);

        expect(response[0]).toEqual({
            rates: [
                {
                    __typename: "DomesticRateError",
                    carrier: "UPS",
                    code: "CARRIER_ERROR",
                    message: "UPS doesn't want it",
                    requested_rate_class: "NEGOTIATED",
                    service_code: "GND",
                },
            ],
            request_id: "1234",
        });
    });

    it("fetches domestic shipping rates using defaults", async () => {
        let fetch_expectations_passed = false;

        globalThis.fetch = jest.fn().mockImplementation(async (url: string, args: RequestInit) => {
            expect(url).toBe("https://api.test/graphql");
            expect({
                ...args,
                body: JSON.parse(args.body as string),
            }).toEqual({
                body: {
                    documentId: "DomesticRate",
                    variables: {
                        request: {
                            request_id: "1234",
                            package: {
                                packaging: {
                                    custom_box: {
                                        length: {
                                            measure: 8,
                                            unit: LengthUnit.IN,
                                        },
                                        width: {
                                            measure: 6,
                                            unit: LengthUnit.IN,
                                        },
                                        height: {
                                            measure: 4,
                                            unit: LengthUnit.IN,
                                        },
                                    },
                                },
                                weight: {
                                    measure: 5,
                                    unit: WeightUnit.LBS,
                                },
                                extra_services: [
                                    {
                                        require_signature: {},
                                    },
                                ],
                                ship_to: {
                                    zip_code: "12345",
                                    state: StateCode.NY,
                                    street: ["123 Sesame St", "#102"],
                                    city: "Somewhere",
                                    residential: true,
                                },
                                ship_from: {
                                    zip_code: "84037",
                                    state: StateCode.UT,
                                    street: "553 N Kays Dr",
                                    city: "Kaysville",
                                    residential: false,
                                },
                            },
                            additional: {
                                ship_date: "2025-02-18",
                            },
                        },
                        services: {
                            carrier: CarrierName.UPS,
                            rate_class: RateClass.NEGOTIATED,
                            service_code: "GND",
                        },
                    },
                },
                headers: {
                    Accept: "application/graphql-response+json",
                    Authorization: "Bearer def456",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            fetch_expectations_passed = true;

            return {
                ok: true,
                json: async () => {
                    return {
                        data: {
                            domestic_rate: [
                                {
                                    request_id: "1234",
                                    rates: [
                                        {
                                            __typename: "DomesticRateError",
                                            carrier: "UPS",
                                            requested_rate_class: "NEGOTIATED",
                                            service_code: "GND",
                                            code: "CARRIER_ERROR",
                                            message: "UPS doesn't want it",
                                        },
                                    ],
                                },
                            ],
                        },
                    };
                },
            };
        });

        const client = new ShipGeniusOmsClient("def456", { url: "https://api.test" });
        const response = await client.getDomesticRate(
            {
                request_id: "1234",
                package: {
                    packaging: {
                        custom_box: {
                            length: {
                                measure: 8,
                                unit: LengthUnit.IN,
                            },
                            width: {
                                measure: 6,
                                unit: LengthUnit.IN,
                            },
                            height: {
                                measure: 4,
                                unit: LengthUnit.IN,
                            },
                        },
                    },
                    weight: {
                        measure: 5,
                        unit: WeightUnit.LBS,
                    },
                    extra_services: [
                        {
                            require_signature: {},
                        },
                    ],
                    ship_to: {
                        zip_code: "12345",
                        state: StateCode.NY,
                        street: ["123 Sesame St", "#102"],
                        city: "Somewhere",
                        residential: true,
                    },
                    ship_from: {
                        zip_code: "84037",
                        state: StateCode.UT,
                        street: "553 N Kays Dr",
                        city: "Kaysville",
                        residential: false,
                    },
                },
                additional: {
                    ship_date: "2025-02-18",
                },
            },
            {
                carrier: CarrierName.UPS,
                rate_class: RateClass.NEGOTIATED,
                service_code: "GND",
            },
        );

        expect(fetch_expectations_passed).toBe(true);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(BulkDomesticRateResponse);

        expect(response[0]).toEqual({
            rates: [
                {
                    __typename: "DomesticRateError",
                    carrier: "UPS",
                    code: "CARRIER_ERROR",
                    message: "UPS doesn't want it",
                    requested_rate_class: "NEGOTIATED",
                    service_code: "GND",
                },
            ],
            request_id: "1234",
        });
    });
});
