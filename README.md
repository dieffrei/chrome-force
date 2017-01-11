# chrome-force
Angular JS module allows chrome extensions to access salesforce api


# Requirements

- Underscore

# Bower Usage

You may use [bower](http://bower.io/) for dependency management.

Install and save to bower.json by running

    bower install chrome-force --save

This will copy the ui-date files into your `bower_components` folder, along with its dependencies.

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/chrome-force/chromeforce.js"></script>
<script type="text/javascript" src="bower_components/chrome-force/salesforce-api.js"></script>

```

Add the chrome-force module as a dependency to your application module:

```js
angular.module('myChromeExtension', ['br.com.dieffrei.chromeForce'])
```
