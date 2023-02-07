import { SceneLoader, Scene, ActionManager, ExecuteCodeAction, Vector3, AbstractMesh, IParticleSystem, Skeleton, AnimationGroup, TransformNode, Geometry, Light } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useContext, useEffect } from 'react';
import { SceneContext } from 'babylonjs-hook';
import { useNavigate } from "react-router-dom";
import LoadingScreen from '../helpers/LoadingScreen'

const buildingStrokes: { [key: string]: { stroke: string[], page?: string } } = {
  factory: {
    stroke: ['factory_stroke'],
    page: '/defi'
  },
  craft: {
    stroke: ['craft_stroke', 'craft_manipulator_stroke', 'craft_manipulator7_stroke', 'craft_manipulator8_stroke'],
    page: '/labs'
  },
  stake: {
    stroke: ['stake_stroke', 'stake_coin_stroke'],
    page: '/vault'
  },
  shop: {
    stroke: ['shop_stroke', 'windmill_stroke_01', 'windmill_stroke_02'],
    page: '/shop'
  },
  arena: {
    stroke: ['arena_stroke', 'arena_rotator_a_stroke'],
    page: '/hub'
  },
  download: {
    stroke: ['download_client_car_stroke', 'download_client_car_adv_stroke']
  },
  lemterprise: {
    stroke: ['lemterprise_stroke']
  },
  engines: {
    stroke: ['engines_stroke']
  }
}

function Town() {
  const navigate = useNavigate();
  const context = useContext(SceneContext);
  const scene = context.scene as Scene;
  const engine = scene?.getEngine();
  const canvas = engine?.getRenderingCanvas() as HTMLCanvasElement;
  if (engine) {
    engine.loadingScreen = new LoadingScreen(canvas)
  }

  const constructor = (meshes: AbstractMesh[], particleSystems: IParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[], transformNodes: TransformNode[], geometries: Geometry[], lights: Light[]) => {
    animationGroups.forEach(animation => animation.start(true, 1))

    Object.values(buildingStrokes).map(val => val.stroke).flat().forEach(_stroke => {
      const stroke = scene.getMeshByName(_stroke);
      if (stroke) stroke.visibility = 0;
    })
  
    let selectedBuilding: string = '';
  
    scene.onPointerMove = function(evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);
      if (pickResult && pickResult.hit && pickResult.pickedMesh) {
        const meshPrefix = pickResult.pickedMesh.name.split('_')[0];
        if (selectedBuilding !== meshPrefix) {
          const buildings = buildingStrokes[meshPrefix]
          if (buildings) {
            document.body.style.cursor = "pointer";
            buildings.stroke.forEach(building => {
              const newStrokeBuilding = scene.getMeshByName(building)
              if (newStrokeBuilding) newStrokeBuilding.visibility = 1;
            })
          }
          if (selectedBuilding) {
            const oldStrokeBuildings = buildingStrokes[selectedBuilding]
            if (oldStrokeBuildings) {
              document.body.style.cursor = "default";
              oldStrokeBuildings.stroke.forEach(building => {
                const oldStrokeBuilding = scene.getMeshByName(building)
                if (oldStrokeBuilding) oldStrokeBuilding.visibility = 0;
              })
            }
          }
          selectedBuilding = meshPrefix
        }
      }
    }
  
    scene.onPointerPick = function(evt) {
      const picked = buildingStrokes[selectedBuilding];
      if (picked && picked.page) {
        navigate(picked.page)
      }
    }
  }

  useEffect(() => {
    if (!scene || !canvas || !engine) return;
    engine.displayLoadingUI();
    scene.executeWhenReady(() => engine.hideLoadingUI());
    SceneLoader.ImportMesh("","/resources/models/", 'MainMenu_Stripes_Export.glb', scene, constructor);

    return () => {
      engine.hideLoadingUI()
    }
  }, [context]);

  return <></>;
}

export default Town
