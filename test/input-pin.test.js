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

test('Should Be Success Login',async () => {    
    await clearPhoneNumberInputElement(driver);
    await inputPhoneNumberInputElement(driver,"82297617354");
    
    await driver.wait(until.elementsLocated(By.css('button[disabled="disabled"]')));
    const buttonSubmitEnabled = await driver.findElements(By.css('button[disabled="disabled"]'));
     // console.log(buttonSubmitEnabled);
    //expect(buttonSubmitEnabled.length).toBe(0);
    await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
    const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    // toBe GreaterThan maksudnya length dari panjang array elements
    expect(buttonSubmit.length).toBe(1);
    buttonSubmit[0].click();
    await driver.wait(until.elementsLocated(By.css('a[href="/auth/forgot-pin"]')));
    const inputPIN = await driver.findElements(By.css('.text-h6'));

     // console.log("Ini Input PIN");
     // console.log(inputPIN);

    const textShouldBe = "Input PIN";
    const textInputPIN = await inputPIN[0].getText();
     // console.log(textInputPIN);
    expect(textInputPIN.trim()).toBe(textShouldBe);
    //console.log(textShouldBe);

  });

  test('Should Be error with Incorrect PIN', async()=>{
    const errorShouldBe = "Incorrect PIN, please try again";
    await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
    
    const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
    const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]')); 
    inputPIN[0].sendKeys(0);
    inputPIN[1].sendKeys(0);
    inputPIN[2].sendKeys(0);
    inputPIN[3].sendKeys(0);
    inputPIN[4].sendKeys(0);
    inputPIN[5].sendKeys(0);

    await driver.wait(until.elementsLocated(By.css('.text-caption.error--text')));
    const errorIncorectPIN = await driver.findElements(By.css('.text-caption.error--text'));
    // console.log(errorIncorectPIN);
    const incorrectPINText =  await errorIncorectPIN[0].getText(); 
    // console.log(incorrectPINText);
    expect(await incorrectPINText.trim()).toBe(errorShouldBe);

  });
  test('Should Be success Input PIN', async()=>{
    await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
    
    const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
    // const clickInputPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
    // clickInputPIN[0].click();
    const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]'));

    inputPIN[0].sendKeys(1);
    inputPIN[1].sendKeys(1);
    inputPIN[2].sendKeys(1);
    inputPIN[3].sendKeys(1);
    inputPIN[4].sendKeys(1);
    inputPIN[5].sendKeys(1);
    
    const textShouldBe = 'pts';

    //untuk cek url
    //const url = 'https://devmanggis-stdweb.member.design/app/reward'
    await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
    // expect(await driver.getCurrentUrl()).toBe(url);
    // await driver.getCurrentUrl().toBe
    const homePage = await driver.findElements(By.css('.col.col-auto'));
    const textPts = await homePage[2].getText();
    expect(await textPts.trim()).toBe(textShouldBe);
    

  });



});