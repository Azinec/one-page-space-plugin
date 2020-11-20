# Onepage JS plugin

For using the plugin, you should add onepage.js to your page;

Use:

```JavaScript
<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<title>Onepage JS Plugin</title>
	<script src="https://onepage.space/onepage.js"></script>
  </head>
  <body>
	... content ...
	<div id="onepage"></div>
	... other content ...
	<script>
	  OnePage.render("SOME_ONEPAGE_ID", "#onepage");
	</script>
  </body>
  </html>

```
Also you can modify plugin hosts settings like:

- PICTURE_CDN
- CDN_HOST

You can modify those parameters by method init like:
```JavaScript
<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<title>Onepage JS Plugin</title>
	<script src="https://onepage.space/onepage.js"></script>
  </head>
  <body>
	... content ...
	<div id="onepage"></div>
	... other content ...
	<script>
      OnePage.init({CDN_HOST: 'http://localhost:4000', PICTURE_CDN: 'https://cdn.onepage.space'});
	  OnePage.render("SOME_ONEPAGE_ID", "#onepage");
	</script>
  </body>
  </html>

```

To create a minified build, you should run:
```
$ npm run compile
```
After this, you can find a minified onepage.min.js file in the dist folder;

To test it locally, you can run the command
```
$ npm run start
```
