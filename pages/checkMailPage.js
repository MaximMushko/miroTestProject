const EC = protractor.ExpectedConditions;

class CheckMailPage {
    constructor() {
        this.pageTitle = by.css('.signup>h1');
        this.pageText = by.css('.signup > .signup__subtitle-form');
        this.codeInputBox = by.css('#code');
        this.codeErrorMessage = by.css('#error-general')
        this.attemptsExceededErrorMessage = by.css('#error-attemptsExceeded')
        this.sendCodeAgainLabel = by.css('.signup__footer')
    }

    getPageTitle(){
        return element(this.pageTitle).getText();
    }

    getPageText() {
        return element(this.pageText).getText();
    }

    checkCodeInputBox() {
        return element(this.codeInputBox).isDisplayed();
    }

    enterCodeToInputBox(code) {
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


module.exports = new CheckMailPage();
