const axios = require('axios');

async function makePostRequest(id) {
  let res = await axios({
    "method": "POST",
    "url": "https://www.fahasa.com/node_api/fhsrule/event_couponsshow",
    "headers": {
      "Authority": "www.fahasa.com",
      "Sec-Ch-Ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "Accept": "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "Sec-Ch-Ua-Mobile": "?0",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://www.fahasa.com",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Referer": "https://www.fahasa.com/say-deal-12-12?fhs_campaign=top_banner",
      "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,vi;q=0.7,und;q=0.6,de;q=0.5",
      "Cookie": "BPC2=041042e17c818dd6d95bce9d64b0e7e1; BPC2Referrer=; frontend=0c66065280e040e086130e062997cb13; frontend_cid=D2QeV2yGUPl8ojnp; ves_added_cart=0; _gcl_au=1.1.1372553293.1607651045; __stdf=0; __stgeo=\"0\"; _fbp=fb.1.1607651045566.1887024363; __stbpnenable=1; _gid=GA1.2.1515686040.1607651046; bxSesC=MTYwNzY1MTA0NTcxNA%3D%3D; boxx_token_id=MGZhOTkwNjItMGQ1My00ZDBjLTgwM2QtYjMxMzBkOWYxODQ5; bxSegDetail=eyJieFNlc1QiOjE2MDc2NTEwNDU3MTQsInVzZXJUeXBlIjoibmV3IiwidXNlclJhbmRvbSI6MC4yMDE5ODg4ODU0OTM3NjAxNSwicHJ2TXYiOiI0MTYiLCJwdWJNdiI6ImJveHgiLCJ1c2VyU2VnIjoiX2RlZmF1bHQiLCJtb2RlbFNlZyI6ImJveHhfX2RlZmF1bHQifQ%3D%3D; __stat=\"BLOCK\"; __stp={\"visit\":\"returning\",\"uuid\":\"0fa99062-0d53-4d0c-803d-b3130d9f1849\"}; _gat_UA-39733013-1=1; bxSesT=MTYwNzcwMzAzNTE5NA%3D%3D; __sts={\"sid\":1607703033494,\"tx\":1607703068731,\"url\":\"https%3A%2F%2Fwww.fahasa.com%2Fsay-deal-12-12%3Ffhs_campaign%3Dtop_banner\",\"pet\":1607703068731,\"set\":1607703033494,\"pUrl\":\"https%3A%2F%2Fwww.fahasa.com%2F\",\"pPet\":1607703033494,\"pTx\":1607703033494}; _ga_460L9JMC2G=GS1.1.1607703033.2.1.1607703077.0; _ga=GA1.1.1974450437.1607651045",
      "Accept-Encoding": "gzip"
    },
    "data": "id="+id+"&limit=99"
  });

  if(res.data.result){
    res.data.periods.forEach(function(coupon){
      console.log(id + '\t' + coupon.coupon_code + '\t' + coupon.title + '\t' + coupon.rule_description + '\t' + coupon.start_show);
    });
  }

}

for (var index = 260; index < 280; index++) {
  makePostRequest(index);
}

