# Data Stuff
## Data 
I used [Astro content collections](https://docs.astro.build/en/guides/content-collections/) for importing the data which has native loaders for JSON files but doesn't recognise GeoJSON, hence changing the filetypes to JSON instead. 

Waypoints data was modified a bit, I added additional properties to make use of the fact that Cesium natively-supports simplestyle for GeoJSON files, which made it easier to style the map. ((simplestyle specifications)[https://github.com/mapbox/simplestyle-spec] and (Sandcastle simplestyle example)[https://sandcastle.cesium.com/?src=GeoJSON%20simplestyle.html]). 

## Other
I had originally planned on using PostgreSQL (see `./src/db/README.md`) which didn't end up happening. But I've included the files I used to import and preprocess the files anyway. They're named appropriately. `import-data.sh` obviously requires Bash but would also need GDAL on path so `ogr2ogr` can be called and any relevant DB connection details in environment (or an `.env`) with the default PostgreSQL env var names (`PGHOST`, `PGUSER`, etc.). 
