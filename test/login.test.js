const {Builder, By, Key, until} = require('selenium-webdriver');
const by = require('selenium-webdriver/lib/by');
const { Logs } = require('selenium-webdriver/lib/webdriver');
jest.setTimeout(60000);

describe ("Cek Login Page", function(){
    let driver;
    beforeAll(async () => {
        jest.setTimeout(60000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://devmanggis-stdweb.member.design/auth/login');
        // console.log("ini before All");
      });
      
      afterAll(async () => {
        //await driver.quit();
        // console.log("ini after each");
      });


      async function inputPhoneNumberInputElement(driver, sendKeys) {
        const labelPhoneNumber = await driver.findElements(By.css('.v-text-field__slot'));
        const inputPhoneNumber = await labelPhoneNumber[0].findElements(By.css('[placeholder="123xxxx"]'));
        const target = inputPhoneNumber[0];
        target.sendKeys(sendKeys);
      }
      async function clearPhoneNumberInputElement(driver) {
        const labelPhoneNumber = await driver.findElements(By.css('.v-text-field__slot'));
        const inputPhoneNumber = await labelPhoneNumber[0].findElements(By.css('[placeholder="123xxxx"]'));
        const target = inputPhoneNumber[0];
        await target.sendKeys(Key.CONTROL + "a")
        await target.sendKeys(Key.DELETE)
      }
      test('Should Be Click Get Started', async()=>{
        const buttonGetStarted = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')); 
        const clickButton = await buttonGetStarted[0].findElements(By.css('.v-btn__content'));
        const clickButtonGetStarted = clickButton[0];
        clickButtonGetStarted.click();
      });

      test('Should Be Disabled Button Submit',async () => {
        //Await submit Button
        //find element submit button disabled
        //Expect button
        const buttonSubmitDisabled = await driver.findElement(By.css('button[disabled="disabled"]')).catch(()=> null);
        // console.log(buttonSubmitDisabled);
        // await inputPhoneNumberInputElement(driver,"82297");
        // await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
        // const errorChar = await driver.findElement(By.css('.v-messages__message'));
        expect(buttonSubmitDisabled!=null).toBe(true);
      });

    test('Should Be error with Phone Number less 9 Char',async () => {
        //Input Less Char
        //show error message
        //Find Element error message
        //Expect inner text error message "Phone Number less 9 Char"
        const errorShouldBe = "Phone number less than 9 character";
        await inputPhoneNumberInputElement(driver,"82297");
        await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
        const errorChar = await driver.findElement(By.css('.v-messages__message'));
        expect(await errorChar.getText()).toBe(errorShouldBe);
      });
      test('Should Be error with Phone number is required',async () => {
        const errorShouldBe = "Phone number is required";
        await clearPhoneNumberInputElement(driver);
        await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
        const errorChar = await driver.findElement(By.css('.v-messages__message'));
        expect(await errorChar.getText()).toBe(errorShouldBe);
      });
      test('Should Be error with field must include only number',async () => {
        const errorShouldBe = "The field must include only number";
        await clearPhoneNumberInputElement(driver);
        await inputPhoneNumberInputElement(driver,"asdadsasd");
        await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
        const errorChar = await driver.findElement(By.css('.v-messages__message'));
        expect(await errorChar.getText()).toBe(errorShouldBe);
      });

      //success
      //Input Phone Number correct
      //await button submit
      //find element button submit enable
      //click button submit
      //await page input pin
      //find element input pin
      test('Should Be Success Login',async () => {
        await clearPhoneNumberInputElement(driver);
        await inputPhoneNumberInputElement(driver,"82297617354");
        
        await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
        //const buttonSubmitEnabled = await driver.findElements(By.css('button[disabled="disabled"]'));
        // console.log(buttonSubmitEnabled);
        // expect(buttonSubmitEnabled.length).toBe(0);
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
        const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        // toBe GreaterThan maksudnya length dari panjang array elements
        expect(buttonSubmit.length).toBe(1);
        buttonSubmit[0].click();
        await driver.wait(until.elementsLocated(By.css('a[href="/auth/forgot-pin"')));
        const inputPIN = await driver.findElements(By.css('.text-h6'));

        // console.log("Ini Input PIN");
        // console.log(inputPIN);
        const textShouldBe = "Input PIN";
        const textInputPIN = await inputPIN[0].getText();
        // console.log(textInputPIN);
        expect(textInputPIN.trim()).toBe(textShouldBe);
        // console.log(textShouldBe);

      });


      

      
});