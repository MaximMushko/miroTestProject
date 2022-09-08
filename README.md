This is a simple framework to tests Miro application

Scripts are testing basic sign up functionality on 4 pages:

1. Sign Up page
2. Email verification page
3. SSO page
4. Sing Up using Google Account

Framework is using the following technologies:
1. Typescript
2. NPM
3. Protractor
4. Jasmine Test Runner
5. Allure for reporting

Before run the tests execute following command:

<code>npm install</code>

Then start webdriver-manager by following command:

<code>npm run start</code>

webdriver-manager also can ask you to update drivers. In this case, please run:

<code>webdriver-manager update</code>

To compile the code from TS to JS run the command:

<code>npm run compile</code>

This command start the compile in --watch mode to catch any changes in files and recompile them automatically

<b>FYI</b>, this command are failing at the moment on trying to compile types from node_modules, however isn't a blocker and code is compaling

To run the tests execute command:

<code>npm run test</code>

To open the report please run the following command:

<code>npm run open</code>

I've found one potential defect with the hidden text with contact information on the Check Email Page 

<i>"If you still haven't received the email, please contact us"</i>