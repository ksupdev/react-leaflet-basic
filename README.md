# Getting Started with Create React App

## Install lib list
```shell
npm i react-leaflet
npm i leaflet
npm i papaparse
npm i leaflet-rotatedmarker
npm i @turf/turf
```

## Base Map

- https://leaflet-extras.github.io/leaflet-providers/preview/

## Create Marker

- copy public/assets/air3.png to node_modules/leaflet/dist/images
- copy public/assets/fire.gif to node_modules/leaflet/dist/images/fire.gif

## Lib noted
- https://turfjs.org/


## Noted

### flight data
- You can use this find for upload the flight data `external-source/dump1090-127_0_0_1-170911.csv`

### iconAnchor
```js
let airMarker = L.icon({
    iconUrl: iconAir,
    shadowUrl: iconShadow,
    iconSize: [20, 25], // width, height in pixels
    iconAnchor: [10, 12.5] // anchor point relative to icon's top-left
});

```

- 'iconAnchor' In Leaflet, iconAnchor is a property of the L.Icon class that determines where the icon's "tip" or "anchor point" is positioned relative to its top-left corner. This property is crucial for properly positioning markers on the map.

## Location data
- https://github.com/prasertcbs/thailand_gis/tree/main/province
- https://github.com/prasertcbs/thailand_gis/blob/main/province/province_simplify.json
- Web สำหรับแปลงข้อมูล `https://geojson.io/#map=4.93/13.05/101.49`

## Change Icon
- https://www.flaticon.com/free-icon/map_717498?term=map&page=1&position=28&origin=search&related_id=717498

## Install Tailwind

### Install Tailwind CSS

```shell
npm install tailwindcss @tailwindcss/cli

```

```shell
## src/index.css

@import "tailwindcss";

```

```shell

npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch

```

```shell

## import './output.css';

import logo from './logo.svg';
import MapContent from './components/MapContent';
import './output.css';
import './App.css';

import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <MapContent />
    </>
  );
}

export default App;


```
















<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
