import { CESIUM_TOKEN } from 'astro:env/client';
import { Viewer as ResiumViewer, CameraFlyTo, GeoJsonDataSource, Cesium3DTileset as Resium3DTileset } from 'resium';
import { Ion, Cartesian3, Math as CesiumMath, Color, createWorldTerrainAsync, type Viewer, type Cesium3DTileset, IonResource, IonGeocodeProviderType } from 'cesium';
import { Sidebar } from './Sidebar';
import { MapControls, NavModal, GoogleMapsOverlay } from './widgets';

import { Suspense } from 'react';
import type { Waypoints, Trail } from '../../schema';

Ion.defaultAccessToken = CESIUM_TOKEN;

const viewerArgs: Viewer.ConstructorOptions = {
  geocoder: IonGeocodeProviderType.GOOGLE,
  fullscreenButton: false,
  sceneModePicker: false,
  homeButton: false,
  navigationHelpButton: false,
  creditContainer: 'void',
  creditViewport: 'void',
  timeline: false,
  animation: false,
	baseLayerPicker: false
};

export function CesiumMap({ trail, waypoints }: {
  trail: Trail,
  waypoints: Waypoints[]
}) {
	return (<>
		<Suspense>
		<ResiumViewer
			className='w-full h-full'
			id={'viewer-container'}
			terrainProvider={createWorldTerrainAsync()}
			{...viewerArgs}
		>
			<GoogleMapsOverlay />
			<Sidebar />
			<MapControls />
			<GeoJsonDataSource
				data={trail}
				stroke={Color.WHITE}
				strokeWidth={5}
				clampToGround
			/>

			{waypoints.map((feature, ind) => (
				<GeoJsonDataSource
					key={ind}
					name={feature.name}
					data={feature}
					markerSize={50}
				/>
			))}

			<CameraFlyTo
				destination={Cartesian3.fromDegrees(145.350281, -37.757549, 3000)}
				orientation={{
					heading: CesiumMath.toRadians(0.0),
					pitch: CesiumMath.toRadians(-75.0),
				}}
			/>
		</ResiumViewer>
		</Suspense>

		<div id='void' className='hidden' />
	</>);
}

export function MapSkeleton() {
  return <div className='h-full w-full skeleton' />;
}

