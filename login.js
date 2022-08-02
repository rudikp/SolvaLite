const {Builder, By, Key, until} = require('selenium-webdriver');
const by = require('selenium-webdriver/lib/by');
const { Logs } = require('selenium-webdriver/lib/webdriver');

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
    target.sendKeys("82297");

    await driver.wait(until.elementsLocated(By.css(".v-messages__message")));
    const errorChar = await driver.findElement(By.css('.v-messages__message'));
    console.log(errorChar);
    console.log(await errorChar.getText());
    if (await errorChar.getText() == "Phone number less than 9 character"

    )
    console.log("Pass");
    else console.log("Reject");
    return;



    
    //Driver Wait --> Untuk menunggu button submit active
    await driver.wait(until.elementsLocated(By.css(".v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary")));
    //Submit Phone Number
    const buttonSubmit = await driver.findElements(By.css('.v-btn.v-btn--block.v-btn--has-bg.theme--light.v-size--large.primary'));
    buttonSubmit[0].click();
    
    //Driver Wait --> Untuk menunggu label PIN active
    await driver.wait(until.elementsLocated(By.css('.v-otp-input.theme--light')));
    //Input PIN
    const labelPIN = await driver.findElements(By.css('.v-otp-input.theme--light'));
    const inputPIN = await labelPIN[0].findElements(By.css('input[type="password"]')); 
    inputPIN[0].sendKeys(1);
    inputPIN[1].sendKeys(1);
    inputPIN[2].sendKeys(1);
    inputPIN[3].sendKeys(1);
    inputPIN[4].sendKeys(1);
    inputPIN[5].sendKeys(1);

    // Menu Profile
    await driver.wait(until.elementsLocated(By.css('.float__menu__container')));
    const menuProfile = await driver.findElements(By.css('.float__menu__container'));
    const clickMenuProfile = await menuProfile[0].findElements(By.css('.ml-2.v-btn.v-btn--has-bg.v-btn--router.theme--light.v-size--default.white'));
    clickMenuProfile[0].click();

    //Logout
    await driver.wait(until.elementsLocated(By.css('.mt-4.v-btn.v-btn--block.v-btn--text.theme--light.v-size--large.error--text')));
    const buttonLogout = await driver.findElements(By.css('.mt-4.v-btn.v-btn--block.v-btn--text.theme--light.v-size--large.error--text'));
    const buttonLogout2 = await buttonLogout[0].findElements(By.css('.v-btn__content'));
    //console.log(buttonLogout2);
    buttonLogout2[0].click();


   
  } finally {
    //await driver.quit();
  }
})();