import {By} from "selenium-webdriver";
import {element} from "protractor";
import WebElement from "./WebElement";

class TextElement extends WebElement {
    constructor(by: By) {
        super(by);
    }

    getText(){
        return element(this.locator).getText();
    }

    clickOnLink() {
        return element(this.locator).click();
    }

}

export default TextElement;