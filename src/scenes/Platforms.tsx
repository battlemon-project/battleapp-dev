import { SceneLoader, Scene, ActionManager, ExecuteCodeAction, Vector3, TransformNode, Nullable, AbstractMesh } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useContext, useEffect, useState } from 'react';
import { SceneContext } from 'babylonjs-hook';
import { useNavigate } from "react-router-dom";
import {ConnectModal, useWallet } from '@suiet/wallet-kit';
import { useSui } from '../helpers/Sui';


let originalRotationAngle = 1;

function Platforms() {
  const navigate = useNavigate();
  const context = useContext(SceneContext);
  const scene = context.scene as Scene;
  const engine = scene?.getEngine();
  const canvas = engine?.getRenderingCanvas() as HTMLCanvasElement;
  const [ showSuietModal, setShowSuietModal ] = useState(false);
  const [ everythingLoaded, setEverythingLoaded ] = useState(false);
  const { connected } = useWallet()
  const { mintLemon, loading } = useSui()
  
  const direction = [
    {forward: 3, backward: 2},
    {forward: 1, backward: 3},
    {forward: 2, backward: 1}
  ];

  const handleClickPlatform = () => {
    console.log(connected)
    if (connected) {
      mintLemon()
    } else {
      setShowSuietModal(true);
    }
  }

  const currentPosition = { x: 0, y: 0 };
  let clicked = false;

  function pointerDown(evt: MouseEvent) {
    currentPosition.x = evt.clientX;
    clicked = true;
  }
  
  function pointerUp() {
    clicked = false;
  }

  function pointerMove(evt: MouseEvent) {
    if (!clicked) {
      return;
    }
    const dx = evt.clientX - currentPosition.x;
    const angleY = dx * 0.01;
    //lemonPositions[activePlatform - 1].rotate(new Vector3(0,1,0), angleY);
    originalRotationAngle -= angleY;
    console.log(originalRotationAngle)
    currentPosition.x = evt.clientX;
  }


  const plusMouseOver = (stroke: Nullable<AbstractMesh>) => new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, async function(){
    if (stroke) stroke.visibility = 1;
    scene.hoverCursor = "pointer";
  })

  const plusMouseOut = (stroke: Nullable<AbstractMesh>) => new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, async function(){
    if (stroke) stroke.visibility = 0;
    scene.hoverCursor = "default";
  })

  const plusClick = (stroke: Nullable<AbstractMesh>) => new ExecuteCodeAction(ActionManager.OnPickTrigger, async function(){
    handleClickPlatform()
  })

  const connectEvents = () => {
    ["collider1", "collider2", "collider3"].forEach((name, index) => {  
      const collider = scene?.getMeshByName(name);
      if (!collider) return;
      collider.actionManager = new ActionManager(scene);
      collider.visibility = 0;    
      const stroke = scene.getMeshByName(`Plus_${index + 1}_Stroke`)	
      collider.actionManager.registerAction(plusMouseOver(stroke));
      collider.actionManager.registerAction(plusMouseOut(stroke));
      collider.actionManager.registerAction(plusClick(stroke));      
    });

    canvas.removeEventListener("pointerdown", pointerDown);
    canvas.removeEventListener("pointerup", pointerUp);
    canvas.removeEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointermove", pointerMove);
  }

  useEffect(() => {
    if (!scene || !canvas) return;
    if (!everythingLoaded) return;
    connectEvents();
  }, [connected, everythingLoaded]);

  useEffect(() => {
    if (!scene || !canvas) return;
    engine.displayLoadingUI();
    SceneLoader.ImportMesh("","/resources/models/", 'BTLMN_LemonPlatforms.glb', scene, () => {
      const Camera = scene?.getCameraByName('Camera')
      if (Camera) {
        scene.activeCamera = Camera
      }
    
      ['ring', 'operator', 'target', 'showPos_feature', 'showPos_outfit'].forEach(name => {
        const mesh = scene?.getMeshByName(name)
        if (mesh) mesh.visibility = 0;
      })
    
      const lookatObjects: string[] = ["LemonPos_1", "LemonPos_2", "LemonPos_3"];
      const lemonPositions: TransformNode[] = lookatObjects.map(pos => {
        return scene?.getNodeByName(pos) as TransformNode
      })
    
      const objects: string[] = ["Plus_Back", "Plus_Cap", "Plus_Cloth", "Plus_Face", "Plus_Back_Stroke", "Plus_Cap_Stroke", "Plus_Cloth_Stroke", "Plus_Face_Stroke", "Line_Back_1", "Line_Back_2", "Line_Cap_1", "Line_Cap_2", "Line_Cloth_1", "Line_Cloth_2", "Line_Face_1", "Line_Face_2", "Point_Back", "Point_Cap", "Point_Cloth", "Point_Face", "Background_Sphere"];
    
      const unusedObjects: string[] = ["Point_Weapon", "Plus_Weapon", "Plus_Weapon_Stroke", "Line_Weapon_1", "Line_Weapon_2"];
    
      [...objects, ...unusedObjects].forEach(name => {
        const object = scene?.getMeshByName(name);
        if (!object) return;
        object.visibility = 0;
        object.checkCollisions = false;
        object.isPickable = false;
      });

      lemonPositions.forEach((position, index) => {
        if (!position) return;
        position.rotate(new Vector3(0,1,0), Math.PI) // This is becouse new lemon rotated by default 
        const plus = scene.getMeshByName(`Plus_${index + 1}`)
        const plusStroke = scene.getMeshByName(`Plus_${index + 1}_Stroke`)
        if (plus) {
          plus.rotation = position.rotation;
        }
        if (plusStroke) {
          plusStroke.rotation = position.rotation;
          plusStroke.visibility = 0;
        }
        position.rotate(new Vector3(0,1,0), (Math.PI + Math.PI/3)*index)
      });
    });

    scene.executeWhenReady(() => {
      setEverythingLoaded(true)
      engine.hideLoadingUI()
    });
  }, [scene, canvas]);

  useEffect(() => {
    if (!scene || !canvas || !engine) return;
    if (loading == undefined) return;

    if (loading) {
      console.log('loading', true)
      engine.displayLoadingUI();
    } else {
      console.log('loading', false)
      engine.hideLoadingUI()
    }

    return () => {
      engine.hideLoadingUI()
    }
  }, [loading])

  return <>
    <ConnectModal
      open={showSuietModal}
      onOpenChange={(open) => {
        if (connected) return;
        setShowSuietModal(open)
      }}
    >
    </ConnectModal>
  </>;
}

export default Platforms
