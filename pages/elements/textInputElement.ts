import {By} from "selenium-webdriver";
import {element} from "protractor";

class TextInputElement {
    private locator;

    constructor(by: By) {
        this.locator = by;
    }

    async typeKeys(keys: string) {
        return element(this.locator).sendKeys(keys);
    }
}

export default TextInputElement;