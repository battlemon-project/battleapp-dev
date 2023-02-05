import Layout from "../../components/Layout";

function Labs() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-light mb-5 pb-5">Labs</h1>
        <div className="row justify-content-center">
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Crafting</a></h4>
            </div>
          </div>
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Grading</a></h4>
            </div>
          </div>
          <div className="col-3">
            <div className="icon-box d-flex align-items-center text-center">
              <h4 className="w-100"><a href="">Mixing</a></h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Labs
