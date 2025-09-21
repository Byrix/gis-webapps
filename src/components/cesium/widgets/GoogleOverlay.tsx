// https://github.com/reearth/resium/issues/600

import { useEffect } from 'react';
import { useCesium } from 'resium';
import { createGooglePhotorealistic3DTileset } from 'cesium';

const GoogleMapsOverlay = () => {
  const { viewer } = useCesium();

	useEffect(() => {
		if (viewer) {
			const getGoogle = async () => {
				const data = await createGooglePhotorealistic3DTileset().catch((e) => console.error(e));
				viewer.scene.primitives.add(data);
			}

			getGoogle().catch(e => console.error(e));
		}
	}, [viewer]);

	return <></>
};

export default GoogleMapsOverlay;