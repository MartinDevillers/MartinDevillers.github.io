import { Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxLink, MdxListItemTrophy, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"
import { fontSizeHeading, spacingDouble } from "utils/theme"

const images = [
  { src: "/assets/projects/coffeeseed/coffeeseed-01.jpg", title: "Esteban Benites @estebanbenites" },
  { src: "/assets/projects/coffeeseed/coffeeseed-02.jpg", title: "Diego Catto @diegocatto" },
  { src: "/assets/projects/coffeeseed/coffeeseed-03.jpg", title: "Delightin Dee @delightindee" },
  { src: "/assets/projects/coffeeseed/coffeeseed-04.jpg", title: "Austin Distel @austindistel" },
]

const CoffeeseedPage: NextPage = () => (
  <Layout title="Coffeeseed">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        Coffeeseed Transaction Portal
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Coffeeseed LLC"
        logo="/assets/projects/coffeeseed/coffeseed-vendor-logo.png"
        date="2020 - 2021"
        location="Atlanta, GA"
        country="🇺🇸"
        role="Lead Software Engineer"
      />
      <MdxText>
        Coffeeseed is a technology company that believes the future of the specialty coffee industry will be defined by
        access. Access means removing the friction in the coffee value chain, enabling easier trading partner discovery,
        making transactions simpler, providing objective coffee quality, sourcing, and environmental verification. It
        means finding better ways to work together.
      </MdxText>
      <MdxHeading1>Coffeeseed Transaction Platform</MdxHeading1>
      <MdxText>
        One of Coffeeseed&rsquo;s solutions is the Transaction Portal: a trading platform designed specifically for the
        specialty coffee industry. It&rsquo;s a new environment where buyers can search, sort, and purchase coffee with
        greater confidence - a place where sellers can post, promote, independently verify, and compare their coffee
        with competitive alternatives.
      </MdxText>
      <MdxHeading1>Personal Achievements</MdxHeading1>
      <MdxText>
        As the only engineer on this project, I singlehandedly built the first iteration of Coffeeseed Transaction
        Platform:
      </MdxText>
      <MdxUnorderedList>
        <MdxListItemTrophy>
          From zero to go-live in less than five months with daily releases using{" "}
          <MdxLink href="https://docs.github.com/en/actions">GitHub Actions</MdxLink> and{" "}
          <MdxLink href="https://aws.amazon.com">AWS</MdxLink>.{" "}
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a series of micro-frontends with <MdxLink href="https://reactjs.org">React</MdxLink>,{" "}
          <MdxLink href="https://mui.com">Material-UI</MdxLink>, <MdxLink href="https://nextjs.org">NextJS</MdxLink> and{" "}
          <MdxLink href="https://www.typescriptlang.org">TypeScript</MdxLink> for secure authentication, trading coffee
          in the marketplace, order management, fulfillment and payment.{" "}
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Created a self-describing API and Data Model by implementing a{" "}
          <MdxLink href="https://graphql.org">GraphlQL</MdxLink>-based backend using{" "}
          <MdxLink href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</MdxLink>,{" "}
          <MdxLink href="https://typegraphql.com">TypeGraphQL</MdxLink> and{" "}
          <MdxLink href="https://typegoose.github.io/typegoose/">Typegoose</MdxLink>.{" "}
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Internationalized and localized the application for English, Spanish and Portuguese users, by implementing an
          I18N-layer with <MdxLink href="https://www.i18next.com">i18next</MdxLink>.{" "}
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a security middleware with <MdxLink href="https://aws.amazon.com/cognito/">AWS Cognito</MdxLink>{" "}
          and <MdxLink href="https://jwt.io">JWT</MdxLink> to add a policy-neutral access-control mechanism (
          <MdxLink href="https://en.wikipedia.org/wiki/Role-based_access_control">RBAC</MdxLink>), allowing for
          fine-grained context-aware authorization in any backend operation.{" "}
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a file-based IO-layer with <MdxLink href="https://aws.amazon.com/s3/">AWS S3</MdxLink>,{" "}
          <MdxLink href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html">
            CloudWatch Event Rules
          </MdxLink>{" "}
          and <MdxLink href="https://aws.amazon.com/lambda/">Lambda</MdxLink> to generate nightly{" "}
          <MdxLink href="https://www.nacha.org">NACHA/ACH</MdxLink>-payment files, international wire files, transaction
          files and allow the Coffeeseed back-office team to perform batch updates by uploading a return payload.
        </MdxListItemTrophy>
      </MdxUnorderedList>
      <MdxText>
        I inmensely enjoyed being part of the Coffeeseed journey and I wish they grow to be a thriving force in the
        coffee industry.
      </MdxText>
    </PageContainer>
  </Layout>
)

export default CoffeeseedPage
