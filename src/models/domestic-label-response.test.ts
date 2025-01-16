import DomesticLabelResponse, { DomesticLabelResponseInterface } from "./domestic-label-response";

describe("DomesticLabelRespons", () => {
    it("constructs from the server response", () => {
        const data: DomesticLabelResponseInterface = {
            __typename: "DomesticLabelError",
            transaction_id: "e73a5a13-cba2-49c8-a202-c4d016f26663",
        };

        const obj = new DomesticLabelResponse(data);

        expect(obj).toBeInstanceOf(DomesticLabelResponse);
        expect(obj).toEqual(data);
    });
});
