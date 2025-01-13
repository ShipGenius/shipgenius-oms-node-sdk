import ShipGeniusOmsClient, { client, models, type_helpers } from "./index";

describe("@shipgenius/oms", () => {
    it("has the expected exports", () => {
        expect(ShipGeniusOmsClient).toBeDefined();
        expect(client).toBeDefined();
        expect(models).toBeDefined();
        expect(type_helpers).toBeDefined();
    });
});
