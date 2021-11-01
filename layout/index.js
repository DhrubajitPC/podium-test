const express = require('express')
const Layout = require('@podium/layout');

const app = express();

const layout = new Layout({
	    name: 'myLayout',
	    pathname: '/demo',
});

const railsPod = layout.client.register({
	    name: 'railsPod',
	    uri: 'http://localhost:7100/manifest.json',
});


// registering the react micro frontends (podlets)
const reactPod = layout.client.register({
  name: "reactPod", // required
  uri: "http://localhost:7200/manifest.json", // required
});


app.use(layout.middleware());

app.get('/demo', async (req, res) => {
	    const incoming = res.locals.podium;
	    const response = await Promise.all([
				reactPod.fetch(incoming),
				railsPod.fetch(incoming),
			]);

			incoming.podlets = response
	    incoming.view.title = 'My Super Page';

	    res.podiumSend(`<div>
				${response[0]}
				${response[1]}
			</div>`);
});

app.listen(7000);
