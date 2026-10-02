"""Render an offline, multiresolution terrain layer from measured elevation tiles."""
from pathlib import Path
import argparse, json, math
from functools import lru_cache
import numpy as np
from PIL import Image, ImageDraw

root=Path(__file__).resolve().parent.parent
source=root/'scripts/terrain-detail'
regions=json.loads((root/'scripts/terrain-regions.json').read_text())
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--force',action='store_true',help='Render existing tiles again after a style change.')
args=parser.parse_args()
target=root/'dist/assets/terrain'
scale=256*1024
def project(point):
    lng,lat=point[:2]
    lat=max(-85,min(85,lat))
    return ((lng+180)/360*scale,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*scale)
def latitude(y):
    return math.degrees(math.atan(math.sinh(math.pi*(1-2*y/(scale/256)))))

def save_tile(image,path):
    partial=path.with_suffix('.png.part')
    image.save(partial,format='PNG',optimize=True)
    partial.replace(path)

def load_polygons():
    polygons=[]
    for feature in json.loads((source/'land.geojson').read_text(encoding='utf8'))['features']:
        geom=feature['geometry']
        for polygon in geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]:
            rings=[[project(p) for p in ring] for ring in polygon]
            xs,ys=zip(*rings[0])
            polygons.append((rings,(min(xs),min(ys),max(xs),max(ys))))

    return polygons

stops=np.array([-450,0,250,700,1300,2200,3500])
colors=np.array([[91,116,82],[106,134,89],[132,147,99],[177,162,112],
                 [194,170,128],[169,155,132],[220,211,185]])
@lru_cache(maxsize=512)
def elevation(x,y):
    a=np.asarray(Image.open(root/'scripts/terrain-close'/str(zoom)/f'{x}-{y}.png').convert('RGB'),dtype=np.float32)
    return a[:,:,0]*256+a[:,:,1]+a[:,:,2]/256-32768

for region in regions:
    zoom=region['zoom']
    scale=256*2**zoom
    polygons=load_polygons()
    elevation.cache_clear()
    for x in range(region['x0'],region['x1']):
        folder=target/str(zoom)/str(x)
        folder.mkdir(parents=True,exist_ok=True)
        # Rasterize the coast once per column instead of once per tile.
        mask=Image.new('L',(512,(region['y1']-region['y0'])*512),0)
        draw=ImageDraw.Draw(mask)
        for rings,(left,top,right,bottom) in polygons:
            if right<x*256 or left>(x+1)*256 or bottom<region['y0']*256 or top>region['y1']*256: continue
            for i,ring in enumerate(rings):
                draw.polygon([((px-x*256)*2,(py-region['y0']*256)*2) for px,py in ring],fill=255 if i==0 else 0)
        for y in range(region['y0'],region['y1']):
            if not args.force and (folder/f'{y}.png').exists(): continue
            # Real adjacent elevations prevent a lighting seam at tile boundaries.
            z=np.block([[elevation(xx,yy) for xx in range(x-1,x+2)] for yy in range(y-1,y+2)])[255:513,255:513]
            metres=40075016.686*math.cos(math.radians(latitude(y+.5)))/scale
            dy,dx=np.gradient(z,metres,metres)
            nx,ny=-dx*3,-dy*3
            shade=np.clip(((nx*(-.55)+ny*(-.55)+.63)/np.sqrt(nx*nx+ny*ny+1)-.25)*1.5,0,1)[1:-1,1:-1]
            z=z[1:-1,1:-1]
            base=np.stack([np.interp(z,stops,colors[:,c]) for c in range(3)],axis=2)
            rgb=np.clip(base*(.62+shade[:,:,None]*.58),0,255)
            top=(y-region['y0'])*512
            tile_mask=mask.crop((0,top,512,top+512))
            land=np.asarray(tile_mask.resize((256,256),Image.Resampling.LANCZOS),dtype=float)[:,:,None]/255
            depth=np.clip(-z/2200,0,1)[:,:,None]
            water=np.array([31,117,150])*(1-depth)+np.array([7,49,80])*depth
            rgb=rgb*land+water*(1-land)
            save_tile(Image.fromarray(np.uint8(rgb)),folder/f'{y}.png')
        print(f"Rendered {region['id']} column {x-region['x0']+1}/{region['x1']-region['x0']}",flush=True)


    # Generate the intermediate level from the finer measured terrain.
    for x in range(region['x0']//2,region['x1']//2):
        folder=target/str(zoom-1)/str(x)
        folder.mkdir(parents=True,exist_ok=True)
        for y in range(region['y0']//2,region['y1']//2):
            mosaic=Image.new('RGB',(512,512))
            for dx in range(2):
                for dy in range(2):
                    child=target/str(zoom)/str(x*2+dx)/f'{y*2+dy}.png'
                    with Image.open(child) as tile: mosaic.paste(tile,(dx*256,dy*256))
            save_tile(mosaic.resize((256,256),Image.Resampling.LANCZOS),folder/f'{y}.png')

metadata=json.loads((root/'dist/data/relief.json').read_text())
metadata['closeDetail']=[]
for region in regions:
    scale=256*2**region['zoom']
    metadata['closeDetail'].append({
        'id':region['id'], 'url':'assets/terrain/{z}/{x}/{y}.png',
        'minZoom':region['minZoom'], 'maxNativeZoom':region['zoom'],
        'bounds':[[latitude(region['y1']),region['x0']/2**region['zoom']*360-180],
                  [latitude(region['y0']),region['x1']/2**region['zoom']*360-180]],
        'note':'Modern measured elevation. Source resolution varies. Natural Earth 1:10m water outlines.'})
(root/'dist/data/relief.json').write_text(json.dumps(metadata,indent=2)+'\n')
print('Offline terrain through zoom 14 is ready.')
