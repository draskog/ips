const args = {
    c: 1,
    v: '01',
    k: 'PR',
    r: '275000033008702439',
    i: 'RSD1295,',
    n: 'Drasko Gajic, Paunova 43, Beograd',
    rs: 'test-2020',
    sf: '289',
    s: 'Rodjendan',
    'to-datauri': true
};
const qrcode = require("qrcode");
const ips = require('ips-qr-code');
ips(args)
    .then(function (dataString)
    {
        console.log(qrcode.toDataURL(dataString, function (err, url)
            {
                console.log(url);
            })
        );
    })
    .catch(e =>
    {
        console.error(`Arguments validation error`);
        console.error(`--${e.path} '${options[e.path]}'`, e.message);
    });
