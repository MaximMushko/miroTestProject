import {by, protractor, browser, element} from "protractor";
import TextElement from "./elements/textElement";
import TextInputElement from "./elements/textInputElement";
import CheckboxElement from "./elements/checkboxElement";
import ButtonElement from "./elements/buttonElement";

const EC = protractor.ExpectedConditions;

class MiroSignUpPage {
    public pageText = new TextElement(by.css('div.ssp-hide > h1'));
    public pageSubText = new TextElement(by.css('div.ssp-hide > div.ab-signup-usa--free-text'));
    public userNameField = new TextInputElement(by.css('#name'));
    public emailField = new TextInputElement(by.css('#email'));
    public passwordField = new TextInputElement(by.css('#password'));
    public emailErrorMessage = new TextElement(by.css('#emailError'));
    public passwordErrorMessage = new TextElement(by.css('.js-empty-password'));
    public userErrorMessage = new TextElement(by.css('#nameError'));
    public termsError = new TextElement(by.css('#termsError'));
    public passwordStatusBar = by.css('#password-hint > .signup__input-hint-bar-wrap')
    public passwordHint = new TextElement(by.css('#password-hint > #signup-form-password'));
    public termPolicyCheckBox = new CheckboxElement(by.css('#signup-terms'));
    public miroNewsCheckBox =new CheckboxElement(by.css('#signup-subscribe'));
    public termPolicyLabel = new TextElement(by.css('#signup-error-emptyTerms'));
    public miroNewsLabel = new TextElement(by.css('#signup-subscribe-desc'))
    public signInButton = new ButtonElement(by.css('[data-testid="mr-form-signup-btn-start-1"]'));

    async waitForStatusBar(){
        await browser.wait(EC.visibilityOf(element(this.passwordStatusBar)), 2000)
    }

    async getLoginFormErrors() {
        return {
            nameError: await this.userErrorMessage.getText(),
            emailError: await this.emailErrorMessage.getText(),
            passwordError: await this.passwordErrorMessage.getText(),
            termsError: await this.termsError.getText()
        }
    }
}

export default MiroSignUpPage;