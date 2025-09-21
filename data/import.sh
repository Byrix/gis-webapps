#!/bin/bash

# Assumes relevant connection details are in environment or ./.env
# See: https://www.postgresql.org/docs/current/libpq-envars.html

set -a
source ./.env
set +a

psql -U byrix -d advanced_gis -c "DROP SCHEMA IF EXISTS webapps CASCADE;"
psql -U byrix -d advanced_gis -c "CREATE SCHEMA webapps;"

ogr2ogr -f "PostgreSQL" PG:"dbname=advanced_gis user=byrix" ./Lilydale_to_Warburton_Rail_Trail_waypoints.geojson -nln webapps.waypoints
ogr2ogr -f "PostgreSQL" PG:"dbname=advanced_gis user=byrix" ./Lilydale_to_Warburton_Rail_Trail.geojson -nln webapps.trail

psql -U byrix -d advanced_gis -f ./preprocessing.sql