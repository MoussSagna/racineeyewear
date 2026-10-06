import { CollectionChapter } from '../components/sections/collection/CollectionChapter'
import { CollectionFrames } from '../components/sections/collection/CollectionFrames'
import { CollectionHero } from '../components/sections/collection/CollectionHero'
import { CollectionManifesto } from '../components/sections/collection/CollectionManifesto'
import { CollectionMaterials } from '../components/sections/collection/CollectionMaterials'
import { FutureChapters } from '../components/sections/collection/FutureChapters'
import { HumanBookSection } from '../components/sections/collection/HumanBookSection'
import { SummerCollectionSection } from '../components/sections/collection/SummerCollectionSection'
import '../styles/collection.css'

export function Collection() {
  return (
    <div className="collection-page">
      <title>Collection — RACINE EYEWEAR</title>
      <CollectionHero />
      <CollectionManifesto />
      <CollectionChapter />
      <CollectionFrames />
      <CollectionMaterials />
      <HumanBookSection />
      <SummerCollectionSection />
      <FutureChapters />
    </div>
  )
}
