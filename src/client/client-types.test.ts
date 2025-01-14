import { GraphqlError, HttpError, StrippedResponse } from "./client-types";
import { GraphqlErrorResponse } from "./gql-types";

const basic_data: StrippedResponse = {
    headers: new Headers({
        "Content-Type": "application/json",
        "X-Some-Other-Header": "Yes",
    }),
    ok: false,
    redirected: false,
    status: 400,
    statusText: "Bad Request",
    type: "basic",
    url: "http://test/bad",
    clone: function (): StrippedResponse {
        return this;
    },
    json: async function (): Promise<any> {
        return { detail: "error message" };
    },
    text: async function (): Promise<string> {
        return '{"detail": "error message"}';
    },
};

describe("HttpError", () => {
    it("is an Error", () => {
        const err = new HttpError(basic_data);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("HTTP Error: 400");
    });

    it("allows viewing the response", () => {
        const err = new HttpError(basic_data);
        expect(err.response.headers).toEqual(basic_data.headers);
    });

    it("allows re-reading the respons text", async () => {
        const err = new HttpError(basic_data);
        expect(await err.response.text()).toBe('{"detail": "error message"}');
        expect(await err.response.text()).toBe('{"detail": "error message"}');
    });

    it("allows re-reading the respons json", async () => {
        const err = new HttpError(basic_data);
        expect(await err.response.json()).toEqual({ detail: "error message" });
        expect(await err.response.json()).toEqual({ detail: "error message" });
    });

    it("returns message in `detail`", async () => {
        const err = new HttpError({
            ...basic_data,
            json: async function (): Promise<any> {
                return { detail: "error message" };
            },
            text: async function (): Promise<string> {
                return '{"detail": "error message"}';
            },
        });

        expect(await err.getMessage()).toBe("error message");
    });

    it("returns message in `detail.message`", async () => {
        const err = new HttpError({
            ...basic_data,
            json: async function (): Promise<any> {
                return { detail: { message: "error message" } };
            },
            text: async function (): Promise<string> {
                return '{"detail": { "message": "error message" } }';
            },
        });

        expect(await err.getMessage()).toBe("error message");
    });

    it("returns a default if there is no message", async () => {
        const err = new HttpError({
            ...basic_data,
            json: async function (): Promise<any> {
                return {};
            },
            text: async function (): Promise<string> {
                return "{}";
            },
        });

        expect(await err.getMessage()).toBe("An unexpected error occurred.");
    });

    it("handles bad JSON values", async () => {
        const err = new HttpError({
            ...basic_data,
            json: async function (): Promise<any> {
                return JSON.parse(await this.text());
            },
            text: async function (): Promise<string> {
                return "Internal Server Error";
            },
        });

        expect(await err.getMessage()).toBe("An unexpected error occurred.");
    });
});

const basic_errors: [GraphqlErrorResponse, GraphqlErrorResponse] = [
    {
        message: "An known error occurred",
        extensions: {
            http_status: 404,
            additional_details: {
                hello: "world",
            },
            code: "KNOWN_ERROR",
        },
    },
    {
        message: "An unknown error occurred",
        locations: [{ line: 10, column: 20 }],
        path: ["do", "a", "thing"],
    },
];

describe("GraphqlError", () => {
    it("is an Error", () => {
        const err = new GraphqlError(basic_errors);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("An known error occurred");
    });

    it("wraps the error response", () => {
        const err = new GraphqlError(basic_errors);

        expect(err.errors.length).toBe(2);
        expect(err.errors[0].extensions?.http_status).toBe(404);
        expect(err.errors[1].path).toEqual(["do", "a", "thing"]);
    });

    it("pulls out extensions", () => {
        const { error_extensions } = new GraphqlError(basic_errors);
        expect(error_extensions.length).toBe(1);
        expect(error_extensions[0]).toEqual({
            http_status: 404,
            additional_details: {
                hello: "world",
            },
            code: "KNOWN_ERROR",
        });
    });
});
