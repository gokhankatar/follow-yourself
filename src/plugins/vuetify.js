import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
