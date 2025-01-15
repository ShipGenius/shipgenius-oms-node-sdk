import LabelData, { LabelDataInterface } from "./label-data";
import LabelFormat from "./label-format";

/**
 * Interface version of {@link LabelImage}
 *
 * @template Format the format the image is in
 *
 * @internal
 */
export interface LabelImageInterface<Format extends LabelFormat = LabelFormat.NONE> {
    /**
     * The label as a png.
     *
     * This field will be `null` unless the requested label format was PNG
     */
    readonly png: Format extends LabelFormat.PNG ? LabelDataInterface : null;
    /**
     * The label as a zpl file.
     *
     * This field will be `null` unless the requested label format was ZPL
     */
    readonly zpl: Format extends LabelFormat.ZPL ? LabelDataInterface : null;
}

/**
 * An image of the label
 *
 * @template Format the format to return the image in
 */
export default class LabelImage<Format extends LabelFormat = LabelFormat.NONE> implements LabelImageInterface<LabelFormat> {
    public readonly png: Format extends LabelFormat.PNG ? LabelData : null;
    public readonly zpl: Format extends LabelFormat.ZPL ? LabelData : null;

    /** @hidden */
    constructor(data: LabelImageInterface<Format>) {
        this.png = (data.png ? new LabelData(data.png) : null) as Format extends LabelFormat.PNG ? LabelData : null;
        this.zpl = (data.zpl ? new LabelData(data.zpl) : null) as Format extends LabelFormat.ZPL ? LabelData : null;
    }

    /** The label image in whichever format was returned */
    public get image(): LabelData | null {
        return this.png ?? this.zpl;
    }
}
