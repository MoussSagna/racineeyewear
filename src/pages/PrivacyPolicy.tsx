import { Link } from 'react-router-dom'
import { LegalPage, LegalSection } from '../components/sections/legal/LegalPage'
import { LegalTodo } from '../components/sections/legal/LegalTodo'
import { contactEmail } from '../data/contact'

/**
 * Politique de confidentialité, alignée sur l'état réel du site : pas de
 * cookie, pas de mesure d'audience, pas de publicité. Le formulaire de contact
 * n'est pas encore relié à un service d'envoi (intégration Resend prévue) :
 * les `LegalTodo` correspondants sont à lever lors de cette intégration.
 */
export function PrivacyPolicy() {
  return (
    <LegalPage
      sibling={{
        label: 'Mentions légales',
        to: '/mentions-legales',
        direction: 'previous',
      }}
      subtitle="Vos données, votre regard."
      titleLines={['Politique', 'de confidentialité']}
    >
      <div className="legal-intro">
        <p>
          RACINE EYEWEAR respecte la vie privée des personnes qui visitent ce
          site. Les données personnelles y sont traitées conformément à la
          réglementation applicable, notamment le Règlement général sur la
          protection des données (RGPD).
        </p>
        <p>
          Cette page explique simplement quelles données sont concernées,
          pourquoi elles sont utilisées et comment exercer vos droits.
        </p>
      </div>

      <LegalSection id="privacy-controller" title="Responsable du traitement">
        <dl className="legal-list">
          <div>
            <dt>Responsable</dt>
            <dd>
              <LegalTodo>raison sociale du responsable du traitement</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>
              <LegalTodo>adresse du responsable du traitement</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="privacy-data" title="Données collectées">
        <p>
          Le site ne propose ni compte client, ni commande, ni inscription. Les
          seules données personnelles concernées sont celles que vous choisissez
          de transmettre en écrivant à RACINE, par email ou via le formulaire de
          contact :
        </p>
        <ul>
          <li>votre nom ;</li>
          <li>votre adresse email ;</li>
          <li>le sujet de votre message ;</li>
          <li>le contenu de votre message.</li>
        </ul>
        <p>
          <LegalTodo kind="validate">
            mise en service de l’envoi du formulaire de contact, qui ne transmet
            aucune donnée à ce jour
          </LegalTodo>
        </p>
      </LegalSection>

      <LegalSection id="privacy-purposes" title="Finalités">
        <p>Ces données sont utilisées uniquement pour :</p>
        <ul>
          <li>répondre aux demandes adressées à RACINE ;</li>
          <li>échanger avec la personne qui a pris contact ;</li>
          <li>traiter les demandes de collaboration ou d’information.</li>
        </ul>
        <p>
          Elles ne sont ni vendues, ni utilisées à des fins de prospection
          commerciale ou de publicité.
        </p>
      </LegalSection>

      <LegalSection id="privacy-legal-basis" title="Base légale">
        <p>
          <LegalTodo kind="validate">
            base légale du traitement des messages de contact
          </LegalTodo>
        </p>
      </LegalSection>

      <LegalSection id="privacy-recipients" title="Destinataires">
        <p>
          Les messages sont destinés à RACINE EYEWEAR et ne sont consultés que
          par les personnes chargées d’y répondre.
        </p>
        <p>Des prestataires techniques peuvent intervenir :</p>
        <dl className="legal-list">
          <div>
            <dt>Hébergement du site</dt>
            <dd>
              <LegalTodo>hébergeur</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Envoi des messages du formulaire</dt>
            <dd>
              <LegalTodo>
                prestataire d’envoi des emails, une fois l’intégration réalisée
              </LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Transferts hors Union européenne</dt>
            <dd>
              <LegalTodo kind="validate">
                transferts hors Union européenne selon les prestataires retenus
              </LegalTodo>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="privacy-retention" title="Durée de conservation">
        <p>
          <LegalTodo kind="validate">
            durée de conservation des messages de contact
          </LegalTodo>
        </p>
      </LegalSection>

      <LegalSection id="privacy-rights" title="Vos droits">
        <p>Vous disposez des droits suivants sur vos données :</p>
        <ul>
          <li>droit d’accès ;</li>
          <li>droit de rectification ;</li>
          <li>droit à l’effacement ;</li>
          <li>droit d’opposition ;</li>
          <li>droit à la limitation du traitement, lorsqu’il s’applique ;</li>
          <li>droit à la portabilité, lorsqu’il s’applique.</li>
        </ul>
        <p>
          Pour exercer ces droits, écrivez à{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> en précisant
          votre demande.
        </p>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés, vous pouvez adresser une réclamation à la Commission
          nationale de l’informatique et des libertés (CNIL) :{' '}
          <a
            href="https://www.cnil.fr"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.cnil.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="privacy-trackers" title="Cookies et traceurs">
        <p>
          Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure
          d’audience ni de publicité.
        </p>
        <p>
          Pour vous replacer au bon endroit lorsque vous revenez sur une page,
          le site conserve la position de défilement dans votre navigateur, le
          temps de votre visite uniquement. Cette information ne quitte pas
          votre appareil.
        </p>
      </LegalSection>

      <LegalSection id="privacy-third-parties" title="Services tiers">
        <p>
          Les polices de caractères du site sont chargées depuis Google Fonts. À
          cette occasion, votre navigateur communique votre adresse IP à Google.
        </p>
        <p>
          Les liens vers Instagram et LinkedIn sont de simples liens : aucune
          donnée n’est transmise à ces services tant que vous ne cliquez pas
          dessus.
        </p>
      </LegalSection>

      <LegalSection id="privacy-updates" title="Mise à jour">
        <p>
          Cette politique peut évoluer, notamment lors de la mise en service de
          nouvelles fonctionnalités. Les informations sur l’éditeur du site
          figurent dans les <Link to="/mentions-legales">Mentions légales</Link>
          .
        </p>
        <p>
          Dernière mise à jour : <LegalTodo>date de publication</LegalTodo>
        </p>
      </LegalSection>
    </LegalPage>
  )
}
