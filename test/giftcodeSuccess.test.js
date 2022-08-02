const {Builder, By, Key, until} = require('selenium-webdriver');
const by = require('selenium-webdriver/lib/by');
const { Logs } = require('selenium-webdriver/lib/webdriver');
jest.setTimeout(60000);

describe ("Cek Login Page", function(){
    let driver;

    async function inputPhoneNumberInputElement(driver, sendKeys) {
      const labelPhoneNumber = await driver.findElements(By.css('.v-text-field__slot'));
      const inputPhoneNumber = await labelPhoneNumber[0].findElements(By.css('[placeholder="123xxxx"]'));
      const target = inputPhoneNumber[0];
      target.sendKeys(sendKeys);
    }
    async function inputGiftCodeElement(driver, sendKeys) {
      const labelGiftCode = await driver.findElements(By.css('.v-text-field__slot'));
      const inputGiftCode = await labelGiftCode[0].findElements(By.css('[placeholder="Please input your gift code"]'));
      const target = inputGiftCode[0];
      target.sendKeys(sendKeys);
    }
    async function clearGiftCodeElement(driver) {
      const labelGiftCode = await driver.findElements(By.css('.v-text-field__slot'));
      const inputGiftCode = await labelGiftCode[0].findElements(By.css('[placeholder="Please input your gift code"]'));
      const target = inputGiftCode[0];
      await target.sendKeys(Key.CONTROL + "a")
      await target.sendKeys(Key.DELETE)
    }

    beforeAll(async () => {
        jest.setTimeout(60000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://devmanggis-stdweb.member.design/auth/login');
        // console.log("ini before All");
        
        //Button Get Started
        const buttonGetStarted = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')); 
        const clickButton = await buttonGetStarted[0].findElements(By.css('.v-btn__content'));
        clickButton[0].click();
        
        //Input Phone Number
        await driver.wait(until.elementsLocated(By.css('.text-h6')));
        await inputPhoneNumberInputElement(driver,"8229761735412"); 
        
        await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
        const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        buttonSubmit[0].click();

        //Input PIN
        await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
        const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
        const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]'));  
        inputPIN[0].sendKeys(1);
        inputPIN[1].sendKeys(2);
        inputPIN[2].sendKeys(3);
        inputPIN[3].sendKeys(4);
        inputPIN[4].sendKeys(5);
        inputPIN[5].sendKeys(6);
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));

        //Page GiftCode
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuGiftCode = await driver.findElements(By.css('a[href="/app/gift-code"]'));
        menuGiftCode[0].click();
      });

      afterAll(async () => {
        //await driver.quit();
        // console.log("ini after each");
      });

    //   test('Should Be Success Claim Gift Code with Voucher', async()=>{
    //     const textShouldBe1 = "Claim Success!";
    //     const textShouldBe2 = "You have successfully claim your gift code.";
    //     const textButton1 = "Go To My Voucher";
    //     const textButton2 = "Input Another Code";
    //     await clearGiftCodeElement(driver);
    //     await inputGiftCodeElement(driver,"GCSUCCESS2");
    //     await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
    //     const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    //     buttonClaim[0].click();
    //     await driver.wait(until.elementsLocated(By.css('.mt-4.text-h5.grey--text.text--darken-4')));
    //     const textClaimSuccess1 = await driver.findElement(By.css('.mt-4.text-h5.grey--text.text--darken-4'));
    //     const textClaimSuccess2 = await driver.findElement(By.css('.mt-2.text-body-2.grey--text.text--darken-1'));
    //     const buttonGoToMyVoucher = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    //     const buttonInputAnotherCode = await driver.findElements(By.css('.mt-4.v-btn.v-btn--block.v-btn--text.theme--light.v-size--large.primary--text'));
    //     expect(await textClaimSuccess1.getText()).toBe(textShouldBe1);
    //     expect(await textClaimSuccess2.getText()).toBe(textShouldBe2);
    //     expect(await buttonGoToMyVoucher[1].getText()).toBe(textButton1);
    //     expect(await buttonInputAnotherCode[0].getText()).toBe(textButton2);
      
    //   });
      test('Should Be Success Claim Gift Code with Bonus Point', async()=>{
        const textShouldBe1 = "Claim Success!";
        const textShouldBe2 = "You have successfully claim your gift code.";
        const textButton1 = "Back to Home";
        const textButton2 = "Input Another Code";
        // await clearGiftCodeElement(driver);
        await inputGiftCodeElement(driver,"GCSUCCESS3");
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
        const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        buttonClaim[0].click();
        await driver.wait(until.elementsLocated(By.css('.mt-4.text-h5.grey--text.text--darken-4')));
        const textClaimSuccess1 = await driver.findElement(By.css('.mt-4.text-h5.grey--text.text--darken-4'));
        const textClaimSuccess2 = await driver.findElement(By.css('.mt-2.text-body-2.grey--text.text--darken-1'));
        const buttonGoToMyVoucher = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        const buttonInputAnotherCode = await driver.findElements(By.css('.mt-4.v-btn.v-btn--block.v-btn--text.theme--light.v-size--large.primary--text'));
        expect(await textClaimSuccess1.getText()).toBe(textShouldBe1);
        expect(await textClaimSuccess2.getText()).toBe(textShouldBe2);
        expect(await buttonGoToMyVoucher[1].getText()).toBe(textButton1);
        expect(await buttonInputAnotherCode[0].getText()).toBe(textButton2);
      
      });
          
});