import ShipgeniusOmsClient, { ServerEnvironment, HttpError, GraphqlError } from "./index";

describe("@shipgenius/oms/client", () => {
    it("has expected exports", () => {
        expect(ShipgeniusOmsClient).toBeDefined();
        expect(ServerEnvironment).toBeDefined();
        expect(HttpError).toBeDefined();
        expect(GraphqlError).toBeDefined();
    });
});
