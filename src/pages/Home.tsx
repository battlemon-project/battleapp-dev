import { Scene, ArcRotateCamera, Vector3, HemisphericLight, Color4, MeshBuilder, Mesh } from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook';
import Platforms from '../scenes/Platforms'

let box: Mesh | undefined;

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  const camera = new ArcRotateCamera("camera", Math.PI/2, Math.PI/2.1, 450, new Vector3(0,0,0), scene);
  camera.lowerAlphaLimit = camera.alpha;
  camera.upperAlphaLimit = camera.alpha;
  camera.upperBetaLimit = camera.beta;
  camera.lowerBetaLimit = camera.beta;
  camera.wheelPrecision = 0.5;
  camera.lowerRadiusLimit = 2450;
  camera.upperRadiusLimit = 2450;
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(1, 1, 1), scene);
  light.intensity = 1;
  scene.clearColor = new Color4(0,0,0,0.001);

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", {size: 200}, scene);
  box.position.y = 100;
  MeshBuilder.CreateGround("ground", {width: 600, height: 600}, scene);
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

function Home() {
  return (
    <div className="App">
      <SceneComponent antialias={true} onSceneReady={onSceneReady} onRender={onRender} className="vh-100 w-100 position-absolute top-0">
        <Platforms />
      </SceneComponent>
    </div>
  );
}

export default Home
