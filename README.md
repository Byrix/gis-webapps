# GIS Web App Examples
Repo containing two examples of a GIS-based web application. Built using [Astro](https://astro.build) and [ReactJS](https://react.dev). 

## CesiumJS
First app is built on the [CesiumJS](https://cesium.com/platform/cesiumjs/) platform. It provides a 3D web map showing the [Lilydale - Warburton Rail Trail](https://www.yarraranges.vic.gov.au/Explore-Yarra-Ranges/Parks-Recreation/Lilydale-to-Warburton-Rail-Trail), a popular trail in outer-Eastern Melbourne, Victoria following the historic rail line that once connected Lilydale to Warburton. 

## Google Earth Engine
The second app is built using [Google Earth Engine](https://earthengine.google.com/) (GEE) 

## Build
Full packages requirements can be found in `./package.json` and installed with your Node package manager of choice. Main packages required are Astro, React, TypeScript, TailwindCSS, DaisyUI, Cesium, and Resium. 

Also requires various environment variables to be set. `./astro.config.mjs` contains a schema for which variables are required. 

# Note for Tutors
I'm not sure how familiar any of you are with Astro / React / just component-based JS libraries in general and I honestly just didn't consider it until I was way too committed. Hopefully familiar enough that it won't be an issue. I've tried to include a bunch of readme files around in some of the more "what is going on here" sections. 

If it's confusing start with `./src/pages/cesium.astro` and just follow the imports around. There's a lot of random files around that while useful and needed don't particularly matter for what you're looking for. The main component hierarchy you'll be interested in will be from:

1. `./src/layouts/MainLayout.astro`: main template for the site. The `<head>` tags, the navbar and footer, etc. Basically all the parts of the site that are consistent across all pages. 
    1. `./src/pages/*`: the actual pages of the site, each of which corresponds to the route `/(filename)` in the site url
    2. `./src/pages/cesium.astro`: the page with the Cesium / Rail Trail map on it
        1. `./src/components/*`: all the (mainly React) components used in the pages.
        2. `./src/components/cesium/CesiumMap.tsx`: the parent component of all of the map related features including the sidebar
            1. `./src/components/cesium/widgets/*`: individual components / scripts for all the map features. All the buttons, controls, etc. Not everything in there is used, some just never ended up working, but most are used. Again just follow the imports. 
    3. `./src/content.config.ts`: Data loading through an Astro content collection. 
