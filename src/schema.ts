import { z } from 'astro:schema';
import { GeoJSONFeatureCollectionSchema } from 'zod-geojson';

const hexCode = z.string().regex(/^#?[0-9a-f]{6}|[0-9a-f]{3}$/i);

const CoordsPoint = z.array(z.number()).min(2).max(3);
const CoordsLine = z.array(CoordsPoint).min(2);
const CoordsPoly = z.array(CoordsLine).min(1);
const CoordsMultiPoint = z.array(CoordsPoint).min(1);
const CoordsMultiLine = z.array(CoordsLine).min(1);
const CoordsMultiPoly = z.array(CoordsPoly).min(1);
const GeometryCollection = z.array(z.union([CoordsPoint, CoordsLine, CoordsPoly, CoordsMultiPoint, CoordsMultiLine, CoordsMultiPoly]));

const GeomPoint = z.object({ type: z.literal('Point'), coordinates: CoordsPoint });
const GeomLine = z.object({ type: z.literal('LineString'), coordinates: CoordsLine });
const GeomMultiLine = z.object({ type: z.literal("MultiLineString"), coordinates: CoordsMultiLine });



export type WaypointProperties = 'fill' | 'name' | 'stroke' | 'marker-color' | 'marker-symbol';
export const WaypointFeature = z.object({
	geometry: GeomPoint,
	properties: z.object({
		fill: hexCode,
		name: z.string(),
		stroke: hexCode,
		'marker-color': hexCode,
		'marker-symbol': z.string()
	}),
});
export type WaypointFeature = z.infer<typeof WaypointFeature>;
export const Waypoints = z.object({
	...GeoJSONFeatureCollectionSchema.shape,
	features: z.array(WaypointFeature),
});
export type Waypoints = z.infer<typeof Waypoints>;

export const Trail = z.object({
	...GeoJSONFeatureCollectionSchema.shape,
	geometry: GeomMultiLine,
	properties: z.object({
		Name: z.string(),
	}),
});
export type Trail = z.infer<typeof Trail>;

export { GeoJSONFeatureCollectionSchema as GeoJSONFeatureCollection } from 'zod-geojson';

const time = z.string().regex(/\d{2}:\d{2}(?::\d{2}){,2}/)
export const Weather = z.object({
	conditions: z.string(),
	feelslike: z.coerce.number(),
	humidity: z.coerce.number(),
	icon: z.string(),
	precip: z.coerce.number(),
	precipprob: z.coerce.number(),
	sunrise: z.string(),
	sunset: z.string(),
	temp: z.coerce.number(),
	uvindex: z.coerce.number(),
	windspeed: z.coerce.number()
});
export type Weather = z.infer<typeof Weather>;

export const ToastSchema = z.object({
	type: z.string(),  // TODO: Change to a literal of some kind
	title: z.string(),
	description: z.string(),
	icon: z.string()
})
export type Toast = z.infer<typeof ToastSchema>