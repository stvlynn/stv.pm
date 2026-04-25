import { Hero } from './components/Hero';
import { InfoTable } from './components/InfoTable';
import { PhotographyReel } from './components/PhotographyReel';
import { ProjectGrid } from './components/ProjectGrid';
import { SectionHeader } from './components/SectionHeader';
import { SiteFooter } from './components/SiteFooter';
import {
  RESEARCH_AND_EXPERIMENTS,
  SELECTED_WORKS,
} from './data/projects';

function App() {
  return (
    <>
      <main>
        <Hero />

        <SectionHeader id="work">Open Source Projects</SectionHeader>
        <ProjectGrid projects={SELECTED_WORKS} />

        <InfoTable />

        <SectionHeader id="photography" noBorderTop>
          Photography on Unsplash
        </SectionHeader>
        <PhotographyReel />

        <SectionHeader id="archive" noBorderTop>
          AI Tools &amp; Experiments
        </SectionHeader>
        <ProjectGrid projects={RESEARCH_AND_EXPERIMENTS} variant="featured" />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
