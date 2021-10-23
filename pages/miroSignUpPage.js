
class MiroSignUpPage {

    constructor() {
        this.pageText = by.css('.signup > h1');
        this.pageSubText = by.css('.signup > div.ab-signup-usa--free-text')
        this.userNameField = by.css('#name');
        this.emailField = by.css('#email');
        this.passwordField = by.css('#password');
        this.erorrMessageLabel = by.css('');
        this.passwordBar = by.css('');
        this.termPolicyCheckBox = by.css('');
        this.miroNewsCheckBox = by.css('');
    }

    getPageText(){
        return element(this.pageText).getText();
    }

    getPageSubText(){
        return element(this.pageSubText).getText();
    }

    enterUserName(userName) {
        return element(this.usserNameField).sendKeys(userName)
    }

    enterEmailField(email) {
        return element(this.emailField).sendKeys(email)
    }

    enterPassword(password) {
        return element(this.passwordField).sendKeys(password);
    }

    async getFiledsErrorMessages() {
        const elements = element.all(this.erorrMessageLabel);
        return Promise.all(elements.map(elem => elem.getText()));
    }

    getPasswordBar() {
        return element(this.passwordBar).getText();
    }
}

module.exports = new MiroSignUpPage();
