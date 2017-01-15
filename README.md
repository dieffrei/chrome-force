[![CircleCI](https://circleci.com/gh/dieffrei/chrome-force/tree/master.svg?style=svg)](https://circleci.com/gh/dieffrei/chrome-force/tree/master)

# chrome-force
Angular JS module allows chrome extensions to access salesforce api


# Requirements

- underscore
- angular

# Bower Usage

You may use [bower](http://bower.io/) for dependency management.

Install and save to bower.json by running

    bower install chrome-force --save

This will copy the ui-date files into your `bower_components` folder, along with its dependencies.

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/chrome-force/dist/chrome-force.js"></script>
```

Add the chrome-force module as a dependency to your application module:

```js
angular.module('myChromeExtension', ['br.com.dieffrei.chromeForce'])
```

# Project sample
https://github.com/dieffrei/salesforce-chrome-extension-tutorial

# Testing
    npm test

# Building
    gulp build
