import type { Waypoints, WaypointFeature, WaypointProperties } from './schema';
import { Waypoints as WaypointSchema } from './schema';
import { GeoJSONFeatureCollectionSchema } from 'zod-geojson';

export const openModal = (id: string) => {
  /* @ts-expect-error showModal does exist on that particular element only */
  document.getElementById(id).showModal();
}

const colToName = {
	'#df8e1d': 'other',
	'#8839ef': 'poi',
	'#40a02b': 'rest',
	'#1e66f5': 'facility',
}
export const filterGeojson = (
  data: Waypoints,
  splitCol: WaypointProperties
) => {
  const splits = Object.groupBy(data.features, (feature: WaypointFeature) => feature.properties[splitCol]);

	const newCollections = Object.keys(splits).map((key: string) => {
		const newCol = GeoJSONFeatureCollectionSchema.safeParse({
			type: "FeatureCollection",
			name: colToName[key] || 'other',
			crs: data.crs,
			features: splits[key],
		});
		
		if (newCol.success) { return(newCol.data) } 
		else { console.error(newCol.error) }
	});

	return newCollections;
}