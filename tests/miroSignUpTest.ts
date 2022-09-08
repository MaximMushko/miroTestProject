import {browser} from "protractor";

import chai from "chai";
import config from "config";
import MiroSignUpPage from '../pages/miroSignUpPage';
import CheckEmailPage from '../pages/checkMailPage';
import {generateEmail} from '../utils/utils';
import SingleSignOnPage from "../pages/singleSignOnPage";
import SocialtosPage from "../pages/socialtosPage";
const { expect } = chai;

const miroSignUpPage = new MiroSignUpPage();
const checkEmailPage = new CheckEmailPage();
const ssoPage = new SingleSignOnPage();
const socialtosPage = new SocialtosPage();

describe('Tests for Sign Up at Miro functionality', () => {

    beforeEach(async () => {
        await browser.get('https://miro.com/signup');
    });

    describe('Check Labels on Miro Sign Up page tests', () => {
        it('Check text and subtext on sign up page', async () => {
            const text = await miroSignUpPage.pageText.getText();
            const subText = await miroSignUpPage.pageSubText.getText();

            expect(text).to.be.eql("Sign up for free today");
            expect(subText).to.be.eql("Use your work email to make it easier to join or invite your colleagues.");
        });

        it('Check terms and policy agreed checkbox label', async () => {
            const termsAgreeLabel = await miroSignUpPage.termPolicyLabel.getText();

            expect(termsAgreeLabel).to.be.eql('I agree to Miro Terms and Privacy Policy.');
        });

        it('Check subscribe to miro news label', async () => {
            const subscribeLabel = await miroSignUpPage.miroNewsLabel.getText();

            expect(subscribeLabel).to.be.eql('I agree to receive Miro news and updates.');
        });
    });

    describe('Password validations tests',  () => {
        it('Password less that 8 symbols', async () => {
            const password = config.get('shortPassword');

            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.waitForStatusBar();

            const passwordHint = await miroSignUpPage.passwordHint.getText();

            expect(passwordHint).to.be.eql('Please use 8+ characters for secure password.')
        });

        it('Password 8 symbols', async () => {
            const password = config.get('password8Sign');

            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.waitForStatusBar();

            const passwordHint = await miroSignUpPage.passwordHint.getText();

            expect(passwordHint).to.be.eql('So-so password')
        });

        it('Week password', async () => {
            const password = config.get('weekPassword');

            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.waitForStatusBar();

            const passwordHint = await miroSignUpPage.passwordHint.getText();

            expect(passwordHint).to.be.eql('Weak password')
        });

        it('Good password', async () => {
            const password = config.get('goodPassword');

            await miroSignUpPage.passwordField.typeKeys(password);

            const passwordHint = await miroSignUpPage.passwordHint.getText();

            expect(passwordHint).to.be.eql('Good password')
        });

        it('Strong password', async () => {
            const password = config.get('password');

            await miroSignUpPage.passwordField.typeKeys(password);
            const passwordHint = await miroSignUpPage.passwordHint.getText();

            expect(passwordHint).to.be.eql('Great password')
        })
    })

    describe('Negative tests for Sign Up page', () => {
        it('Incorrect email format', async () => {
            const email = config.get('incorrectEmail');

            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.signInButton.clickOnButton();

            const errors = await miroSignUpPage.getLoginFormErrors();
            expect(errors.emailError).to.be.eql('Enter a valid email address.');
        })

        it('SignUp without required name fields', async () => {
            const email = config.get('correctEmail');
            const password = config.get('password');

            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.signInButton.clickOnButton();

            const errors = await miroSignUpPage.getLoginFormErrors();
            expect(errors.nameError).to.be.eql('Please enter your name.');
        });

        it('SignUp without required password fields', async () => {
            const name = config.get('testUser');
            const email = config.get('correctEmail');

            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.userNameField.typeKeys(name);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();

            const errors = await miroSignUpPage.getLoginFormErrors();
            expect(errors.passwordError).to.be.eql('Enter your password.');
        });

        it('SignUp without agree of terms', async () => {
            const name = config.get('testUser');
            const email = config.get('correctEmail');
            const password = config.get('password');

            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.userNameField.typeKeys(name);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.signInButton.clickOnButton();

            const errors = await miroSignUpPage.getLoginFormErrors();
            expect(errors.termsError).to.be.eql('Please agree with the Terms to sign up.');
        });
    });

    describe('Positive tests for Sign Up page', () => {
        it('Successfully signUp case', async () => {
            const userName = config.get('testUser');
            const email = generateEmail('cisco', 'com');
            const password = config.get('password');

            await miroSignUpPage.userNameField.typeKeys(userName);
            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();
            await miroSignUpPage.miroNewsCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();

            const pageTitle = await checkEmailPage.pageTitle.getText();

            expect(pageTitle).to.be.eql('Check your email')

            const pageSubText = await checkEmailPage.pageText.getText();

            expect(pageSubText).to.be.eql(`We've sent you a six-digit confirmation code to ${email}. Please enter it below to confirm your email address.`)

            const enterCodeFieldIsDisplayed = await checkEmailPage.codeInputBox.isDisplayed();
            expect(enterCodeFieldIsDisplayed).to.be.true

            const sendCodeAgainLabel = await checkEmailPage.sendCodeAgainLabel.getText();

            expect(sendCodeAgainLabel).to.be.eql('Send code again or find more information in Help Center.')

            const contactUs = await checkEmailPage.contactUsLabel.getText();

            // this assertion will fail. I have no idea why the link is hidden. For me, it's a potential defect
            expect(contactUs).to.be.eql('If you still haven\'t received the email, please contact us')

            //we are not able to test the real code flow with a fake test email. It could be tested manually or by using special account
        });

        it('Try to register a new user with the same email', async () => {
            const userName = config.get('testUser');
            const email = config.get('existingEmail');
            const password = config.get('password');

            await miroSignUpPage.userNameField.typeKeys(userName);
            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();
            await miroSignUpPage.miroNewsCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();
            await miroSignUpPage.waitForDuplicateEmailErrorMessage()

            const errors = await miroSignUpPage.getLoginFormErrors();
            expect(errors.emailError).to.be.eql('Sorry, this email is already registered');
        });

        it('Sign Up and enter incorrect code', async () => {
            const userName = config.get('testUser');
            const email = generateEmail('cisco', 'com');
            const password = config.get('password');
            const fakeCode = config.get('testCode')

            await miroSignUpPage.userNameField.typeKeys(userName);
            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();
            await miroSignUpPage.miroNewsCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();

            const pageTitle = await checkEmailPage.pageTitle.getText();

            expect(pageTitle).to.be.eql('Check your email')

            await checkEmailPage.codeInputBox.typeKeys(fakeCode)

            const codeErrorMessage = await checkEmailPage.getCodeErrorMessage();
            expect(codeErrorMessage).to.be.eql('Enter a valid code.')
        });

        it('Sign Up using SSO account', async () => {
            const userName = config.get('testUser');
            const email = config.get('ssoEmail');
            const password = config.get('password');

            await miroSignUpPage.userNameField.typeKeys(userName);
            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();
            await miroSignUpPage.miroNewsCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();

            const pageTitle = await ssoPage.pageTitle.getText();
            expect(pageTitle).to.be.eql('Single Sign On');

            const pageText = await ssoPage.pageText.getText();
            expect(pageText).to.be.eql('Your organization uses Single Sign On (SSO) with Miro. Please sign in using your SSO credentials.');

            const ssoEmail = await ssoPage.emailInputBox.getTypedValue();
            expect(ssoEmail).to.be.eql(email);

            ssoPage.continueButton.isDisplayed();
            // we are not going to click on Continue SSO button in this case

            ssoPage.signInWithoutSSO.clickOnLink();
            expect(await browser.getCurrentUrl()).contains('https://miro.com/login/');
        });

        it('Sing Up using Google Account', async () => {
            const isGoogleSignUpDisplayed = await miroSignUpPage.signUpWithGoogle.isDisplayed();

            expect(isGoogleSignUpDisplayed).to.be.true;
            await miroSignUpPage.signUpWithGoogle.clickOnButton();

            const pageText = await socialtosPage.pageTitle.getText();
            expect(pageText).to.be.eql('Review the\nTerms to sign up');

            socialtosPage.miroTermsCheckbox.selectCheckbox();
            socialtosPage.newSubscriptionCheckbox.selectCheckbox();

            const isContinueButtonDisplayed = await socialtosPage.continueButton.isDisplayed();
            expect(isContinueButtonDisplayed).to.be.true;
            socialtosPage.continueButton.clickOnButton();

            expect(await browser.getCurrentUrl()).contains('https://accounts.google.com/');
        });
    });
});
