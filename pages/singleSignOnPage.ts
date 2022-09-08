import {by} from "protractor";
import TextElement from "./elements/textElement";
import TextInputElement from "./elements/textInputElement";
import ButtonElement from "./elements/buttonElement";

class SingleSignOnPage {
    public pageTitle = new TextElement(by.css('h1.signup__title-form'));
    public pageText = new TextElement(by.css('div.signup__subtitle-form'));
    public emailInputBox = new TextInputElement(by.css('#email'));
    public continueButton = new ButtonElement(by.css('button.signup__submit'));
    public signInWithoutSSO = new TextElement(by.css('[data-testid="mr-link-without-sso-1"]'));
}

export default SingleSignOnPage;