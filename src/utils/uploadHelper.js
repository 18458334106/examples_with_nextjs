import * as qiniu from 'qiniu-js';
// @ts-ignore
import CryptoJS from 'crypto-js'

// 请求接口上传图片
export function uploadFile(file) {
    const uptoken = getToken('h1iZ7ssAbVt35FzE5U8J5aysGtIQqFMWx-c1paMp','PbaelH10u98QMBxlgWa6o2bEsVcYk2u-XoCRi7Yn','19857191790');
    const key = file.name;
    const config = {
        useCdnDomain: true,
        region: qiniu.region.z0,
        forceDirect: true // 是否上传全部采用直传方式
    };
    const putExtra = {
        fname: file.name,
        mimeType: ['image/png', 'image/jpeg', 'image/gif']
    };
    return qiniu.upload(file, key, uptoken, putExtra, config);
}
// eslint-disable-next-line camelcase
export default function getToken(access_key, secret_key, bucketname) {
    // 构造策略
    var putPolicy = {
        "scope": bucketname,
        "deadline": 3600 + Math.floor(Date.now() / 1000)
    }
    var encoded = base64Encode(utf16to8(JSON.stringify(putPolicy)));
    var hash = CryptoJS.HmacSHA1(encoded, secret_key);
    // 构造凭证
    var encodedSign = hash.toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-');
    // eslint-disable-next-line camelcase
    var uploadToken = access_key + ':' + encodedSign + ':' + encoded;
    return uploadToken;
}
function base64Encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        // eslint-disable-next-line eqeqeq
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}