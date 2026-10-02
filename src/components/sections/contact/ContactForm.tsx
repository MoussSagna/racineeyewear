import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactEmail } from '../../../data/contact'
import { ScrollReveal } from '../../ui/ScrollReveal'

const fields = [
  { name: 'name', label: 'Nom', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Sujet', type: 'text', autoComplete: 'off' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off' },
] as const

type FieldName = (typeof fields)[number]['name']
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

const emptyValues: Values = { name: '', email: '', subject: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: FieldName, value: string) {
  if (!value.trim()) return 'Ce champ est requis.'
  if (name === 'email' && !emailPattern.test(value.trim())) {
    return 'Veuillez renseigner une adresse email valide.'
  }
  return undefined
}

/** Lien `mailto:` reprenant le message saisi, faute de service d'envoi. */
function buildMailto(values: Values) {
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    values.subject.trim(),
  )}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [isReady, setIsReady] = useState(false)

  const updateField = (name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setIsReady(false)
    // Une erreur affichée disparaît dès que le champ redevient valide.
    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value),
      }))
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Errors = {}
    for (const field of fields) {
      const error = validateField(field.name, values[field.name])
      if (error) nextErrors[field.name] = error
    }
    setErrors(nextErrors)

    const firstInvalid = fields.find((field) => nextErrors[field.name])
    if (firstInvalid) {
      setIsReady(false)
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)
        ?.focus()
      return
    }
    // Aucun service d'envoi n'est branché : on le dit, sans simuler d'envoi.
    setIsReady(true)
  }

  return (
    <section aria-labelledby="contact-form-title" className="contact-form">
      <div className="contact-form__intro">
        <ScrollReveal>
          <p className="contact-label">Formulaire</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="contact-form__title" id="contact-form-title">
            Envoyer <br />
            un message
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="contact-form__note">
            <span aria-hidden="true">*</span> Champs requis
          </p>
        </ScrollReveal>
      </div>

      <form
        aria-labelledby="contact-form-title"
        className="contact-form__form"
        noValidate
        onSubmit={onSubmit}
        ref={formRef}
      >
        {fields.map((field, index) => {
          const id = `contact-${field.name}`
          const error = errors[field.name]
          const control = {
            'aria-describedby': error ? `${id}-error` : undefined,
            'aria-invalid': error ? true : undefined,
            autoComplete: field.autoComplete,
            id,
            name: field.name,
            required: true,
            value: values[field.name],
          }

          return (
            <ScrollReveal
              className="contact-form__field"
              delay={index * 0.07}
              key={field.name}
            >
              <label htmlFor={id}>
                <span aria-hidden="true" className="contact-form__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="contact-label__rule" />
                {field.label} <span aria-hidden="true">*</span>
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  {...control}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  rows={4}
                />
              ) : (
                <input
                  {...control}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  type={field.type}
                />
              )}
              {error && (
                <p className="contact-form__error" id={`${id}-error`}>
                  {error}
                </p>
              )}
            </ScrollReveal>
          )
        })}

        <div className="contact-form__footer">
          <p className="contact-form__privacy">
            Les informations renseignées dans ce formulaire sont utilisées
            uniquement pour répondre à votre demande. Pour en savoir plus sur le
            traitement de vos données et vos droits, consultez notre{' '}
            <Link to="/politique-de-confidentialite">
              Politique de confidentialité
            </Link>
            .
          </p>
          <button className="arrow-link arrow-link--pill" type="submit">
            <span>Envoyer</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="contact-form__status" role="status">
          {isReady && (
            <>
              <p>
                Votre message est prêt, mais ce formulaire n’est pas encore
                relié à un service d’envoi : rien n’a été transmis à RACINE.
              </p>
              <a href={buildMailto(values)}>
                Envoyer ce message depuis votre messagerie
                <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} />
              </a>
            </>
          )}
        </div>
      </form>
    </section>
  )
}
