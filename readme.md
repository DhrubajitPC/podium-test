This is a demo app to test out Podium's features. It integrates a rails and a react app as micro frontend under one container app.
The container app uses Podium Layouts.

### Usage

Start the rails server 

```bash
cd rails-demo
./bin/rails s
```

Build the react app and start the server

```bash
cd react-demo
npm i
npm run build
cd dist
python -m http.server 3001
```

Start podletA

```bash
cd podletA
npm i
node index.js
```

Start podletb

```bash
cd podletB
npm i
node index.js
```

Start Layout

```bash
cd layout
npm i
node index.js
```

open the app in http://localhost:7000.