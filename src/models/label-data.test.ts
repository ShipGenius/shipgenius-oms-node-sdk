import LabelData, { LabelDataInterface } from "./label-data";

describe("LabelData", () => {
    it("constructs from the server response", () => {
        const data: LabelDataInterface = {
            mime_type: "image/png",
            url: "https://test/image.png",
            base64_encoded: "abacaba",
        };

        const obj = new LabelData(data);

        expect(obj).toBeInstanceOf(LabelData);
        expect(obj).toEqual(data);
    });
});
