const axios = require('axios');
const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");
const {raw} = require("body-parser");


const url = 'https://www.fahasa.com/index.php/customer/account/login';
const user = '0906278405';
//const user = '0775775228';
const pass = '123choithoi';
//const voucher_id = 1612;
const voucher_id = 1613;

async function main() {
  await open_browser();
}

async function open_browser() {

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-extensions',
      '--no-sandbox'
    ],
    executablePath: executablePath(),
  });


  try {
    const [page] = await browser.pages();
    await page.goto(url);

    await page.setViewport({width: 1200, height: 750});
    await page.waitForSelector('button.fhs-btn-login');
    await page.type('input#login_username', user);
    await page.type('input#login_password', pass);
    await page.click('button.fhs-btn-login');

    await sleep(3000);
    await page.goto('https://www.fahasa.com/onestepcheckout/index');

    await page.evaluate(() => {
      window.scrollTo(0, 1600);
    });

    await sleep(2000);
    await page.click('#tutorial_momopay span.radiomark-big');

    let code = await get_coupon();

    await page.waitForSelector('#fhs_checkout_btn_coupon');
    await clear(page,'#fhs_checkout_coupon');
    await page.type("#fhs_checkout_coupon", code);
    await page.click('span#fhs_checkout_btn_coupon');

    await sleep(649);
    await page.click('button.fhs-btn-orderconfirm');

  } catch (e){
    console.error(e);
    console.error('Some thing not ok');
    await browser.close();
  }
}

async function fetchData() {
  try {
    const requestBody = {
      id: voucher_id,
      limit: 99
    };

    const response = await axios.post('https://www.fahasa.com/node_api/fhsrule/event_couponsshow', requestBody);
    return response.data;
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
}

async function get_coupon() {
  try {
    let code = '';

    while (code === ''){
      try{
        const data = await fetchData();
        if(data.periods){
          for (const period of data.periods) {
            if(period.coupon_code.length && period.coupon_code !== '?????'){
              code = period.coupon_code;
              console.log(code);
            }
          }
        }
      } catch (e){

      }
    }

    return code;

    // Further processing of the fetched data can be done here
  } catch (error) {
    console.error('Error in main function:');
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clear(page, selector) {
  await page.evaluate(selector => {
    document.querySelector(selector).value = "";
  }, selector);
}

main();


