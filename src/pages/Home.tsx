import { Scene, FreeCamera, Vector3, HemisphericLight, Color4, HDRCubeTexture } from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook';
import Layout from "../components/Layout";
import City from '../scenes/City'

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  const camera = new FreeCamera(
    "camera",
    new Vector3(0,5,90),
    scene
  )

  camera.fov = 0.5;
  camera.setTarget(new Vector3(0,5,0))

  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(10,10,-10), scene);
  light.intensity = 0.5
  
  const hdrTexture = new HDRCubeTexture("/resources/hdr/clarens_midday_1k.hdr", scene, 23);
  scene.environmentTexture = hdrTexture;
  scene.environmentTexture.level = 0.7;
  scene.clearColor = new Color4(0,0,0,0.001);
}

function Home() {
  return (
    <Layout>
      <SceneComponent antialias={true} onSceneReady={onSceneReady} className="vh-100 w-100 position-absolute top-0">
        <City />
      </SceneComponent>
    </Layout>
  );
}

export default Home
