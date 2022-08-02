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
        await inputPhoneNumberInputElement(driver,"82297617354"); 
        
        await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
        const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        buttonSubmit[0].click();

        //Input PIN
        await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
        const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
        const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]'));  
        inputPIN[0].sendKeys(1);
        inputPIN[1].sendKeys(1);
        inputPIN[2].sendKeys(1);
        inputPIN[3].sendKeys(1);
        inputPIN[4].sendKeys(1);
        inputPIN[5].sendKeys(1);
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

   
    test('Should Be Error Gift Code is Stopped', async()=>{
      const errorShouldBe = "Gift code is Stopped/Expired";
      await inputGiftCodeElement(driver,"GCSTOPPED");
      await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
      const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
      buttonClaim[0].click();
      await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
      const errorChar = await driver.findElement(By.css('.v-messages__message'));
      expect(await errorChar.getText()).toBe(errorShouldBe);
      
    });
    test('Should Be Error Gift Code is Expired', async()=>{
      const errorShouldBe = "Gift code is Stopped/Expired";
      await clearGiftCodeElement(driver);
      await inputGiftCodeElement(driver,"GCEXPIRED");
      await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
      const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
      buttonClaim[0].click();
      await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
      const errorChar = await driver.findElement(By.css('.v-messages__message'));
      expect(await errorChar.getText()).toBe(errorShouldBe);
    
    });
    test('Should Be Error Gift Code is Not Started', async()=>{
      const errorShouldBe = "Gift code is not started";
      await clearGiftCodeElement(driver);
      await inputGiftCodeElement(driver,"GCNOTSTARTED");
      await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
      const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
      buttonClaim[0].click();
      await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
      const errorChar = await driver.findElement(By.css('.v-messages__message'));
      expect(await errorChar.getText()).toBe(errorShouldBe);
    
    });
    // test('Should Be Error Gift Code is Success Claimed', async()=>{
    //   const errorShouldBe = "You've successfully claimed the gift code";
    //   await clearGiftCodeElement(driver);
    //   await inputGiftCodeElement(driver,"GCSUCCESS");
    //   await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
    //   const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    //   buttonClaim[0].click();
    //   await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
    //   const errorChar = await driver.findElement(By.css('.v-messages__message'));
    //   expect(await errorChar.getText()).toBe(errorShouldBe);
    
    // });
    test('Should Be Error Gift Code is Not Eligible', async()=>{
      const errorShouldBe = "You’re not eligible for the gift code.";
      await clearGiftCodeElement(driver);
      await inputGiftCodeElement(driver,"GCNOTELIGIBLE");
      await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
      const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
      buttonClaim[0].click();
      await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
      const errorChar = await driver.findElement(By.css('.v-messages__message'));
      expect(await errorChar.getText()).toBe(errorShouldBe);
    
    });
    test('Should Be Error Gift Code is Fully Claimed', async()=>{
      const errorShouldBe = "Gift code is fully claimed";
      await clearGiftCodeElement(driver);
      await inputGiftCodeElement(driver,"GCFULLY");
      await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
      const buttonClaim = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
      buttonClaim[0].click();
      await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
      const errorChar = await driver.findElement(By.css('.v-messages__message'));
      expect(await errorChar.getText()).toBe(errorShouldBe);
    
    });

    
});