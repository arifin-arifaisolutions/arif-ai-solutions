// Styles
import './styles/tokens.css'
import './styles/base.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/services.css'
import './styles/marquee.css'
import './styles/how-we-work.css'
import './styles/about.css'
import './styles/why-choose-us.css'
import './styles/track-record.css'
import './styles/contact.css'
import './styles/footer.css'

// Modules
import { initNavbar } from './modules/navbar.js'
import { initCursor } from './modules/cursor.js'
import { initContactForm } from './modules/contact-form.js'
import { initTilt } from './modules/tilt.js'
import { initMagnetic } from './modules/magnetic.js'
import './modules/i18n.js'

// Init
initNavbar()
initCursor()
initContactForm()
initTilt()
initMagnetic()
