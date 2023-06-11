import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import Layout from "components/Layout"
import { MdxHeading1, MdxImage, MdxLink, MdxText } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import { NextPage } from "next"
import { fontSizeHeading, spacing, spacingDouble } from "utils/theme"

const AboutIndexPage: NextPage = () => (
  <Layout title="About">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        About
      </Heading>
      <SimpleGrid templateColumns={[null, null, "1fr 2fr"]} spacing="10">
        <MdxImage src="/assets/about-me-profile.jpg" />
        <Box>
          <Heading as="h2" size="lg" mb={spacing}>
            Hi, I&rsquo;m Martin 👋
          </Heading>
          <MdxText>
            I&rsquo;m a quirky software engineer with 15 years of professional software development experience, a
            life-long passion for technology, solving problems and helping people. The systems I&rsquo;ve created are
            used by millions of people each day and have some meaningful impact on the world.
          </MdxText>
          <MdxText>
            On <MdxLink href="https://stackoverflow.com/users/546967/martin-devillers">StackOverflow</MdxLink> I’ve
            received over 15,000 reputation by unstucking my fellow coders (and they&rsquo;ve unstucked me many times in
            return).
          </MdxText>
          <MdxText>
            I hold a master&rsquo;s and bachelor&rsquo;s in the field of{" "}
            <MdxLink href="https://www.ru.nl/icis/">Computer and Information Science</MdxLink>, with a specialization in{" "}
            <MdxLink href="https://www.ru.nl/dis/">cryptography</MdxLink>,{" "}
            <MdxLink href="https://sws.cs.ru.nl">formal verification</MdxLink> and{" "}
            <MdxLink href="https://www.ru.nl/icis/about_icis/research_sections/">model-based development</MdxLink>. I
            graduated with Latin Honors (Cum Laude).
          </MdxText>
        </Box>
      </SimpleGrid>
      <MdxHeading1>What I stand for</MdxHeading1>
      <MdxText>
        I feel responsible for the code I write, the products I develop and the engineers I lead. I choose features over
        estimates, results over deadlines, evidence over speculation, simple over simplistic, complex over complicated,
        quality over quantity, architecture over being-an-architect and perseverance over brilliance (also because
        I&rsquo;m not brilliant). My typical workweek involves coffee, whiteboards, sticky notes, keyboards and a very
        enthusiastic crowd that is eager to deliver.
      </MdxText>
      <MdxHeading1>What I believe in</MdxHeading1>
      <MdxText>
        As a self-taught engineer, I firmly believe the internet, free access to information and public collaboration on
        explicit knowledge (e.g. open-source software) are what we need to move humanity forward. Through these means,
        we can ultimately break away from backroom politics and instead, reshape our world so that the mechanisms we
        need to ensure a stable, prosperous and safe society are completely open and visible to the public.{" "}
      </MdxText>
      <MdxHeading1>Other interests</MdxHeading1>
      <MdxText>
        Besides being a passionate engineer, I also enjoy 360° photography (5 million views on StreetView), cycling
        (I&rsquo;m Dutch ey), traveling (34 countries and counting), dancing and cooking.
      </MdxText>
    </PageContainer>
  </Layout>
)

export default AboutIndexPage
