import {by, protractor, browser, element} from "protractor";

const EC = protractor.ExpectedConditions;

class MiroSignUpPage {
    private pageText = by.css('div.ssp-hide > h1');
    private pageSubText = by.css('div.ssp-hide > div.ab-signup-usa--free-text')
    private userNameField = by.css('#name');
    private emailField = by.css('#email');
    private passwordField = by.css('#password');
    private emailErrorMessage = by.css('#emailError');
    private passwordErrorMessage = by.css('.js-empty-password');
    private userErrorMessage = by.css('#nameError');
    private termsError = by.css('#termsError')
    private passwordStatusBar = by.css('#password-hint > .signup__input-hint-bar-wrap')
    private passwordHint = by.css('#password-hint > #signup-form-password');
    private termPolicyCheckBox = by.css('#signup-terms');
    private miroNewsCheckBox = by.css('#signup-subscribe');
    private termPolicyLabel = by.css('#signup-error-emptyTerms');
    private miroNewsLabel = by.css('#signup-subscribe-desc')
    private signInButton = by.css('[data-testid="mr-form-signup-btn-start-1"]')

    getPageText(){
        return element(this.pageText).getText();
    }

    public getPageSubText(){
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

    clickSubscribeToNewsLabel(){
        const checkBoxElement = element(this.miroNewsCheckBox)
        return browser.executeScript('arguments[0].click()', checkBoxElement.getWebElement());
    }

    clickSignUpButton() {
        return element(this.signInButton).click();
    }
}

export default MiroSignUpPage;