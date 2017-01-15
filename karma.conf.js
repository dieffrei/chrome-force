/**
 * Created by dieffrei on 15/01/17.
 */
//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            //'node_modules/chrome-mock/index.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/chrome-force.module.js',
            'src/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};