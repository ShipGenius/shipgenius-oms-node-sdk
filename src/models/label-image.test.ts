import LabelData from "./label-data";
import LabelFormat from "./label-format";
import LabelImage, { LabelImageInterface } from "./label-image";

describe("LabelImage", () => {
    it("constructs from a PNG server response", () => {
        // @ts-expect-error - the server doesn't actually response with a `zpl` key
        const data: LabelImageInterface<LabelFormat.PNG> = {
            png: {
                mime_type: "image/png",
                url: "https://test/image.png",
                base64_encoded: "abcd",
            },
        };

        const obj = new LabelImage<LabelFormat.PNG>(data);

        expect(obj).toBeInstanceOf(LabelImage);
        expect(obj.png).toBeInstanceOf(LabelData);
        expect(obj.png).toEqual(data.png);
        expect(obj.zpl).toBeNull();
    });

    it("constructs from a ZPL server response", () => {
        // @ts-expect-error - the server doesn't actually response with a `png` key
        const data: LabelImageInterface<LabelFormat.ZPL> = {
            zpl: {
                mime_type: "application/zpl",
                url: "https://test/image.zpl",
                base64_encoded: "beef",
            },
        };

        const obj = new LabelImage<LabelFormat.ZPL>(data);

        expect(obj).toBeInstanceOf(LabelImage);
        expect(obj.zpl).toBeInstanceOf(LabelData);
        expect(obj.zpl).toEqual(data.zpl);
        expect(obj.png).toBeNull();
    });

    it("selects the right image automatically (png)", () => {
        const data: LabelImageInterface<LabelFormat.PNG> = {
            png: {
                mime_type: "image/png",
                url: "https://test/image.png",
                base64_encoded: "abcd",
            },
            zpl: null,
        };

        const obj = new LabelImage<LabelFormat.PNG>(data);

        expect(obj.image).toEqual(data.png);
    });

    it("selects the right image automatically (zpl)", () => {
        const data: LabelImageInterface<LabelFormat.ZPL> = {
            png: null,
            zpl: {
                mime_type: "application/zpl",
                url: "https://test/image.zpl",
                base64_encoded: "abcd",
            },
        };

        const obj = new LabelImage<LabelFormat.ZPL>(data);

        expect(obj.image).toEqual(data.zpl);
    });
});
