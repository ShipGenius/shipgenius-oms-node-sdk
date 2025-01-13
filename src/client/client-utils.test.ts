import { ServerEnvironment } from "./client-types";
import { getServerUrl } from "./client-utils";

describe("getServerUrl", () => {
    it("returns the correct production URL", () => {
        expect(getServerUrl(ServerEnvironment.PRODUCTION)).toBe("https://api.lite.shipgeni.us");
    });

    xit("returns the correct sandbox URL", () => {
        // TODO
    });

    xit("returns the correct development URL", () => {
        // TODO
    });

    it("throws an error if an unknown environment is specified", () => {
        // @ts-expect-error
        expect(() => getServerUrl("WRONG")).toThrow();
    });
});
