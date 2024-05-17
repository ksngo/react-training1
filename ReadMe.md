# RAW

- using node 18.14.2, 20.12.2
- npm init -y
- npm install webpack webpack-cli --save-dev
- npm install react react-dom
- npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
- npm install --save-dev mini-css-extract-plugin
- npm install --save-dev css-loader
- npm install terser-webpack-plugin --save-dev
- npm install --save-dev html-webpack-plugin
- npm install --save-dev webpack-dev-server (for dev server)

- powershell ".\setupFoldersAndFiles.ps1"

- index.js for ReactDom rendering React Component
- App.js to house the app's React Component
- index.html with <div id="root"></div> in body

- npm install styled-components