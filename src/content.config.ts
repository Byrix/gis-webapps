import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { GeoJSONFeatureCollectionSchema } from 'zod-geojson';

const dataSources = defineCollection({
  loader: glob({
    pattern: '**/*.geojson',
    base: "./data",
    generateId: ({ entry }) => entry.replace(/\.geojson$/,''),
  }),
  schema: GeoJSONFeatureCollectionSchema
});
