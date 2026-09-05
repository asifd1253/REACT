# it is a dev dependency

- npm i -D parcel

# features of parcel

- Dev Build
- Local Server
- HMR = Hot Module Reload
- File Watching Algorithme
- Caching Faster Builds
- Image Optimization
- Manification
- Bundling
- Compress
- Consistent Hashing
- Code Splitting
- Differential Bundling : which support older browsers
- Diagnostics
- Error Handling
- HTTPs
- Tree Shaking : remove unused code
- Different Development & Production bundles

# before executing parcel

- in index.html make type as module in script tag
- in package.json remove ENTRY point as App.js

# to execute a package we will use npx

- npx parcel index.html

# download react and react-dom dependencies

- npm i react
- npm i react-dom/client

# execute parcel for production
- npx parecel build index.html