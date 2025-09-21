import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { GeoJSONFeatureCollection } from './schema';

const dataSources = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: "./data",
    generateId: ({ entry }) => entry.replace(/\.json$/,''),
  })
});

export const collections = { dataSources };
