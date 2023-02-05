
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = (props:Props) => {
  return <>
    <Header />
    <div id="page-content-wrapper" className="d-flex align-items-center" style={{minHeight: 'calc(100vh - 200px)'}}>
      <div className="w-100">
        {props.children}
      </div>
    </div>
    <Footer />
  </>
}

export default Layout;