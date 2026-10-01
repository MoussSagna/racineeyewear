import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import acetateImage from '../assets/images/matiere/ACETATE.jpg'
import craftImage from '../assets/images/matiere/FACONNAGE.jpg'
import brandImage from '../assets/images/all-power/04.jpg'
import collectionImage from '../assets/images/all-power/03.jpg'
import heroImage from '../assets/images/all-power/01.jpg'
import finalImage from '../assets/images/summer-collection/04.jpg'
import humanBookOne from '../assets/images/human-book/01.jpg'
import humanBookTwo from '../assets/images/human-book/02.jpg'
import humanBookThree from '../assets/images/human-book/03.jpg'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import './HomePage.css'

export function Home() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 30])
  const reduceMotion = Boolean(prefersReducedMotion)

  return (
    <div className="home-page">
      <section
        aria-labelledby="home-title"
        className="home-hero"
        ref={heroRef}
      >
        <figure className="home-hero__media">
          <motion.img
            alt="Deux modèles RACINE portent des lunettes de la collection ALL POWER"
            animate={{ opacity: 1, scale: 1 }}
            className="home-hero__photo"
            fetchPriority="high"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            loading="eager"
            src={heroImage}
            style={{ y: reduceMotion ? 0 : heroParallax }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
          <figcaption className="home-hero__caption">ALL POWER · CHAPTER 01</figcaption>
        </figure>
        <div aria-hidden="true" className="home-hero__veil" />
        <div className="home-hero__copy">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="home-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.56 }}
          >
            RACINE EYEWEAR · FRANCE
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            id="home-title"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.64 }}
          >
            LA CULTURE
            <br />
            DANS CHAQUE
            <br />
            REGARD.
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="home-hero__description"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.84 }}
          >
            Une marque française de lunettes, entre héritage, identité et
            modernité.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 1.02 }}
          >
            <Link className="home-button home-button--light" to="/la-marque">
              Découvrir la marque
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </motion.div>
        </div>
        <span aria-hidden="true" className="home-hero__index">
          01 <span /> 03
        </span>
      </section>

      <section aria-labelledby="home-intro-title" className="home-intro">
        <ScrollReveal className="home-intro__statement">
          <p className="home-eyebrow">Un regard, mille histoires</p>
          <h2 id="home-intro-title">
            La culture
            <br />
            dans chaque <em>regard.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="home-intro__copy" delay={0.12}>
          <p>
            Chaque monture raconte une histoire, un mélange de cultures et de
            créativité. Parce que porter des lunettes, ce n’est pas seulement
            voir. C’est aussi se reconnaître.
          </p>
          <span aria-hidden="true" className="home-intro__index">01 / 04</span>
        </ScrollReveal>
      </section>

      <section
        aria-labelledby="home-brand-title"
        className="home-brand home-section"
        id="la-marque"
      >
        <ScrollReveal className="home-brand__image-wrap">
          <figure className="home-brand__image">
            <img
              alt="Portrait d’une femme portant une monture RACINE"
              loading="lazy"
              src={brandImage}
            />
            <figcaption>CARINE BEYSSAC · CRÉATRICE DE RACINE</figcaption>
          </figure>
        </ScrollReveal>
        <div className="home-brand__copy">
          <ScrollReveal>
            <p className="home-eyebrow">La marque</p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 id="home-brand-title">
              Des racines
              <br />
              pour voir plus loin.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.13}>
            <p>
              Une marque qui fait dialoguer l’optique, la mode, la Culture, le
              design et le savoir-faire artisanal. Des lunettes avec une
              identité, pensées pour que chacun puisse reconnaître une part de
              son histoire.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link className="home-text-link" to="/la-marque">
              En savoir plus
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section
        aria-labelledby="home-collection-title"
        className="home-collection home-section"
        id="collection"
      >
        <div className="home-collection__copy">
          <ScrollReveal>
            <p className="home-eyebrow">Collection · Chapter 01</p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 id="home-collection-title">ALL POWER</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="home-collection__lead">
              Une histoire de force. De fierté. De transmission.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.18}>
            <p>
              Inspirée par le Black Panther Party, la première collection RACINE
              célèbre l’identité, la visibilité et l’émancipation. Des montures
              aux lignes affirmées, pensées comme des pièces intemporelles.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <Link className="home-button home-button--light" to="/collection">
              Découvrir la collection
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </ScrollReveal>
        </div>
        <ScrollReveal className="home-collection__image-wrap" delay={0.12}>
          <figure className="home-collection__image">
            <img
              alt="Portrait d’un modèle portant une monture de la collection ALL POWER"
              loading="lazy"
              src={collectionImage}
            />
            <figcaption>ALL POWER · CHAPTER 01</figcaption>
          </figure>
        </ScrollReveal>
      </section>

      <section
        aria-labelledby="home-craft-title"
        className="home-craft home-section"
        id="savoir-faire"
      >
        <div className="home-craft__images">
          <ScrollReveal className="home-craft__image-main">
            <figure>
              <img
                alt="Monture en acétate en cours de façonnage"
                loading="lazy"
                src={craftImage}
              />
              <figcaption>LE GESTE ARTISANAL</figcaption>
            </figure>
          </ScrollReveal>
          <ScrollReveal className="home-craft__image-detail" delay={0.12}>
            <figure>
              <img
                alt="Détail des plaques d’acétate et des nuances de la matière"
                loading="lazy"
                src={acetateImage}
              />
            </figure>
          </ScrollReveal>
        </div>
        <div className="home-craft__copy">
          <ScrollReveal>
            <p className="home-eyebrow">Savoir-faire · Made in France</p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 id="home-craft-title">
              Une fabrication
              <br />
              française.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.13}>
            <p>
              Chaque monture est façonnée à la commande en acétate de cellulose,
              une matière biosourcée issue de la fibre de coton et de la pulpe de
              bois. Peu, mais bien : sans stock, avec des matériaux français
              et/ou européens.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link className="home-text-link" to="/la-marque">
              En savoir plus
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section
        aria-labelledby="home-book-title"
        className="home-book"
        id="human-book"
      >
        <div className="home-book__intro">
          <ScrollReveal>
            <p className="home-eyebrow">Human Book</p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 id="home-book-title">
              Des visages,
              <br />
              des histoires.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.13}>
            <blockquote>
              « Une monture n’existe pleinement qu’à travers la personne qui la
              porte. »
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              RACINE en mouvement, sur des visages, avec leurs différences,
              leurs expressions et leurs personnalités.
            </p>
          </ScrollReveal>
        </div>
        <div className="home-book__portraits">
          <ScrollReveal className="home-book__portrait home-book__portrait--large">
            <figure>
              <img
                alt="Portrait d’une femme portant des lunettes RACINE en lumière naturelle"
                loading="lazy"
                src={humanBookOne}
              />
            </figure>
          </ScrollReveal>
          <ScrollReveal className="home-book__portrait home-book__portrait--top" delay={0.1}>
            <figure>
              <img
                alt="Deux femmes portant des montures RACINE"
                loading="lazy"
                src={humanBookTwo}
              />
            </figure>
          </ScrollReveal>
          <ScrollReveal className="home-book__portrait home-book__portrait--bottom" delay={0.18}>
            <figure>
              <img
                alt="Portrait rapproché d’une femme portant une monture colorée"
                loading="lazy"
                src={humanBookThree}
              />
            </figure>
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="home-universe-title" className="home-universe">
        <img
          alt="Portrait en lumière dorée portant une monture RACINE"
          className="home-universe__image"
          loading="lazy"
          src={finalImage}
        />
        <div aria-hidden="true" className="home-universe__veil" />
        <div className="home-universe__copy">
          <ScrollReveal>
            <p className="home-eyebrow">L’univers RACINE</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 id="home-universe-title">
              Entrez dans
              <br />
              l’univers RACINE.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <Link className="home-button home-button--light" to="/contact">
              Nous contacter
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}