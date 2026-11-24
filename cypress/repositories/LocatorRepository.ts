import { LocatorMap } from "../interfaces/LocatorMap";
class LocatorRepository {
    controls: LocatorMap = {
        locators: {
            heading: "",
            simpleFormLink: "",
            messageInput: "",
            showMessageButton: "",
            displayedMessage: ""
        },
        buttons: [],
        inputs: [],
        links: [],
        dropdowns: [],
        textAreas: []
    }
    setControls(controls: LocatorMap) {
        this.controls = controls
    }

    getControls(): LocatorMap {
        return this.controls
    }
}

export const locatorRepository =
  new LocatorRepository()