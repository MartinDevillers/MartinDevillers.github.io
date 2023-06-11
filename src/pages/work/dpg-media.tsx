import { Heading, AspectRatio } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import {
  MdxHeading1,
  MdxLink,
  MdxListItem,
  MdxListItemTrophy,
  MdxText,
  MdxUnorderedList,
} from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"
import { fontSizeHeading, spacingDouble } from "utils/theme"

const images = [
  {
    src: "/assets/projects/dpg-media/dpg-media-21.jpg",
    title: "Enjoying the annual DPG Media Hackathon called Ship It",
  },
  { src: "/assets/projects/dpg-media/dpg-media-18.jpg", title: "Successful go live of Het Parool" },
  { src: "/assets/projects/dpg-media/dpg-media-20.jpg", title: "Successful go live of Het Parool" },
  { src: "/assets/projects/dpg-media/dpg-media-15.jpg", title: "Selectives teams at work" },
  { src: "/assets/projects/dpg-media/dpg-media-19.jpg", title: "Het Parool being advertised in Amsterdam" },
  { src: "/assets/projects/dpg-media/dpg-media-16.jpg", title: "Laura, my girlfriend, painted the Selectives logo" },
  { src: "/assets/projects/dpg-media/dpg-media-17.jpg", title: "The new headquarters of DPG Media" },
]

const SelectivesPage: NextPage = () => (
  <Layout title="DPG Media">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        Digital News Publishing Platform
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="DPG Media Group"
        logo="/assets/projects/dpg-media/dpg-media-vendor-logo.svg"
        date="2018 - 2019"
        location="Amsterdam"
        country="🇳🇱"
        role="Software Architect"
      />
      <MdxText>
        At DPG Media, I was the architect of the Selectives platform, a multi-million-user multi-brand multi-channel
        cloud-first digital news delivery platform. We built cool stuff with{" "}
        <MdxLink href="https://aws.amazon.com/lambda/">AWS Lambda</MdxLink>,{" "}
        <MdxLink href="https://aws.amazon.com/fargate/">AWS Fargate</MdxLink>,{" "}
        <MdxLink href="https://www.akamai.com/">Akamai</MdxLink>, <MdxLink href="http://appium.io/">Appium</MdxLink>,{" "}
        <MdxLink href="https://applitools.com/">Applitools</MdxLink>,{" "}
        <MdxLink href="https://www.gremlin.com/">Gremlin</MdxLink> and{" "}
        <MdxLink href="https://facebook.github.io/react-native/">React Native</MdxLink>. My role was very versatile and
        every week was completely different. I programmed critical parts of the platform, lead the transition to the
        cloud, collaborated with multiple teams on high-level architecture or low-level implementation details,
        supported customer care with case management, lead refinements, challenged other architects, fixed production
        issues and drived important architectural and strategic decisions. Moreover, I brought a group of 25 amazing
        people forward and helped them to navigate the trenches of a 500 men IT-organization.
      </MdxText>
      <MdxText>
        I enjoyed working for DPG Media as I feel that in this day and age of fake news, extremism and general
        uncertainty, delivering credible and high-quality news to the people is of crucial importance.
      </MdxText>
      <MdxHeading1>Personal Achievements</MdxHeading1>
      <MdxText>Below a list of my accomplishments:</MdxText>
      <MdxUnorderedList>
        <MdxListItemTrophy>
          Implemented a runtime experiment system for trying out new features on a live production environment.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Increased backend (Java Spring Boot 2) performance by a factor of 10 through{" "}
          <MdxLink href="https://www.sonarqube.org">SonarQube</MdxLink> static code analysis,{" "}
          <MdxLink href="https://jmeter.apache.org">Apache JMeter</MdxLink> performance measurement and implementation
          of concurrency patterns, pre-warming, bulk-loading, KISS-CQRS,{" "}
          <MdxLink href="https://aws.amazon.com/fargate/">ECS Fargate</MdxLink> tweaking and push-over-pull-algorithms (
          <MdxLink href="https://github.com/google/guava">Google Guava</MdxLink>;{" "}
          <MdxLink href="https://github.com/ben-manes/caffeine">Caffeine</MdxLink>).
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Doubled frontend performance through <MdxLink href="https://www.speedcurve.com">SpeedCurve</MdxLink>,{" "}
          <MdxLink href="https://www.webpagetest.org">WebPageTest</MdxLink> and{" "}
          <MdxLink href="https://github.com/GoogleChrome/lighthouse">Lighthouse</MdxLink> performance measurement,
          experimenting with many JavaScript, CSS and <MdxLink href="https://www.akamai.com/">Akamai CDN</MdxLink>{" "}
          tweaks and pushing that-what-works.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Saved over € 250.000 by optimizing use of serverless cloud technologies such as{" "}
          <MdxLink href="https://aws.amazon.com/lambda/">Amazon AWS Lambda</MdxLink>,{" "}
          <MdxLink href="https://aws.amazon.com/s3/">S3</MdxLink>,{" "}
          <MdxLink href="https://aws.amazon.com/sns">SNS</MdxLink>,{" "}
          <MdxLink href="https://aws.amazon.com/sqs">SQS</MdxLink>,{" "}
          <MdxLink href="https://www.mongodb.com/atlas/database">MongoDB Atlas</MdxLink> and{" "}
          <MdxLink href="https://www.akamai.com/">Akamai</MdxLink>) and deprecating over 50 vCPU’s of on-premise
          infrastructure.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Improved time-to-market from weekly to hourly by optimizing the continuous delivery pipeline and culture using{" "}
          <MdxLink href="https://gradle.org">Gradle</MdxLink>, <MdxLink href="https://www.docker.com">Docker</MdxLink>,{" "}
          <MdxLink href="https://bitbucket.org/product/features/pipelines">Atlassian Bitbucket Pipelines</MdxLink>,{" "}
          <MdxLink href="https://aws.amazon.com/fargate/">AWS ECS Fargate</MdxLink>,{" "}
          <MdxLink href="https://aws.amazon.com/codepipeline/">AWS CodePipeline</MdxLink> and{" "}
          <MdxLink href="https://aws.amazon.com/serverless/sam/">AWS SAM</MdxLink>.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Improved fault tolerance by implementing Chaos Engineering practices & tooling including{" "}
          <MdxLink href="https://www.gremlin.com">Gremlin</MdxLink>,{" "}
          <MdxLink href="https://github.com/codecentric/spring-boot-admin">Spring Boot Admin</MdxLink> and Hystrix
          Dashboard (an open source tool for Circuit Breaker monitoring).
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          In addition to supporting my area (25 members), I collaborated with the other 10 architects of DPG Media to
          align on long-term strategic goals of DPG Media on the group-level (5.000 employees / USD 1,6 billion rev).
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Finally, <MdxLink href="/blog/i-won-a-hackathon/">I won the annual DPG Media hackathon.</MdxLink> 😊
        </MdxListItemTrophy>
      </MdxUnorderedList>
      <MdxHeading1>About the platform</MdxHeading1>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe
          title="Volkskrant digitaal in nieuw jasje"
          src="https://www.youtube-nocookie.com/embed/r_K7FNazZgk"
          allowFullScreen
        />
      </AspectRatio>
      <MdxText>
        As the Selectives platform is a joint effort between the Selectives teams and more than ten supporting teams,
        the platform is strong in both reach, conversion and yield:
      </MdxText>
      <MdxUnorderedList>
        <MdxListItem>
          Fifteen million monthly visitors. Half a million app installs.{" "}
          <MdxLink href="http://apps.apple.com/nl/developer/de-persgroep/id392582240#see-all/i-phonei-pad-apps">
            Ten mobile applications
          </MdxLink>
          . Five websites. <MdxLink href="https://www.dpgmedia.nl/merken">Five brands</MdxLink>. One platform.
        </MdxListItem>
        <MdxListItem>Dynamic grid-system for displaying attractive content on all screen-sizes</MdxListItem>
        <MdxListItem>
          <MdxLink href="https://smartocto.com/">Runtime A/B-testing</MdxLink> on editorial content to maximize reach
        </MdxListItem>
        <MdxListItem>
          Intelligent temptation banners, conversion screens and content blockers to maximize conversion
        </MdxListItem>
        <MdxListItem>
          <MdxLink href="https://blog.bannerflow.com/programmatic-advertising-header-bidding/">
            Pre-bid-based advertisement
          </MdxLink>{" "}
          for just-in-time programmatic across multiple ad exchanges to maximize yield
        </MdxListItem>
        <MdxListItem>
          <MdxLink href="https://medium.com/humansforai/recommendation-engines-e431b6b6b446">
            Personal recommendations
          </MdxLink>{" "}
          powered by state-of-the-art AI/ML-techniques
        </MdxListItem>
        <MdxListItem>
          The whole DevOps shebang: fully <MdxLink href="http://appium.io/">automated functional</MdxLink> and{" "}
          <MdxLink href="https://applitools.com/">visual regression</MdxLink> test suite,{" "}
          <MdxLink href="https://www.gremlin.com">chaos hardened</MdxLink> code,{" "}
          <MdxLink href="https://aws.amazon.com/serverless/sam/">all infrastructure as code</MdxLink> and daily
          deployments to production!
        </MdxListItem>
      </MdxUnorderedList>
      <MdxText>
        In addition to supporting development, I was the voice-of-architecture in the Product/People/Process triangle
        and collaborated with the other ten architects of DPG Media to align on long-term strategic goals of DPG Media
        on the group-level (5,000 employees).
      </MdxText>
      <AspectRatio ratio={16 / 9}>
        <iframe
          title="Ontdek de nieuwe digitale De Morgen. Download nu de app"
          src="https://www.youtube-nocookie.com/embed/-VAemXkrtkY"
          allowFullScreen
        />
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default SelectivesPage
