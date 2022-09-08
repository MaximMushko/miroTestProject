import {By} from "selenium-webdriver";
import {element} from "protractor";

class ButtonElement {
    private locator;

    constructor(by: By) {
        this.locator = by;
    }

    async clickOnButton(){
        await element(this.locator).click();
    }
}

export default ButtonElement;