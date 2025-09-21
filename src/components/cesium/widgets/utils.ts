import { Math as CesiumMath, Cartesian3, SceneMode } from 'cesium';
import type { Viewer } from 'cesium';

export const etGoHome = (viewer: Viewer) => {
  if (!viewer) return;
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(145.350281, -37.757549, 3000),
    orientation: {
			heading: CesiumMath.toRadians(0.0),
			pitch: CesiumMath.toRadians(-75.0),
		},
  });
}

export const toggleMapFullscreen = () => {
  const element = document.getElementById('viewer-container');
  if (!element) throw new Error(`Map container not found :(`);

  if (document.fullscreenElement) { document.exitFullscreen();
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err: Error) => { throw err });
    } else {
      alert('Browser does not support fullscreen');
    }
  }
}

export const togglePlane = (viewer: Viewer) => {
  const scene = viewer.scene;
  if (!scene) return;

  if (scene.mode == SceneMode.SCENE2D) {
    scene.mode = SceneMode.SCENE3D;
  } else {
    scene.mode = SceneMode.SCENE2D;
  }

  viewer.container.dispatchEvent(new CustomEvent('toggleSceneMode'));
}