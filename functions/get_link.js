const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6ImowbnRveC0wMCIsInVzZXJfaWQiOiI3OTk2Mzk2OTQyMiIsInNlY3JldCI6ImZhZWJiZGI2MjgyYjUzYzU3YjVhMzcwMmUzNGJkYjk1ZTFjOTllMTRhZGI4ZWU3Mjk1MWIzNmNhNmVmZWUyNmQifX0=';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);

function start(price, code, callback) {
    var fields = {
        amount: price,
        currency: 'RUB',
        expirationDateTime: '2023-01-01T00:00:00+06:00'
    };
    qiwiApi.createBill(code, fields).then(data => {
        return callback(data);
    });
}

module.exports = {
    start
}