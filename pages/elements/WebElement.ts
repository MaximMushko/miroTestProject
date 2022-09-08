import {By} from "selenium-webdriver";
import {element} from "protractor";

abstract class WebElement {
    protected locator;

    constructor(by: By) {
        this.locator = by;
    }

    getWebDriverElement() {
        return element(this.locator);
    }

    isDisplayed() {
        return element(this.locator).isDisplayed();
    }
}

export default WebElement;