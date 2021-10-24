const EC = protractor.ExpectedConditions;
class MiroSignUpPage {

    constructor() {
        this.pageText = by.css('.signup > h1');
        this.pageSubText = by.css('.signup > div.ab-signup-usa--free-text')
        this.userNameField = by.css('#name');
        this.emailField = by.css('#email');
        this.passwordField = by.css('#password');
        this.emailErrorMessage = by.css('#emailError');
        this.passwordErrorMessage = by.css('.js-empty-password');
        this.userErrorMessage = by.css('#nameError');
        this.termsError = by.css('#termsError')
        this.passwordStatusBar = by.css('#password-hint > .signup__input-hint-bar-wrap')
        this.passwordHint = by.css('#password-hint > #signup-form-password');
        this.termPolicyCheckBox = by.css('#signup-terms');
        this.miroNewsCheckBox = by.css('#signup-subscribe');
        this.termPolicyLabel = by.css('#signup-error-emptyTerms');
        this.miroNewsLabel = by.css('#signup-subscribe-desc')
        this.signInButton = by.css('.signup__submit')
    }

    getPageText(){
        return element(this.pageText).getText();
    }

    getPageSubText(){
        return element(this.pageSubText).getText();
    }

    enterUserName(userName) {
        return element(this.userNameField).sendKeys(userName)
    }

    enterEmail(email) {
        return element(this.emailField).sendKeys(email)
    }

    async enterPassword(password) {
        await element(this.passwordField).sendKeys(password);
        await browser.wait(EC.visibilityOf(element(this.passwordStatusBar)), 2000)
    }

    getPasswordHint() {
        return element(this.passwordHint).getText();
    }

    async getLoginFormErrors() {
        return {
            nameError: await element(this.userErrorMessage).getText(),
            emailError: await element(this.emailErrorMessage).getText(),
            passwordError: await element(this.passwordErrorMessage).getText(),
            termsError: await element(this.termsError).getText()
        }
    }

    getMiroTermsLabel() {
        return element(this.termPolicyLabel).getText();
    }

    getSubscribeToNewsLabel(){
        return element(this.miroNewsLabel).getText();
    }

    clickMiroTermsCheckbox(){
        const checkBoxElement = element(this.termPolicyCheckBox)
        return browser.executeScript('arguments[0].click()', checkBoxElement.getWebElement());
    }

    clickSubscriveToNewsLabel(){
        const checkBoxElement = element(this.miroNewsCheckBox)
        return browser.executeScript('arguments[0].click()', checkBoxElement.getWebElement());
    }

    clickSignUpButton() {
        return element(this.signInButton).click();
    }
}

module.exports = new MiroSignUpPage();
