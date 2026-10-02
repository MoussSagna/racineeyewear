import { BrandCommitment } from '../components/sections/brand/BrandCommitment'
import { BrandCraft } from '../components/sections/brand/BrandCraft'
import { BrandCreator } from '../components/sections/brand/BrandCreator'
import { BrandHero } from '../components/sections/brand/BrandHero'
import { BrandJourney } from '../components/sections/brand/BrandJourney'
import { BrandOrigins } from '../components/sections/brand/BrandOrigins'
import { BrandRoots } from '../components/sections/brand/BrandRoots'
import { BrandVision } from '../components/sections/brand/BrandVision'
import '../styles/brand.css'

export function Brand() {
  return (
    <div className="brand-page">
      <title>La marque — RACINE EYEWEAR</title>
      <BrandHero />
      <BrandOrigins />
      <BrandJourney />
      <BrandRoots />
      <BrandCreator />
      <BrandVision />
      <BrandCraft />
      <BrandCommitment />
    </div>
  )
}
