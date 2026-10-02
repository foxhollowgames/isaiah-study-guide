# Map water features

`rivers.geojson` contains 68 river features from Natural Earth 1:10m rivers and lake centerlines. The data is in the public domain.

Source: https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/

Download: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson

Run `node scripts/prepare-rivers.mjs <downloaded-file>` to build the regional file. The script retains lines within or crossing the map extent and excludes named canals. The data gives geographic context. It does not reconstruct ancient river courses. Small streams are outside this dataset's scope.

Water labels use geographic anchors. Labels stay below city labels and do not receive clicks. The map hides water labels when they overlap cities or controls. Small water features receive labels at closer zoom levels.
