import { Link } from 'react-router-dom'
import { LegalPage, LegalSection } from '../components/sections/legal/LegalPage'
import { LegalTodo } from '../components/sections/legal/LegalTodo'
import { contactEmail } from '../data/contact'

/**
 * Mentions légales. Aucune information d'identification de l'éditeur ou de
 * l'hébergeur ne figure dans les documents du projet : chaque `LegalTodo` est
 * à remplacer par la donnée réelle avant la mise en production.
 */
export function LegalNotice() {
  return (
    <LegalPage
      sibling={{
        label: 'Politique de confidentialité',
        to: '/politique-de-confidentialite',
        direction: 'next',
      }}
      subtitle="Les informations de RACINE EYEWEAR"
      titleLines={['Mentions', 'légales']}
    >
      <LegalSection id="legal-publisher" title="Éditeur du site">
        <p>Le site RACINE EYEWEAR est édité par :</p>
        <dl className="legal-list">
          <div>
            <dt>Raison sociale</dt>
            <dd>
              <LegalTodo>raison sociale</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Forme juridique</dt>
            <dd>
              <LegalTodo>forme juridique</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Capital social</dt>
            <dd>
              <LegalTodo>capital social, s’il s’agit d’une société</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>
              <LegalTodo>adresse du siège</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>SIREN / SIRET</dt>
            <dd>
              <LegalTodo>SIREN / SIRET et registre d’immatriculation</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>TVA intracommunautaire</dt>
            <dd>
              <LegalTodo>numéro de TVA, si applicable</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>
              <LegalTodo>numéro de téléphone</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Responsable de publication</dt>
            <dd>
              <LegalTodo>responsable de publication</LegalTodo>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="legal-contact" title="Contact">
        <p>
          Pour toute question relative au site ou à son contenu, vous pouvez
          écrire à RACINE EYEWEAR :
        </p>
        <p>
          <a className="legal-email" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
      </LegalSection>

      <LegalSection id="legal-hosting" title="Hébergement">
        <p>Le site est hébergé par :</p>
        <dl className="legal-list">
          <div>
            <dt>Hébergeur</dt>
            <dd>
              <LegalTodo>hébergeur</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>
              <LegalTodo>adresse de l’hébergeur</LegalTodo>
            </dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>
              <LegalTodo>téléphone de l’hébergeur</LegalTodo>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection
        id="legal-intellectual-property"
        title="Propriété intellectuelle"
      >
        <p>
          Le site, son identité graphique, ses textes, ses photographies, ses
          vidéos et l’ensemble de ses éléments graphiques sont protégés par le
          droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, adaptation ou diffusion, totale ou
          partielle, de ces éléments, par quelque procédé que ce soit, est
          interdite sans l’autorisation écrite préalable de RACINE EYEWEAR ou
          des titulaires des droits concernés.
        </p>
      </LegalSection>

      <LegalSection id="legal-credits" title="Crédits">
        <dl className="legal-list">
          <div>
            <dt>Photographies et vidéos</dt>
            <dd>
              <LegalTodo>crédits des photographies et des vidéos</LegalTodo>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="legal-liability" title="Responsabilité">
        <p>
          RACINE EYEWEAR s’efforce de fournir sur ce site des informations
          exactes et à jour. Elles sont toutefois données à titre indicatif et
          peuvent être modifiées à tout moment.
        </p>
        <p>
          Le site contient des liens vers des services tiers, notamment les
          réseaux sociaux de la marque. RACINE EYEWEAR n’exerce aucun contrôle
          sur ces services et ne saurait être tenue responsable de leur contenu
          ni de leur fonctionnement.
        </p>
      </LegalSection>

      <LegalSection id="legal-personal-data" title="Données personnelles">
        <p>
          Le traitement des données personnelles et les droits dont vous
          disposez sont décrits dans la{' '}
          <Link to="/politique-de-confidentialite">
            Politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
