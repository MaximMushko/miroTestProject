import {By} from "selenium-webdriver";
import {element} from "protractor";
import WebElement from "./WebElement";

class TextInputElement extends WebElement {
    constructor(by: By) {
        super(by);
    }

    async typeKeys(keys: string) {
        await element(this.locator).sendKeys(keys);
    }

    async getTypedValue() {
        return element(this.locator).getAttribute('value');
    }
}

export default TextInputElement;