
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = (props:Props) => {
  return <>
    <Header />
    <div id="page-content-wrapper" className="d-flex align-items-center w-100" style={{minHeight: 'calc(100vh - 200px)'}}>
      {props.children}
    </div>
    <Footer />
  </>
}

export default Layout;