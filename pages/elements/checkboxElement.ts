import {By} from "selenium-webdriver";
import {browser, element} from "protractor";

class CheckboxElement {
    private locator;

    constructor(by: By){
        this.locator = by;
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