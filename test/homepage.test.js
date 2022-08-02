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

      });
      
      afterAll(async () => {
        //await driver.quit();
        // console.log("ini after each");
      });

    
    async function buttonBackelement(driver){
        const buttonBack = await driver.findElements(By.css('.v-btn.v-btn--icon.v-btn--round.theme--light.v-size--default'));
        buttonBack[0].click();
    }

    
    test('Should Be Success go to Reward Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuReward = await driver.findElements(By.css('a[href="/app/reward"'));
        //const clickMenuReward = await menuReward[0];
        menuReward[0].click();
        await driver.wait(until.elementsLocated(By.css('a[href="/app/reward/my-voucher/used-voucher"]')));
        const url = 'https://devmanggis-stdweb.member.design/app/reward';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to News and Promo Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuNewsPromo = await driver.findElements(By.css('a[href="/app/news-promo"'));
        // const clickMenuReward = await menuReward[0];
        menuNewsPromo[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'News & Promo'
        const pageNewsPromo = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textNewsPromo = await pageNewsPromo[0].getText();
        expect(await textNewsPromo.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/news-promo';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to Point History Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuPointHistory = await driver.findElements(By.css('a[href="/app/point"]'));
        menuPointHistory[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Point History'
        const pagePointHistory = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textPointHistory = await pagePointHistory[0].getText();
        expect(await textPointHistory.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/point';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });
    test('Should Be Success go to Transaction History Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuTransactionHistory = await driver.findElements(By.css('a[href="/app/transaction-history"]'));
        menuTransactionHistory[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Transaction History'
        const pageTransactionHistory = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textTransactionHistory = await pageTransactionHistory[0].getText();
        expect(await textTransactionHistory.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/transaction-history';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to Explore Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuExplore = await driver.findElements(By.css('a[href="/app/explore"]'));
        menuExplore[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Explore'
        const pageExplore = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textExplore = await pageExplore[0].getText();
        expect(await textExplore.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/explore';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to Mission Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuMission = await driver.findElements(By.css('a[href="/app/mission"]'));
        menuMission[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Mission'
        const pageMission = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textMission = await pageMission[0].getText();
        expect(await textMission.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/mission';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to Gift Code Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuGiftCode = await driver.findElements(By.css('a[href="/app/gift-code"]'));
        menuGiftCode[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Gift Code'
        const pageGiftCode = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textGiftCode = await pageGiftCode[0].getText();
        expect(await textGiftCode.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/gift-code';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });

    test('Should Be Success go to Referral Page', async()=>{
        await driver.wait(until.elementsLocated(By.css('a[href="/app/profile"]')));
        const menuGiftCode = await driver.findElements(By.css('a[href="/app/referral"]'));
        menuGiftCode[0].click();
        await driver.wait(until.elementsLocated(By.css('.text-subtitle-1.text-center')));
        const textShouldBe = 'Referral Program'
        const pageReferral = await driver.findElements(By.css('.text-subtitle-1.text-center'));
        const textReferral = await pageReferral[0].getText();
        expect(await textReferral.trim()).toBe(textShouldBe);
        const url = 'https://devmanggis-stdweb.member.design/app/referral';
        expect(await driver.getCurrentUrl()).toBe(url);
        
        await buttonBackelement(driver);
    });
});