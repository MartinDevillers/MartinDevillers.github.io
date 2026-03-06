interface LayoutProps {
  title?: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => <>{children}</>

export default Layout
