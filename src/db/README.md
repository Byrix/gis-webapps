# Database Stuff
These files aren't actually used in the final build, just included for completeness and my future reference.

I had it set up to use PostgreSQL initially, which was just set up with views that selected the data from the respective tables in a GeoJSON compliant-format with `jsonb_build_object` calls so it could still be passed straight into Cesium's / Resium's `GeoJsonDataSource` objects / components. 

*But* my current setup for my DB uses client SSL encryption to authorise access, for which the only current key is mine obviously. I had initially planned to just host this project on the same server so the DB was local (hence the `Dockerfile`), and then just allow remote connections to the site itself, which would open up server-side actions too rather than just a static page on Github. But frankly just didn't have time to set it all up so static it is. 
