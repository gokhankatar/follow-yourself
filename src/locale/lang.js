/*
 * @description : Follow your developments and activities with algorithms
 * @author : Gokhan Katar
 * @github : https://github.com/gokhankatar
 * @x : https://twitter.com/gokhan_crypto/
 * @instagram :  https://www.instagram.com/katargokhan96/
 */

import { createI18n } from "vue-i18n";
import en from "./en.json";
import tr from "./tr.json";
import ja from "./ja.json";

const i18n = createI18n({
  locale: "en",
  messages: { en, tr, ja },
});

export default i18n;
