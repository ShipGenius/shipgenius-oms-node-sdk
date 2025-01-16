import DomesticLabelError, { DomesticLabelErrorInterface } from "./domestic-label-error";
import DomesticLabelResponse from "./domestic-label-response";

describe("DomesticLabelError", () => {
    it("constructs from the server response", () => {
        const data: DomesticLabelErrorInterface = {
            __typename: "DomesticLabelError",
            code: "WRONG",
            message: "Something went wrong",
            transaction_id: "e73a5a13-cba2-49c8-a202-c4d016f26663",
        };

        const obj = new DomesticLabelError(data);

        expect(obj).toBeInstanceOf(DomesticLabelError);
        expect(obj).toBeInstanceOf(DomesticLabelResponse);
        expect(obj).toEqual(data);
    });
});
