const Element = require('./element');
const axios = require('axios');
const { yandexKey } = require('../config');
const devDeugger = require('../debugger');
availableLangs = [
    { code: "af", name: "Afrikaans" },
    { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" },
    { code: "az", name: "Azerbaijani" },
    { code: "ba", name: "Bashkir" },
    { code: "be", name: "Belarusian" },
    { code: "bg", name: "Bulgarian" },
    { code: "bn", name: "Bengali" },
    { code: "bs", name: "Bosnian" },
    { code: "ca", name: "Catalan" },
    { code: "ceb", name: "Cebuano" },
    { code: "cs", name: "Czech" },
    { code: "cy", name: "Welsh" },
    { code: "da", name: "Danish" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "en", name: "English" },
    { code: "eo", name: "Esperanto" },
    { code: "es", name: "Spanish" },
    { code: "et", name: "Estonian" },
    { code: "eu", name: "Basque" },
    { code: "fa", name: "Persian" },
    { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" },
    { code: "ga", name: "Irish" },
    { code: "gd", name: "Scottish Gaelic" },
    { code: "gl", name: "Galician" },
    { code: "gu", name: "Gujarati" },
    { code: "he", name: "Hebrew" },
    { code: "hi", name: "Hindi" },
    { code: "hr", name: "Croatian" },
    { code: "ht", name: "Haitian" },
    { code: "hu", name: "Hungarian" },
    { code: "hy", name: "Armenian" },
    { code: "id", name: "Indonesian" },
    { code: "is", name: "Icelandic" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "jv", name: "Javanese" },
    { code: "ka", name: "Georgian" },
    { code: "kk", name: "Kazakh" },
    { code: "km", name: "Khmer" },
    { code: "kn", name: "Kannada" },
    { code: "ko", name: "Korean" },
    { code: "ky", name: "Kyrgyz" },
    { code: "la", name: "Latin" },
    { code: "lb", name: "Luxembourgish" },
    { code: "lo", name: "Lao" },
    { code: "lt", name: "Lithuanian" },
    { code: "lv", name: "Latvian" },
    { code: "mg", name: "Malagasy" },
    { code: "mhr", name: "Mari" },
    { code: "mi", name: "Maori" },
    { code: "mk", name: "Macedonian" },
    { code: "ml", name: "Malayalam" },
    { code: "mn", name: "Mongolian" },
    { code: "mr", name: "Marathi" },
    { code: "mrj", name: "Hill Mari" },
    { code: "ms", name: "Malay" },
    { code: "mt", name: "Maltese" },
    { code: "my", name: "Burmese" },
    { code: "ne", name: "Nepali" },
    { code: "nl", name: "Dutch" },
    { code: "no", name: "Norwegian" },
    { code: "pa", name: "Punjabi" },
    { code: "pap", name: "Papiamento" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "ro", name: "Romanian" },
    { code: "ru", name: "Russian" },
    { code: "si", name: "Sinhalese" },
    { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" },
    { code: "sq", name: "Albanian" },
    { code: "sr", name: "Serbian" },
    { code: "su", name: "Sundanese" },
    { code: "sv", name: "Swedish" },
    { code: "sw", name: "Swahili" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "tg", name: "Tajik" },
    { code: "th", name: "Thai" },
    { code: "tl", name: "Tagalog" },
    { code: "tr", name: "Turkish" },
    { code: "tt", name: "Tatar" },
    { code: "udm", name: "Udmurt" },
    { code: "uk", name: "Ukrainian" },
    { code: "ur", name: "Urdu" },
    { code: "uz", name: "Uzbek" },
    { code: "vi", name: "Vietnamese" },
    { code: "xh", name: "Xhosa" },
    { code: "yi", name: "Yiddish" },
    { code: "zh", name: "Chinese" }
]

class Language extends Element {
    constructor(props) {
        super(props);
        this._id += props.code || '';
        this.code = props.code;
        this.name = props.name;
    }

    static getAllAvailableLanguages() {
        return availableLangs;
    }

    static getLanguage(code) {
        for (let lang of availableLangs) {
            if (lang.code == code) return new Language(lang);
        }
        return -1;
    }

    static async translate(text, code, callback) {
        try {
            if (!text || !code) {
                callback("");
                return;
            }
            if (text.length == 0) {
                callback("");
                return;
            }
            let URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&text=${text}&lang=${code}`
            devDeugger(URL);
            axios.post(URL)
                .then((res) => {
                    devDeugger(res.data.text[0]);
                    callback(res.data.text[0]);
                })
                .catch(e => {
                    devDeugger(e);
                    throw e;
                })
        } catch (e) {
            devDeugger("ERROR in translate:", e);
            callback("");
        }

    }
}

module.exports = Language;