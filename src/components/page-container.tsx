interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">{children}</div>
)

export default PageContainer
