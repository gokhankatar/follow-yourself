import { createI18n } from "vue-i18n";
import en from "./en.json";
import tr from "./tr.json";
import ja from "./ja.json";

const i18n = createI18n({
    locale: "tr",
    messages: {
        en, tr, ja
    }
});

export default i18n;