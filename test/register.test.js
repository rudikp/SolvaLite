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
    
        //Button Get Started
        const buttonGetStarted = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')); 
        const clickButton = await buttonGetStarted[0].findElements(By.css('.v-btn__content'));
        clickButton[0].click();

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

      test('Should Be Request OTP', async () => {
        await driver.wait(until.elementsLocated(By.css('.text-h6')));
        await inputPhoneNumberInputElement(driver,"81808210931"); 
        
        await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
        const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
        buttonSubmit[0].click();
        
        const textShouldBe = "Verify Phone Number";
        const textbuttonRequestOTP = "Request OTP";
        const textRegisterForm = "Register Form";
        await driver.wait(until.elementsLocated(By.css('.otp-field-box--0')));
        // const textVerifyPhoneNumber = await driver.findElements(By.css('.text-h6'));
        // expect(await textVerifyPhoneNumber[0].getText()).toBe(textShouldBe);
        const buttonRequestOTP = await driver.findElements(By.css('.mt-12'));
        const buttonRequestOTP1 = await buttonRequestOTP[1].findElements(By.css('button[type="button"]'));
        // console.log(buttonRequestOTP1);
        buttonRequestOTP1[0].click();

        await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
        await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--disabled.v-btn--has-bg.theme--light.v-size--large')));
        
        const buttonRequestOTPDisabled = await driver.findElements(By.css('button[disabled="disabled"]')).catch(()=> null);
        expect(buttonRequestOTPDisabled!=null).toBe(true);
        // console.log(buttonRequestOTPDisabled);

        await driver.wait(until.elementsLocated(By.css('.v-text-field__slot')));
        const labelOTP = await driver.findElements(By.css('.v-text-field__slot'));
        const inputOTP = await labelOTP[0].findElements(By.css('.otp-field-box--0'));
        inputOTP[0].sendKeys(9);
        const inputOTP1 = await labelOTP[1].findElements(By.css('.otp-field-box--1'));
        inputOTP1[0].sendKeys(1);
        const inputOTP2 = await labelOTP[2].findElements(By.css('.otp-field-box--2'));
        inputOTP2[0].sendKeys(9);
        const inputOTP3 = await labelOTP[3].findElements(By.css('.otp-field-box--3'));
        inputOTP3[0].sendKeys(1);
        console.log(inputOTP3);
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const registerForm = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        expect(await registerForm[0].getText()).toBe(textRegisterForm);

      })
    });
