import { useCesium } from 'resium';
import { use, useRef, useEffect, useMemo } from 'react';
import { type Viewer, type Cesium3DTileset } from 'cesium';

type tilesetType = Cesium3DTileset | Promise<Cesium3DTileset>;


export default function Custom3DTileset({ tileset }: {
  tileset: Cesium3DTileset | Promise<Cesium3DTileset>
}) {
  const { viewer } = useCesium();
  const viewRef = useRef<Viewer>(undefined);
  if (!viewer) return;
  else if ( viewer != viewRef.current) viewRef.current = viewer;

  const resolveTileset = (tileset: tilesetType) => tileset instanceof Promise ? use(tileset) : tileset
  const newTileset = useMemo(() => resolveTileset(tileset), []);

  useEffect(() => {
    if (!newTileset || !viewRef.current) return;
    viewRef.current.scene.primitives.add(newTileset);
  }, [newTileset, viewRef]);

  return <></>;
}
