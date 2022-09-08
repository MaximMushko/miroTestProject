import {By} from "selenium-webdriver";
import {browser, element} from "protractor";
import WebElement from "./WebElement";

class CheckboxElement extends WebElement {
    constructor(by: By){
       super(by);
    }

    isSelected(){
        return element(this.locator).isSelected();
    }

    async selectCheckbox(){
        const checkBoxElement = element(this.locator)
        return browser.executeScript('arguments[0].click()', checkBoxElement.getWebElement());

    }
}

export default CheckboxElement;