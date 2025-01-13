import { ServerEnvironment } from "./client-types";
import { getServerUrl } from "./client-utils";

describe("getServerUrl", () => {
    it("returns the correct production URL", () => {
        expect(getServerUrl(ServerEnvironment.PRODUCTION)).toBe("https://api.lite.shipgeni.us");
    });
});
