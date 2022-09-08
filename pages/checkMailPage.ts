import {by, protractor, element, browser} from "protractor";

const EC = protractor.ExpectedConditions;

class CheckMailPage {
    private pageTitle = by.css('.signup>h1');
    private pageText = by.css('.signup > .signup__subtitle-form');
    private codeInputBox = by.css('#code');
    private codeErrorMessage = by.css('#error-general')
    private attemptsExceededErrorMessage = by.css('#error-attemptsExceeded')
    private sendCodeAgainLabel = by.css('.signup__footer')

    getPageTitle(){
        return element(this.pageTitle).getText();
    }

    getPageText() {
        return element(this.pageText).getText();
    }

    checkCodeInputBox() {
        return element(this.codeInputBox).isDisplayed();
    }

    enterCodeToInputBox(code: string) {
        return element(this.codeInputBox).sendKeys(code);
    }

    async getCodeErrorMessage(){
        const message = element(this.codeErrorMessage)
        await browser.wait(EC.visibilityOf(message), 1000)
        return message.getText();
    }

    getAttemptsExceedErrorMessage(){
        return element(this.attemptsExceededErrorMessage).getText();
    }

    getContactUsLabel () {
        return element.all(this.sendCodeAgainLabel).get(0).getText();
    }
    getSendCodeAgainLabel(){
        return element.all(this.sendCodeAgainLabel).get(1).getText();
    }
}

export default CheckMailPage;