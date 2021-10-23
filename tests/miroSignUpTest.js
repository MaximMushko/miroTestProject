const chai = require('chai');
const config = require('config');
const miroSignUpPage = require('../pages/miroSignUpPage');
const { expect } = chai;

browser.waitForAngularEnabled(false)

describe('Tests for Sign Up at Miro fnctionality', () => {

    beforeEach(async () => {
        await browser.get('https://miro.com/signup');
    });

    it('Check text and subtext on sign up page', async () => {
        const text = await miroSignUpPage.getPageText();
        const subText = await miroSignUpPage.getPageSubText();

        expect(text).to.be.eql("Get started free today");
        expect(subText).to.be.eql("No credit card required");
    });

    it('Password less that 8 symbols', async () => {
        const password = config.get('shortPassword');

        await miroSignUpPage.enterPassword(password);
        const passwordHint = await miroSignUpPage.getPasswordHint();

        expect(passwordHint).to.be.eql('Please use 8+ characters for secure password')
    });

    it('Password 8 symbols', async () => {
        const password = config.get('password8Sign');

        await miroSignUpPage.enterPassword(password);
        const passwordHint = await miroSignUpPage.getPasswordHint();

        expect(passwordHint).to.be.eql('So-so password')
    });

    it('Week password', async () => {
        const password = config.get('weekPassword');

        await miroSignUpPage.enterPassword(password);
        const passwordHint = await miroSignUpPage.getPasswordHint();

        expect(passwordHint).to.be.eql('Weak password')
    });

    it('Good password', async () => {
        const password = config.get('goodPassword');

        await miroSignUpPage.enterPassword(password);
        const passwordHint = await miroSignUpPage.getPasswordHint();

        expect(passwordHint).to.be.eql('Good password')
    });

    it('Strong password', async () => {
        const password = config.get('password');

        await miroSignUpPage.enterPassword(password);
        const passwordHint = await miroSignUpPage.getPasswordHint();

        expect(passwordHint).to.be.eql('Great password')
    })

    fit('Incorrect email format', async () => {
        const email = config.get('incorrectEmail');

        await miroSignUpPage.enterEmail(email);
        await miroSignUpPage.clickSignUpButton();

        const errors = await miroSignUpPage.getLoginFormErrors();
        expect(errors.emailError).to.be.eql('The email you entered is incorrect.');
    })

    it('SignUp without required name fields', () => {

    });

    it('SignUp without required password fields', () => {

    });

    it('SignUp without agree of terms', () => {

    });

    it('Succesfully signUp case', () => {

    });

});
