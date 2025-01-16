import DomesticLabelError, { DomesticLabelErrorInterface } from "./domestic-label-error.js";
import DomesticLabel, { DomesticLabelInterface } from "./domestic-label.js";
import LabelFormat from "./label-format.js";

/**
 * Interface version of {@link BulkDomesticLabelResponse}
 *
 * @template Format the format of the label images
 *
 * @internal
 */
export interface BulkDomesticLabelResponseInterface<Format extends LabelFormat> {
    /** A UUID identifying the batch of labels */
    readonly batch_id: string;
    /** A url to view the labels as a PDF with one label per page */
    readonly batch_pdf_url: string;
    /** The labels generated */
    readonly labels: (DomesticLabelInterface<Format> | DomesticLabelErrorInterface)[];
}

/**
 * A batch of generated labels
 */
export default class BulkDomesticLabelResponse<Format extends LabelFormat> implements BulkDomesticLabelResponseInterface<Format> {
    public readonly batch_id: string;
    public readonly batch_pdf_url: string;
    public readonly labels: (DomesticLabel<Format> | DomesticLabelError)[];

    /** @hidden */
    constructor(data: BulkDomesticLabelResponseInterface<Format>) {
        this.batch_id = data.batch_id;
        this.batch_pdf_url = data.batch_pdf_url;
        this.labels = data.labels.map((label) => {
            if (label.__typename === "DomesticLabel") {
                return new DomesticLabel(label);
            } else {
                return new DomesticLabelError(label);
            }
        });
    }
}
