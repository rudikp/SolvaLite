const {Builder, By, Key, until} = require('selenium-webdriver');
const by = require('selenium-webdriver/lib/by');

async function getPhoneNumberInputElement(driver) {
    const labelPhoneNumber = await driver.findElements(By.css('.v-text-field__slot'));
    const inputPhoneNumber = await labelPhoneNumber[0].findElements(By.css('[placeholder="80987654321"]'));
    const target = inputPhoneNumber[0];
    return target;
}

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://devmanggis-stdweb.member.design/auth/login');
    // kenapa await? karena function getPhoneNumberInputElement menggunakan `async function`
    const target = await getPhoneNumberInputElement(driver);
    // input phone number
    target.sendKeys("82297617354");
    // await driver.wait(function () {
    //     return driver.isElementPresent(By.css(".v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary"));
    // }, 5000);

    //Driver Wait --> Untuk menunggu button submit active
    await driver.wait(until.elementsLocated(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary')));
    const buttonSubmit = await driver.findElement(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    buttonSubmit[0].click();
    
    //Driver Wait --> Untuk menunggu label PIN active
    await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
    
    const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
    const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]')); 
    inputPIN[0].sendKeys([1]);
    



  } finally {
    //await driver.quit();
  }
})();