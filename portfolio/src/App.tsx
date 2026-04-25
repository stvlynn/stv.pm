import { FreeCursorGuide } from './components/FreeCursorGuide';
import { Hero } from './components/Hero';
import { InfoTable } from './components/InfoTable';
import { PhotographyReel } from './components/PhotographyReel';
import { ProjectGrid } from './components/ProjectGrid';
import { SectionHeader } from './components/SectionHeader';
import { SiteFooter } from './components/SiteFooter';
import { WorkExperience } from './components/WorkExperience';
import { SELECTED_WORKS } from './data/projects';

function App() {
  return (
    <>
      <main>
        <Hero />

        <SectionHeader id="work">Open Source Projects</SectionHeader>
        <ProjectGrid projects={SELECTED_WORKS} />

        <InfoTable />

        <SectionHeader id="experience" noBorderTop>
          Work Experience
        </SectionHeader>
        <WorkExperience />

        <SectionHeader id="photography" noBorderTop>
          Photography on Unsplash
        </SectionHeader>
        <PhotographyReel />
      </main>
      <SiteFooter />
      <FreeCursorGuide />
    </>
  );
}

export default App;
