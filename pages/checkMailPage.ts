import {by, protractor, browser} from "protractor";
import TextElement from "./elements/textElement";
import TextInputElement from "./elements/textInputElement";

const EC = protractor.ExpectedConditions;

class CheckMailPage {
    public pageTitle = new TextElement(by.css('.signup>h1'));
    public pageText = new TextElement(by.css('.signup > .signup__subtitle-form'));
    public codeInputBox = new TextInputElement(by.css('#code'));
    public codeErrorMessage = new TextElement(by.css('#error-general'));
    public attemptsExceededErrorMessage = new TextElement(by.css('#error-attemptsExceeded'));
    public contactUsLabel = new TextElement(by.css('div.signup__footer:nth-of-type(2)'))
    public sendCodeAgainLabel = new TextElement(by.css('div.signup__footer:nth-of-type(3)'));

    async getCodeErrorMessage(){
        const message = this.codeErrorMessage.getWebDriverElement();
        await browser.wait(EC.visibilityOf(message), 1000)
        return message.getText();
    }
}

export default CheckMailPage;