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

    it('')

});
