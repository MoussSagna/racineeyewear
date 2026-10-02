import { ContactClosing } from '../components/sections/contact/ContactClosing'
import { ContactEmail } from '../components/sections/contact/ContactEmail'
import { ContactForm } from '../components/sections/contact/ContactForm'
import { ContactHero } from '../components/sections/contact/ContactHero'
import { ContactManifesto } from '../components/sections/contact/ContactManifesto'
import { ContactSocials } from '../components/sections/contact/ContactSocials'
import '../styles/contact.css'

export function Contact() {
  return (
    <div className="contact-page">
      <title>Contact — RACINE EYEWEAR</title>
      <ContactHero />
      <ContactEmail />
      <ContactForm />
      <ContactSocials />
      <ContactManifesto />
      <ContactClosing />
    </div>
  )
}
