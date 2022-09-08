import {By} from "selenium-webdriver";
import {element} from "protractor";
import WebElement from "./WebElement";

class ButtonElement extends WebElement {
    constructor(by: By) {
        super(by);
    }

    async clickOnButton(){
        await element(this.locator).click();
    }
}

export default ButtonElement;