import { HomeAllPower } from '../components/sections/home/HomeAllPower'
import { HomeBrand } from '../components/sections/home/HomeBrand'
import { HomeCraft } from '../components/sections/home/HomeCraft'
import { HomeHero } from '../components/sections/home/HomeHero'
import { HomeHumanBook } from '../components/sections/home/HomeHumanBook'
import { HomeIntro } from '../components/sections/home/HomeIntro'
import { HomeUniverse } from '../components/sections/home/HomeUniverse'
import '../styles/home.css'

export function Home() {
  return (
    <div className="home-page">
      <HomeHero />
      <HomeIntro />
      <HomeBrand />
      <HomeAllPower />
      <HomeCraft />
      <HomeHumanBook />
      <HomeUniverse />
    </div>
  )
}
