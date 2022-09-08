import {By} from "selenium-webdriver";
import {element} from "protractor";

class TextElement {
    private locator;
    constructor(by: By) {
        this.locator = by;
    }

    getText(){
        return element(this.locator).getText();
    }
}

export default TextElement;