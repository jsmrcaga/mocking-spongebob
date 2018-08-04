const Canvas = require('canvas');
const Image = Canvas.Image;
const spongebob = './spongebob.jpg';
const fishingrod = require('fishingrod');

function textify(text){
	return text.split('').map(c => {
		if(Math.random() < 0.5){
			return c.toLowerCase();
	}
 		return c.toUpperCase();
	}).join('');
}

// max char : 20
const generateImage = async (line1, line2, options={randomizeCase: true}) => {
	let spongebob = await fishingrod.fish({
		https: true,
		host: 'imgflip.com',
		path: '/s/meme/Mocking-Spongebob.jpg'
	});

	let image = new Image();
	image.src = spongebob.raw;

	let l1 = textify(line1);
	let l2 = textify(line2);
	if(!options.randomizeCase){
		l1 = line1;
		l2 = line2;
	}

	return new Promise((y, n) => {
		if(image.complete){
			y(draw(image, l1, l2));
		} else {
			image.addEventListener('load', ()=>{ y(draw(image, l1, l2)) });
		}
	});

	function draw(image, line1, line2){
		let canvas = new Canvas(400, 300);
		let ctx = canvas.getContext('2d');

		ctx.drawImage(image, 0, 0, 400, 300);

		ctx.textAlign = 'center';
		ctx.font = '40px Impact';
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2.5;
		ctx.fillText(line1, 200, 40);
		ctx.strokeText(line1, 200, 40);

		ctx.fillText(line2, 200, 280);
		ctx.strokeText(line2, 200, 280);

		ctx.fill();
		ctx.stroke();
		return canvas.toDataURL('image/png');
	}
};

module.exports = generateImage;