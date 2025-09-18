import { CESIUM_TOKEN } from 'astro:env/client';
import { Viewer as ResiumViewer, CameraFlyTo, GeoJsonDataSource } from 'resium';
import { Ion, Cartesian3, Math as CesiumMath, Color, createWorldTerrainAsync, type Viewer, createGooglePhotorealistic3DTileset } from 'cesium';
import type { InitPoint } from '../../db/schema';
import type { GeoJSONFeatureCollection } from 'zod-geojson';
import { Sidebar } from './Sidebar';
import { MapControls } from './widgets';
import NavModal from './NavModal';
import Custom3DTileset from './3DTileset';

import { Suspense } from 'react';
import { SidebarSkeleton } from './Sidebar';

Ion.defaultAccessToken = CESIUM_TOKEN;

const viewerArgs: Viewer.ConstructorOptions = {
  geocoder: false,
  fullscreenButton: false,
  sceneModePicker: false,
  homeButton: false,
  navigationHelpButton: false,
  creditContainer: 'void',
  creditViewport: 'void',
  timeline: false,
  animation: false,
};

export function CesiumMap({ initPoint, trail, waypoints }: {
  initPoint: InitPoint,
  trail: GeoJSONFeatureCollection,
  waypoints: GeoJSONFeatureCollection
}) {
  return (
    <>
      <Suspense fallback={<MapSkeleton />}>
        <ResiumViewer
          className='w-full h-full'
          id={'viewer-container'}
          terrainProvider={createWorldTerrainAsync()}
          {...viewerArgs}
        >
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
          <MapControls />
          <Suspense>
            <Custom3DTileset tileset={createGooglePhotorealistic3DTileset()} />
          </Suspense>
          <Suspense>
            <GeoJsonDataSource
              data={trail}
              stroke={Color.WHITE}
              strokeWidth={5}
              clampToGround
            />
            <GeoJsonDataSource
              data={waypoints}
              markerSize={50}
              markerColor={Color.BLUE}
            />
          </Suspense>
          <Suspense>
            <CameraFlyTo
              destination={Cartesian3.fromDegrees(initPoint['lon'], initPoint['lat'], 3000)}
              orientation={{
                heading: CesiumMath.toRadians(0.0),
                pitch: CesiumMath.toRadians(-65.0),
              }}
            />
          </Suspense>
          <NavModal />
        </ResiumViewer>
      </Suspense>

      <div id='void' className='hidden' />
    </>
  );
}

export function MapSkeleton() {
  return (
    <div className='h-full w-full skeleton' />
  );
}

