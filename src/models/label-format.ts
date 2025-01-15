/** The formats a label image can be returned in */
enum LabelFormat {
    /** Return only metadata, do not return any image data */
    NONE = "NONE",
    /** Return the label as a ZPL label-printer file */
    ZPL = "ZPL",
    /** Return the label as a PNG image */
    PNG = "PNG",
}
export default LabelFormat;
