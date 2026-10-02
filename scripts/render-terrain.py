"""Render numerical elevation data as a shaded-relief map; not historical imagery."""
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw
import math,json
root=Path(__file__).resolve().parent.parent
rows=[]
for y in range(48,60):
    row=[]
    for x in range(73,82):
        a=np.array(Image.open(root/f'scripts/terrain/{x}-{y}.png').convert('RGB'),dtype=float)
        row.append(a[:,:,0]*256+a[:,:,1]+a[:,:,2]/256-32768)
    rows.append(np.concatenate(row,axis=1))
z=np.concatenate(rows,axis=0)
# Terrarium values are heights in meters. Hillshade uses a generalized regional pixel scale.
dy,dx=np.gradient(z,1000,1000)
nx=-dx*3;ny=-dy*3;nz=np.ones_like(z)
norm=np.sqrt(nx*nx+ny*ny+nz*nz)
shade=(nx*(-.55)+ny*(-.55)+nz*.63)/norm
shade=np.clip((shade-.25)*1.5,0,1)
# Concept-inspired elevation tint: olive lowlands, ochre hills, pale rocky peaks.
# These are cartographic elevation colors, not a reconstruction of vegetation.
stops=np.array([-450,0,250,700,1300,2200,3500])
colors=np.array([[91,116,82],[106,134,89],[132,147,99],
                 [177,162,112],[194,170,128],[169,155,132],[220,211,185]])
base=np.stack([np.interp(z,stops,colors[:,channel]) for channel in range(3)],axis=2)
rgb=np.clip(base*(.62+shade[:,:,None]*.58),0,255)
# Sea is represented by negative bathymetric elevation. Inland below-sea-level terrain
# remains part of the relief; vector lakes and coastline render on top in the app.
mask=Image.new('L',(z.shape[1],z.shape[0]),0)
draw=ImageDraw.Draw(mask)
def pixel(point):
    lng,latitude=point[:2]
    latitude=max(-85,min(85,latitude))
    xx=(lng+180)/360*32768-73*256
    yy=(1-math.asinh(math.tan(math.radians(latitude)))/math.pi)/2*32768-48*256
    return (xx,yy)
for feature in json.loads((root/'dist/data/land.geojson').read_text())['features']:
    geom=feature['geometry']
    polygons=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]
    for polygon in polygons:
        for i,ring in enumerate(polygon):
            draw.polygon([pixel(point) for point in ring],fill=255 if i==0 else 0)
sea=np.array(mask)==0
depth=np.clip(-z/2200,0,1)
shallow=np.array([31,117,150])
deep=np.array([7,49,80])
water=shallow[None,None,:]*(1-depth[:,:,None])+deep[None,None,:]*depth[:,:,None]
rgb[sea]=water[sea]
out=np.uint8(rgb)
Image.fromarray(out).save(root/'dist/assets/relief.png',optimize=True)
def lat(y):return math.degrees(math.atan(math.sinh(math.pi*(1-2*y/128))))
bounds=[[lat(60),73/128*360-180],[lat(48),82/128*360-180]]
metadata={'bounds':bounds,'source':'https://registry.opendata.aws/terrain-tiles/','attribution':'Terrain: Mapzen / Tilezen; USGS SRTM & GMTED2010, NOAA ETOPO1','note':'Modern elevation reference. Meridian color and hillshade rendering; not ancient terrain reconstruction.'}
metadata_path=root/'dist/data/relief.json'
if metadata_path.exists():
    detail=json.loads(metadata_path.read_text()).get('detail')
    if detail: metadata['detail']=detail
metadata_path.write_text(json.dumps(metadata,indent=2))
print('Rendered elevation relief with bounds',bounds)
