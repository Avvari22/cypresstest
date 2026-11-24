import { Locator } from "./locator";
export interface LocatorMap {
    buttons: Locator[];
    inputs: Locator[];
    links: Locator[];
    dropdowns: Locator[];
    textAreas: Locator[];
    readonly locators: {
        heading: string;
        simpleFormLink: string;
        messageInput: string;
        showMessageButton: string;
        displayedMessage: string;
    };
}
