/**
 * Interface version of {@link LabelData}
 *
 * @internal
 */
export interface LabelDataInterface {
    /** The MIME type of the image file */
    readonly mime_type: string;
    /** The URL where this file can be found in the future */
    readonly url: string;
    /**
     * The image file as a base64 encoded string.
     *
     * Either a raw image file, or a `data:` uri,
     * depending on which was requested.
     */
    readonly base64_encoded: string;
}

/** An image of the label */
export default class LabelData implements LabelDataInterface {
    public readonly mime_type: string;
    public readonly url: string;
    public readonly base64_encoded: string;

    /** @hidden */
    constructor(data: LabelData) {
        this.mime_type = data.mime_type;
        this.url = data.url;
        this.base64_encoded = data.base64_encoded;
    }
}
