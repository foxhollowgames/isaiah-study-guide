"""Render an offline, multiresolution terrain layer from measured elevation tiles."""
from pathlib import Path
import json, math
import numpy as np
from PIL import Image, ImageDraw

root=Path(__file__).resolve().parent.parent
source=root/'scripts/terrain-detail'
target=root/'dist/assets/terrain'
scale=256*1024
def project(point):
    lng,lat=point[:2]
    lat=max(-85,min(85,lat))
    return ((lng+180)/360*scale,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*scale)
def latitude(y):
    return math.degrees(math.atan(math.sinh(math.pi*(1-2*y/1024))))

polygons=[]
for feature in json.loads((source/'land.geojson').read_text(encoding='utf8'))['features']:
    geom=feature['geometry']
    for polygon in geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]:
        rings=[[project(p) for p in ring] for ring in polygon]
        xs,ys=zip(*rings[0])
        polygons.append((rings,(min(xs),min(ys),max(xs),max(ys))))

stops=np.array([-450,0,250,700,1300,2200,3500])
colors=np.array([[91,116,82],[106,134,89],[132,147,99],[177,162,112],
                 [194,170,128],[169,155,132],[220,211,185]])
def elevation(x,y):
    a=np.asarray(Image.open(source/f'{x}-{y}.png').convert('RGB'),dtype=np.float32)
    return a[:,:,0]*256+a[:,:,1]+a[:,:,2]/256-32768

for x in range(604,620):
    folder=target/'10'/str(x)
    folder.mkdir(parents=True,exist_ok=True)
    for y in range(403,425):
        # Real adjacent elevations prevent a lighting seam at tile boundaries.
        z=np.block([[elevation(xx,yy) for xx in range(x-1,x+2)] for yy in range(y-1,y+2)])
        metres=40075016.686*math.cos(math.radians(latitude(y+.5)))/scale
        dy,dx=np.gradient(z,metres,metres)
        nx,ny=-dx*3,-dy*3
        shade=np.clip(((nx*(-.55)+ny*(-.55)+.63)/np.sqrt(nx*nx+ny*ny+1)-.25)*1.5,0,1)[256:512,256:512]
        z=z[256:512,256:512]
        base=np.stack([np.interp(z,stops,colors[:,c]) for c in range(3)],axis=2)
        rgb=np.clip(base*(.62+shade[:,:,None]*.58),0,255)
        mask=Image.new('L',(512,512),0)
        draw=ImageDraw.Draw(mask)
        for rings,(left,top,right,bottom) in polygons:
            if right<x*256 or left>(x+1)*256 or bottom<y*256 or top>(y+1)*256: continue
            for i,ring in enumerate(rings):
                draw.polygon([((px-x*256)*2,(py-y*256)*2) for px,py in ring],fill=255 if i==0 else 0)
        land=np.asarray(mask.resize((256,256),Image.Resampling.LANCZOS),dtype=float)[:,:,None]/255
        depth=np.clip(-z/2200,0,1)[:,:,None]
        water=np.array([31,117,150])*(1-depth)+np.array([7,49,80])*depth
        rgb=rgb*land+water*(1-land)
        Image.fromarray(np.uint8(rgb)).save(folder/f'{y}.png',optimize=True)
    print(f'Rendered detail column {x-603}/16',flush=True)

# Downsample from true detail so normal map zooms request only a few tiles.
for zoom in [9,8]:
    children=list((target/str(zoom+1)).glob('*/*.png'))
    parents={(int(p.parent.name)//2,int(p.stem)//2) for p in children}
    for x,y in parents:
        mosaic=Image.new('RGBA',(512,512))
        for dx in range(2):
            for dy in range(2):
                child=target/str(zoom+1)/str(x*2+dx)/f'{y*2+dy}.png'
                if child.exists(): mosaic.paste(Image.open(child),(dx*256,dy*256))
        folder=target/str(zoom)/str(x)
        folder.mkdir(parents=True,exist_ok=True)
        mosaic.resize((256,256),Image.Resampling.LANCZOS).save(folder/f'{y}.png',optimize=True)

# Keep the rest of the regional lakes, replacing the simplified study-area shapes.
def intersects(geom):
    def points(coords):
        if isinstance(coords[0],(float,int)): yield coords
        else:
            for c in coords: yield from points(c)
    pts=list(points(geom['coordinates']))
    return any(32.34<=p[0]<=37.97 and 29.22<=p[1]<=35.75 for p in pts)
coarse=json.loads((root/'dist/data/lakes.geojson').read_text(encoding='utf8'))
fine=json.loads((source/'lakes.geojson').read_text(encoding='utf8'))
features=[f for f in coarse['features'] if not intersects(f['geometry'])]
features += [{'type':'Feature','properties':{},'geometry':f['geometry']} for f in fine['features'] if intersects(f['geometry'])]
(root/'dist/data/lakes-detail.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')))
metadata=json.loads((root/'dist/data/relief.json').read_text())
metadata['detail']={'url':'assets/terrain/{z}/{x}/{y}.png','minZoom':8,'maxNativeZoom':10,
                    'bounds':[[latitude(425),604/1024*360-180],[latitude(403),620/1024*360-180]],
                    'shorelineSource':'https://github.com/nvkelso/natural-earth-vector/tree/master/geojson',
                    'note':'Zoom 10 measured elevation; 8 times the linear resolution of the overview. Modern Natural Earth 1:10m water outlines.'}
(root/'dist/data/relief.json').write_text(json.dumps(metadata,indent=2))
print('Offline detail tiles and improved lake outlines ready.')
