import {browser} from "protractor";

import chai from "chai";
import config from "config";
import MiroSignUpPage from '../pages/miroSignUpPage';
import CheckEmailPage from '../pages/checkMailPage';
import {generateEmail} from '../utils/utils';
const { expect } = chai;

const miroSignUpPage = new MiroSignUpPage();
const checkEmailPage = new CheckEmailPage();

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

            const pageTitle = await checkEmailPage.getPageTitle();

            expect(pageTitle).to.be.eql('Check your email')

            const pageSubText = await checkEmailPage.getPageText();

            expect(pageSubText).to.be.eql(`We've sent you a six-digit confirmation code to ${email}. Please enter it below to confirm your email address.`)

            const enterCodeFieldIsDisplayed = await checkEmailPage.checkCodeInputBox();
            expect(enterCodeFieldIsDisplayed).to.be.true

            const sendCodeAgainLabel = await checkEmailPage.getSendCodeAgainLabel();

            expect(sendCodeAgainLabel).to.be.eql('Send code again or find more information in Help Center.')
            //we are not able to test the real code flow with a fake test email. It could be tested manually or by using special accaunt
        });

        it('Try to register a new user with the same email', async () => {
            const userName = config.get('testUser');
            const email = config.get('correctEmail');
            const password = config.get('password');

            await miroSignUpPage.userNameField.typeKeys(userName);
            await miroSignUpPage.emailField.typeKeys(email);
            await miroSignUpPage.passwordField.typeKeys(password);
            await miroSignUpPage.termPolicyCheckBox.selectCheckbox();
            await miroSignUpPage.miroNewsCheckBox.selectCheckbox();

            await miroSignUpPage.signInButton.clickOnButton();

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

            const pageTitle = await checkEmailPage.getPageTitle();

            expect(pageTitle).to.be.eql('Check your email')

            await checkEmailPage.enterCodeToInputBox(fakeCode)

            const codeErrorMessage = await checkEmailPage.getCodeErrorMessage();
            expect(codeErrorMessage).to.be.eql('Enter a valid code.')
        });
    });
});
