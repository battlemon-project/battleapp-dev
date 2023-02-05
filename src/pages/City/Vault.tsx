import Layout from "../../components/Layout";

function Vault() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-light mb-5 pb-5">Vault</h1>
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">NFT Pool</a></h4>
            </div>
          </div>
          <div className="col-4">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">LPiT Pool</a></h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Vault
