import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@suiet/wallet-kit/style.css';
import './index.css'
import { WalletProvider, SuietWallet, SuiWallet, EthosWallet } from '@suiet/wallet-kit';
import Home from './pages/Home'
import Hub from './pages/Hub'
import Defi from './pages/City/Defi'
import Shop from './pages/City/Shop'
import Labs from './pages/City/Labs'
import Vault from './pages/City/Vault'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/hub",
    element: <Hub />
  },
  {
    path: "/defi",
    element: <Defi />
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/labs",
    element: <Labs />
  },
  {
    path: "/vault",
    element: <Vault />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WalletProvider defaultWallets={[SuietWallet, SuiWallet, EthosWallet]}>
    <RouterProvider router={router} />
  </WalletProvider>
)
