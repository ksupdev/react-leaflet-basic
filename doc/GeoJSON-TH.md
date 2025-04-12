# คู่มือการสร้าง GeoJSON

คู่มือนี้ให้คำแนะนำที่ครอบคลุมเกี่ยวกับการสร้าง การแปลง และการทำงานกับไฟล์ GeoJSON สำหรับแอปพลิเคชันแผนที่แบบโต้ตอบ

## สารบัญ

- [GeoJSON คืออะไร?](#geojson-คืออะไร)
- [โครงสร้าง GeoJSON](#โครงสร้าง-geojson)
- [วิธีการสร้างไฟล์ GeoJSON](#วิธีการสร้างไฟล์-geojson)
- [การใช้ geojson.io](#การใช้-geojsonio)
- [แหล่งข้อมูล](#แหล่งข้อมูล)
- [การแปลงจากรูปแบบอื่น](#การแปลงจากรูปแบบอื่น)
- [TopoJSON: ทางเลือกขั้นสูง](#topojson-ทางเลือกขั้นสูง)
- [แนวทางปฏิบัติที่ดีที่สุด](#แนวทางปฏิบัติที่ดีที่สุด)
- [การใช้ GeoJSON กับ React-Leaflet](#การใช้-geojson-กับ-react-leaflet)

## GeoJSON คืออะไร?

GeoJSON เป็นรูปแบบสำหรับเข้ารหัสโครงสร้างข้อมูลทางภูมิศาสตร์โดยใช้ JavaScript Object Notation (JSON) มันถูกใช้อย่างแพร่หลายในการแสดงคุณลักษณะทางภูมิศาสตร์อย่างง่ายพร้อมกับคุณลักษณะที่ไม่ใช่เชิงพื้นที่

## โครงสร้าง GeoJSON

ไฟล์ GeoJSON พื้นฐานมีลักษณะดังนี้:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[longitude1, latitude1], [longitude2, latitude2], ...]]
      },
      "properties": {
        "id": "region-1",
        "name": "ตัวอย่างภูมิภาค",
        "value": 75.4
      }
    }
  ]
}
```

องค์ประกอบหลัก:
- **type**: กำหนดว่าเป็นวัตถุ GeoJSON ประเภทใด
- **geometry**: มีพิกัดทางภูมิศาสตร์จริง
- **properties**: มีข้อมูลเพิ่มเติมเกี่ยวกับคุณลักษณะ

## วิธีการสร้างไฟล์ GeoJSON

### 1. ใช้ไฟล์ GeoJSON ที่มีอยู่แล้ว

มีไฟล์ GeoJSON สำเร็จรูปมากมายสำหรับขอบเขตทั่วไป:
- ประเทศ, รัฐ, จังหวัด, อำเภอ ฯลฯ

### 2. แปลงจากรูปแบบภูมิศาสตร์อื่นๆ

รูปแบบต้นฉบับทั่วไปสำหรับการแปลง:
- Shapefiles (.shp)
- ไฟล์ KML/KMZ (.kml, .kmz)
- CSV ที่มีพิกัด
- TopoJSON (.topojson)
- GeoPackage (.gpkg)
- GPX (.gpx)
- อื่นๆ (GML, DXF, ฯลฯ)

### 3. สร้าง GeoJSON แบบกำหนดเอง

ใช้เครื่องมือเพื่อวาดหรือแก้ไขรูปทรงเรขาคณิต:
- geojson.io
- QGIS
- ArcGIS

## การใช้ geojson.io

[geojson.io](https://geojson.io) เป็นเครื่องมือออนไลน์ที่ทรงพลังสำหรับการสร้างและแก้ไขไฟล์ GeoJSON

### รูปแบบการนำเข้าที่รองรับ
- GeoJSON (.geojson, .json)
- TopoJSON (.topojson, .json)
- KML (.kml)
- KMZ (.kmz)
- GPX (.gpx)
- CSV (.csv) ที่มีคอลัมน์ละติจูด/ลองจิจูด
- Shapefiles (.zip ที่มี .shp, .dbf, .shx)
- WKT (Well-Known Text)
- GeoRSS (.xml)

### ขั้นตอนการทำงานพื้นฐาน
1. **นำเข้าข้อมูลที่มีอยู่**:
   - ลากและวางไฟล์ลงบนแผนที่
   - หรือเริ่มวาดฟีเจอร์จากศูนย์

2. **แก้ไขฟีเจอร์**:
   - วาดจุด, เส้น, หรือรูปหลายเหลี่ยม
   - แก้ไขรูปร่างโดยการลากจุดยอด
   - ลบหรือเพิ่มฟีเจอร์

3. **แก้ไขคุณสมบัติ**:
   - ใช้มุมมองตารางเพื่อเพิ่มหรือแก้ไขคุณสมบัติ
   - ตรวจสอบให้แน่ใจว่าแต่ละฟีเจอร์มีอย่างน้อย "id" และ "name"

4. **ส่งออก GeoJSON ของคุณ**:
   - บันทึกเป็น GeoJSON หรือรูปแบบอื่นที่รองรับ
   - ดาวน์โหลดหรือบันทึกไปยัง GitHub

## แหล่งข้อมูล

### ขอบเขตการปกครอง
- [Natural Earth Data](https://www.naturalearthdata.com/) - ประเทศ, รัฐ, จังหวัด
- [GADM](https://gadm.org/) - ขอบเขตการปกครองทั่วโลก
- [US Census Bureau](https://www.census.gov/geographies/mapping-files) - ขอบเขตในสหรัฐอเมริกา

### ข้อมูล OpenStreetMap
- [Overpass Turbo](https://overpass-turbo.eu/) - แยกข้อมูล OSM เฉพาะ
- [Geofabrik](https://download.geofabrik.de/) - ส่วนสกัดข้อมูล OSM

### พอร์ทัลของรัฐบาล
- [Data.gov](https://data.gov/) (สหรัฐอเมริกา)
- [European Data Portal](https://data.europa.eu/)
- ค้นหา "[ประเทศของคุณ] GIS data portal"

## การแปลงจากรูปแบบอื่น

### ตัวแปลงออนไลน์
- [MapShaper](https://mapshaper.org/) - แปลงและทำให้รูปแบบต่างๆ ง่ายขึ้น
- [MyGeodata Converter](https://mygeodata.cloud/converter/) - แปลงระหว่างรูปแบบภูมิศาสตร์

### ซอฟต์แวร์เดสก์ท็อป
- [QGIS](https://qgis.org/) (ฟรี) - ซอฟต์แวร์ GIS มืออาชีพ
- [ArcGIS](https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview) (มีค่าใช้จ่าย) - GIS มาตรฐานอุตสาหกรรม

### เครื่องมือคอมมานด์ไลน์
- [ogr2ogr](https://gdal.org/programs/ogr2ogr.html) - ยูทิลิตี้การแปลงที่ทรงพลัง

## TopoJSON: ทางเลือกขั้นสูง

TopoJSON เป็นส่วนขยายของ GeoJSON ที่เข้ารหัสโทโปโลยี มันมีข้อได้เปรียบที่สำคัญสำหรับแผนที่ที่ซับซ้อน:

### TopoJSON คืออะไร?
- เป็นส่วนขยายของ GeoJSON ที่เข้ารหัสโทโปโลยี
- สร้างโดย Mike Bostock (ผู้สร้าง D3.js)
- เก็บส่วนโค้ง (เซกเมนต์เส้นที่ใช้ร่วมกัน) แทนที่จะเป็นรูปหลายเหลี่ยมอิสระ
- สามารถมีขนาดเล็กกว่า GeoJSON ที่เทียบเท่าได้ถึง 80%

### ประโยชน์ของ TopoJSON
- **ขนาดไฟล์เล็กลง**: กำจัดความซ้ำซ้อนโดยเก็บขอบเขตที่ใช้ร่วมกันเพียงครั้งเดียว
- **การรักษาโทโปโลยี**: รักษาความสัมพันธ์ระหว่างฟีเจอร์
- **ไม่มีช่องว่างหรือทับซ้อน**: รับประกันการจัดตำแหน่งที่สมบูรณ์ระหว่างรูปหลายเหลี่ยมที่อยู่ติดกัน
- **เปิดใช้งานการดำเนินการทางโทโปโลยี**: เช่น การรวม, การทำให้ง่ายขึ้น, และการสร้างตาข่าย

### การใช้ TopoJSON ในโปรเจกต์ของคุณ
1. **การแปลงเป็น TopoJSON**:
   - ใช้ MapShaper เพื่อแปลง GeoJSON เป็น TopoJSON
   - หรือใช้เครื่องมือคอมมานด์ไลน์ TopoJSON: `geo2topo input.geojson > output.topojson`

2. **การแปลงกลับเป็น GeoJSON ในแอปของคุณ**:
   ```javascript
   import * as topojson from 'topojson-client';
   
   // แปลง TopoJSON เป็น GeoJSON
   const geojson = topojson.feature(topoJson, topoJson.objects.yourLayerName);
   ```

3. **ไลบรารีที่จำเป็น**:
   - ติดตั้งด้วย npm: `npm install topojson-client`

### เมื่อไหร่ที่ควรใช้ TopoJSON
- สำหรับแผนที่ที่ซับซ้อนที่มีรูปหลายเหลี่ยมติดกันจำนวนมาก
- เมื่อขนาดไฟล์เป็นข้อกังวล
- สำหรับแผนที่ที่ต้องการทำให้ง่ายขึ้นในขณะที่รักษาโทโปโลยี
- สำหรับแอปพลิเคชันที่ดำเนินการทางโทโปโลยี

### ตัวอย่างขั้นตอนการทำงาน
1. สร้างหรือรับไฟล์ GeoJSON ของคุณ
2. แปลงเป็น TopoJSON โดยใช้ MapShaper หรือเครื่องมือ CLI
3. จัดเก็บและถ่ายโอนไฟล์ TopoJSON ที่มีขนาดเล็กกว่า
4. แปลงกลับเป็น GeoJSON ฝั่งไคลเอนต์เพื่อใช้กับ Leaflet

## แนวทางปฏิบัติที่ดีที่สุด

### 1. ทำให้รูปทรงเรขาคณิตง่ายขึ้น
ไฟล์ GeoJSON ที่ซับซ้อนและมีรายละเอียดมากอาจโหลดช้า ใช้ MapShaper เพื่อทำให้ง่ายขึ้น:
- อัปโหลด GeoJSON ที่ซับซ้อนหรือ shapefile ของคุณ
- ใช้เครื่องมือทำให้ง่าย (10-20% มักจะเพียงพอ)
- ส่งออกเป็น GeoJSON

### 2. เพิ่มคุณสมบัติที่เหมาะสม
คุณสมบัติที่จำเป็นสำหรับแผนที่ choropleth:
- **id**: ตัวระบุเฉพาะสำหรับจับคู่กับข้อมูล
- **name**: ชื่อที่อ่านได้สำหรับทูลทิป

### 3. ตรวจสอบความถูกต้องของ GeoJSON ของคุณ
ใช้ [geojsonlint.com](http://geojsonlint.com/) เพื่อตรวจสอบความถูกต้อง

### 4. ปรับขนาดไฟล์ให้เหมาะสม
- ลบคุณสมบัติที่ไม่จำเป็น
- ลดความแม่นยำของพิกัด
- ใช้ TopoJSON สำหรับแผนที่ที่ซับซ้อนมาก (ดูส่วน TopoJSON ด้านล่าง)
- พิจารณาการทำให้พิกัดเป็นจำนวนเต็มเพื่อลดความแม่นยำโดยไม่มีผลกระทบที่มองเห็นได้

## การใช้ GeoJSON กับ React-Leaflet

การนำไปใช้พื้นฐาน:

```jsx
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ฟังก์ชันสไตล์ตามคุณสมบัติ
const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.value),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
};

// เพิ่มการโต้ตอบ
const onEachFeature = (feature, layer) => {
  layer.bindTooltip(`
    <strong>${feature.properties.name}</strong><br/>
    ค่า: ${feature.properties.value}
  `);
  
  layer.on({
    mouseover: (e) => {
      const layer = e.target;
      layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.9
      });
    },
    mouseout: (e) => {
      const layer = e.target;
      layer.setStyle(style(feature));
    },
    click: (e) => {
      // พฤติกรรมการคลิกที่กำหนดเอง
    }
  });
};

// ในคอมโพเนนต์ของคุณ
return (
  <MapContainer center={[latitude, longitude]} zoom={zoom}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'
    />
    <GeoJSON 
      data={geoJsonData}
      style={style}
      onEachFeature={onEachFeature}
    />
  </MapContainer>
);
```

## ทรัพยากรเพิ่มเติม

- [ข้อกำหนด GeoJSON](https://geojson.org/)
- [บทช่วยสอน Leaflet GeoJSON](https://leafletjs.com/examples/geojson/)
- [เอกสาร React-Leaflet](https://react-leaflet.js.org/)
- [เครื่องมือ Mapbox GeoJSON](https://docs.mapbox.com/help/glossary/geojson/)

คู่มือนี้ควรช่วยให้นักพัฒนาใหม่เริ่มต้นการสร้างและใช้ไฟล์ GeoJSON สำหรับแอปพลิเคชันแผนที่แบบโต้ตอบ