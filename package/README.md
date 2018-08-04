# Mocking Spongebob generator

You can also use this generator as an API at

`http://spongebob.jocolina.com/generate`

like so:

```js
let query_params = {
	top: 'lolilol',
	bottom: 'line bottom'
};

let request_params = {
	https: false,
	host: 'spongebob.jocolina.com',
	path: '/generate' + querystring.stringify(params)
	method: 'GET',
}

```

### Roadmap
 
 * Add multiline support (2 lines)

## Installation

`npm i mocking-spongebob`

## Usage

With promise syntax:

```js
const generator = require('mocking-spongebob');

generator('this is line one', 'this is line 2').then(dataurl => {
	// do something with a dataurl
	return `<img src="${dataurl}"></img>`;
});
```

With await syntax
```js
const generator = require('mocking-spongebob');

let dataurl = await generator('this is line one', 'this is line 2');
return `<img src="${dataurl}"></img>`;
```

## Options

This generator will automatically randomize upper and lower case letters on your strings. However, you can pass an `options` object to avoid this behaviour:

Generator signature is `generator(String, String, Object)`;

Options: 

```js
{
	randomizeCase: Bool
}
```