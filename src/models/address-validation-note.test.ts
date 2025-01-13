import AddressValidationNote, { AddressValidationNoteInterface } from "./address-validation-note";
import MessageSeverity from "./message-severity";

describe("AddressValidationNote", () => {
    it("constructs from the server response", () => {
        const data: AddressValidationNoteInterface = {
            severity: MessageSeverity.CRITICAL,
            message: "Everything is on fire",
        };

        const obj = new AddressValidationNote(data);

        expect(obj).toBeInstanceOf(AddressValidationNote);
        expect(obj).toEqual(data);
    });
});
