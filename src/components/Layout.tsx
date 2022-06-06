import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => (
  <>
    <Head>
      <title>{title ? `${title} · Devillers` : "Martin Devillers · Software Engineer"}</title>
      <meta name="author" content="Martin Devillers" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        key="description"
        content="I am a software engineer that enjoys helping organizations with the design and implementation of elegant yet powerful IT-solutions."
      />
      <meta
        name="keywords"
        key="keywords"
        content="software,engineer,devillers,development,design,consultant,web,mobile,cloud,amazon,aws,react,typescript,nextjs,gatsby,graphql,mongodb,dynamodb,ec2,s3,cloud,serverless"
      />
    </Head>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
