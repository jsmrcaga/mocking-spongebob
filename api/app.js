const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// secutiry options
const helmet = require('helmet');
app.use(helmet({
	frameguard: false
}));
app.disable('etag');

// lets break all security options
const cors = require('cors');
app.use(cors());
app.options('*', cors());

const generator = require('mocking-spongebob');

app.get('/', (req, res, next) => {
	return res.redirect('https://www.npmjs.com/package/mocking-spongebob');
});

app.get('/generate', async (req, res, next) => {
	let {top, bottom, datauri, html} = req.query;

	if(!top && !bottom){
		return res.status(400).json({
			error: {
				code: 400,
				message: 'At least one of top or bottom is required to generate meme'
			}
		});
	}

	let dataurl = await generator(top || '', bottom || '');

	if(datauri){
		return res.send(dataurl);
	}

	if(html){
		return res.append('Content-Type', 'text/html').send(`<img src="${dataurl}"></img>`);
	}

	let rawpng = dataurl.replace(/^data:image\/png;base64,/, '');
	let id = Math.floor(Math.random() * 10e10).toString(36);
	let png = Buffer.from(rawpng, 'base64');

	let path = `./public/img/${id}-${Date.now()}.png`;
	fs.writeFile(path, png, function(err){
		if(err){
			return res.status(500).json(err);
		}


		return res.sendFile(path, {
			root: __dirname
		});
	});
});

app.listen(process.env.PORT || 3534, () => {
	console.log(`Expecting memes to generate on ... ${process.env.PORT || 3534}`);
});