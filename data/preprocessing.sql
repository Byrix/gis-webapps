SET search_path=webapps,"$user",public;

ALTER TABLE trail RELOWER("name") COLUMN "id" TO fid;
ALTER TABLE waypoints RELOWER("name") COLUMN "id" TO fid;

ALTER TABLE waypoints
ADD COLUMN IF NOT EXISTS colour TEXT,
ADD COLUMN IF NOT EXISTS symbol TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;

UPDATE waypoints
SET category = (
	SELECT CASE
		WHEN 
			LOWER("name") LIKE '%toilet%' 
			OR LOWER("name") LIKE 'car%'
			OR LOWER("name") LIKE '%water%'
		THEN 'facility'
		WHEN 
			LOWER("name") LIKE 'playground' 
			OR LOWER("name") LIKE 'picnic%'
			OR LOWER("name") LIKE '%cafe%'
			OR LOWER("name") LIKE '%hotel%'
		THEN 'rest'
		WHEN
			LOWER("name") LIKE '%station%'
			OR LOWER("name") LIKE '%museum%'
		THEN 'poi'
		ELSE 'misc'
	END
),
colour = (
	SELECT CASE 
		WHEN category=='poi' THEN '#8839ef'
		WHEN category=='facility' THEN '#1e66f5'
		WHEN category=='rest' THEN '#40a02b'
		ELSE '#df8e1d'
	END
),
symbol = (
	SELECT CASE
		WHEN LOWER("name") LIKE '%toilet%' THEN 'toilets'
		WHEN LOWER("name") LIKE '%car%' THEN 'parking'
		WHEN LOWER("name") LIKE '%water%' THEN 'water'
		WHEN LOWER("name") LIKE '%playground%' THEN 'playground'
		WHEN LOWER("name") LIKE '%station%' THEN 'rail'
		WHEN LOWER("name") LIKE '%cafe%' THEN 'cafe'
		WHEN LOWER("name") LIKE '%hotel%' THEN 'lodging'
		WHEN LOWER("name") LIKE '%picnic%' THEN 'restaurant'
		ELSE NULL
	END
);

CREATE VIEW trail_geojson AS
SELECT jsonb_build_object(
	'type', 'FeatureCollection',
	'features', jsonb_agg(features.feature)
) FROM (
	SELECT jsonb_build_object(
		'type', 'Feature',
		'id', fid,
		'geometry', ST_AsGeoJSON(geom)::jsonb,
		'properties', to_jsonb(inputs) - 'fid' - 'geom'
	) AS feature
	FROM (SELECT * FROM trail) inputs
) features;

CREATE OR REPLACE VIEW waypoints_geojson AS
SELECT jsonb_build_object(
	'type', 'FeatureCollection',
	'features', jsonb_agg(features.feature)
) FROM (
	SELECT jsonb_build_object(
		'type', 'Feature',
		'id', fid,
		'geometry', ST_AsGeoJSON(geom)::jsonb,
		'properties', jsonb_build_object(
			'name', "name",
			'category', category,
			'marker-color', colour,
			'marker-symbol', symbol
		)
	) AS feature
	FROM (SELECT * FROM waypoints) inputs
) features;
