// import { Locator } from "../interfaces/Locator";
import { LocatorMap } from "../interfaces/LocatorMap";
import { LocatorGenerator } from "./LocatorGenerator";
export class DomScrapper {
    private static isVisible(element: Element): boolean {
        const style = element.ownerDocument.defaultView?.getComputedStyle(element);
        return element.getClientRects().length > 0 &&
            style?.display !== 'none' &&
            style?.visibility !== 'hidden' &&
            style?.visibility !== 'collapse';
    }

    public static scrap(doc: Document): LocatorMap {
        const controls: LocatorMap = {
            locators: {
                heading: '',
                simpleFormLink: '',
                messageInput: '',
                showMessageButton: '',
                displayedMessage: ''
            },
            buttons: [],
            inputs: [],
            links: [],
            dropdowns: [],
            textAreas: []
        }

        this.scrapeButtons(doc, controls)
        this.scrapeInputs(doc, controls)
        this.scrapeLinks(doc, controls)
        this.scrapeDropdowns(doc, controls)
        this.scrapeTextAreas(doc, controls)
        return controls;
    }
    private static scrapeButtons(
        doc: Document,
        controls: LocatorMap
    ) {

        doc.querySelectorAll('button')
            .forEach((element, index) => {

                if (!this.isVisible(element)) return;

                controls.buttons.push({
                    name: `button_${index}`,
                    selector: LocatorGenerator.generator(element),
                    type: 'button',
                    text: element.textContent?.trim()
                })

            })
    }

    private static scrapeInputs(
        doc: Document,
        controls: LocatorMap
    ) {

        doc.querySelectorAll('input')
            .forEach((element, index) => {

                if (!this.isVisible(element)) return;

                controls.inputs.push({
                    name: `input_${index}`,
                    selector: LocatorGenerator.generator(element),
                    type: 'input',
                    text: ''
                })

            })
    }

    private static scrapeLinks(
        doc: Document,
        controls: LocatorMap
    ) {

        doc.querySelectorAll('a')
            .forEach((element, index) => {

                if (!this.isVisible(element)) return;

                controls.links.push({
                    name: `link_${index}`,
                    selector: LocatorGenerator.generator(element),
                    type: 'link',
                    text: element.textContent?.trim()
                })

            })
    }

    private static scrapeDropdowns(
        doc: Document,
        controls: LocatorMap
    ) {

        doc.querySelectorAll('select')
            .forEach((element, index) => {

                if (!this.isVisible(element)) return;

                controls.dropdowns.push({
                    name: `dropdown_${index}`,
                    selector: LocatorGenerator.generator(element),
                    type: 'select'
                })

            })
    }

    private static scrapeTextAreas(
        doc: Document,
        controls: LocatorMap
    ) {

        doc.querySelectorAll('textarea')
            .forEach((element, index) => {

                if (!this.isVisible(element)) return;

                controls.textAreas.push({
                    name: `textarea_${index}`,
                    selector: LocatorGenerator.generator(element),
                    type: 'textarea'
                })

            })
    }
}
