import { useWallet } from '@suiet/wallet-kit'
import { useState } from 'react';
import { request } from 'graphql-request'
import useSWR, { Fetcher } from 'swr'
const fetcher: Fetcher = (query: string) => request('/api/graphql', query)
const packageId = "0xf94fb02adf6decf93ac7908fe6c67d29b8e82a93";

export function useSui() {
  const wallet = useWallet();
  const [loading, setLoading] = useState<boolean>()

  const getLemonsByOwner = (owner: string) => {
    const { data, error } = useSWR(
      `query {
        nfts(type: "lemon", owner: "${owner}") {
          id,
          type,
          owner,
          url,
          traits {
            name,
            flavour
          }
        }
      }`,
      fetcher
    )
  }

  const mintLemon = async () => {
    setLoading(true)
    const signableTransaction = {
      kind: 'moveCall' as const,
      data: {
        packageObjectId: packageId,
        module: 'lemon',
        function: 'create_lemon',
        typeArguments: [],
        arguments: [
          '0xd43ca4ed4596c04c71c7375180cae11fbc509804',
        ],
        gasBudget: 10000,
      },
    }
    
    try {
      await wallet.signAndExecuteTransaction({
        transaction: signableTransaction 
      });
      getLemonsByOwner(wallet.address)
    } catch (e) {
      console.log(e)
      setLoading(false)
      return false
    }
    return true
  }

  const mintItem = async () => {
    const signableTransaction = {
      kind: 'moveCall' as const,
      data: {
        packageObjectId: packageId,
        module: 'item',
        function: 'create_item',
        typeArguments: [],
        arguments: [
          '0xb53f6171cc3eb7797d3613491201fb96c38cd73',
        ],
        gasBudget: 10000,
      },
    }
    
    try {
      await wallet.signAndExecuteTransaction({
        transaction: signableTransaction 
      });
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      return false
    }
    return true
  }

  const signOut = () => {
    localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME')
    wallet.disconnect()
  }

  return { mintLemon, mintItem, signOut, loading };
}