import TextElement from "./elements/textElement";
import {by} from "protractor";
import CheckboxElement from "./elements/checkboxElement";
import ButtonElement from "./elements/buttonElement";

// I don't know how to call this page, so I am going to use name from .class attribute in DOM
class SocialtosPage {
    public pageTitle = new TextElement(by.css('#socialtos-title'));
    public miroTermsCheckbox = new CheckboxElement(by.css('#tos-signup-terms'));
    public newSubscriptionCheckbox =  new CheckboxElement(by.css('#tos-signup-subscribe'))
    public continueButton = new ButtonElement(by.css('[data-testid="mr-form-gdpr-btn-signin-1"]'));
}

export default SocialtosPage;