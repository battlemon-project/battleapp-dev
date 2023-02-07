import { Scene, ArcRotateCamera, Vector3, HemisphericLight, Color4, CubeTexture } from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook';
import Platforms from '../scenes/Platforms'
import Layout from "../components/Layout";
import { useWallet } from '@suiet/wallet-kit';
import LoadingScreen from '../helpers/LoadingScreen'

const onSceneReady = (scene: Scene) => {
  const engine = scene.getEngine();
  const canvas = engine.getRenderingCanvas();
  engine.loadingScreen = new LoadingScreen(canvas!)
  const camera = new ArcRotateCamera("camera", Math.PI/2, Math.PI/2.1, 450, new Vector3(0,0,0), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(1, 1, 1), scene);
  light.intensity = 1;
  scene.clearColor = new Color4(0,0,0,0.001);
      
  const hdrTexture = CubeTexture.CreateFromPrefilteredData("/resources/hdr/environmentSpecular.env", scene);
  scene.environmentTexture = hdrTexture;
  scene.environmentTexture.level = 1;
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {

}

function Home() {
  const { connected } = useWallet()

  return (
    <Layout>
      <SceneComponent antialias={true} onSceneReady={onSceneReady} onRender={onRender} className="vh-100 w-100 position-absolute top-0">
        <Platforms />
      </SceneComponent>
    </Layout>
  );
}

export default Home
