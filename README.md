# Onepage JS plugin

For use plugin you should add onepage.js to your page;

Use:

```JavaScript
<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<title>Onepage JS Plugin</title>
	<script src="//onepage.space/onepage.js"></script>
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

Yu can modify those parameters by method init like:
```JavaScript
<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<title>Onepage JS Plugin</title>
	<script src="//onepage.space/onepage.js"></script>
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
