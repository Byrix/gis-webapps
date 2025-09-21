
import { Pool } from 'pg';
import { PG_HOST, PG_USER, PG_PASSWORD } from 'astro:env/server';
import { InitPoint } from './schema';
import { GeoJSONFeatureCollectionSchema } from 'zod-geojson';

const pool = new Pool({
  host: PG_HOST || "192.168.1.52",
  user: PG_USER,
  password: PG_PASSWORD,
  database: "advanced_gis"
});

export const getTrail = async () => {
  const query = `SELECT jsonb_build_object geojson FROM webapps.trail_geojson`;
  const { rows } = await pool.query(query);
  const data = await GeoJSONFeatureCollectionSchema.parseAsync(rows[0]['geojson']);
  return data;
}

export const getWaypoints = async () => {
  const query = `SELECT jsonb_build_object geojson FROM webapps.waypoints_geojson`;
  const { rows } = await pool.query(query);
  const data = await GeoJSONFeatureCollectionSchema.parseAsync(rows[0]['geojson']);
  return data;
}

export const getInitialPoint = async () => {
  const query =   `SELECT ST_X((dp).geom) lon, ST_Y((dp).geom) lat, ST_Z((dp).geom) z
                  FROM (SELECT ST_DumpPoints(geom) dp FROM webapps.trail) foo
                  ORDER BY RANDOM()
                  LIMIT 1;`;
  const { rows } = await pool.query(query);
  const initPoint = await InitPoint.parseAsync(rows[0]);
  return initPoint;
}
