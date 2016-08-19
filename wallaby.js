var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    var webpackPostprocessor = wallabyWebpack({
        // webpack options
        externals: {
            // Use external version of React instead of rebuilding it
            "react": "React",
            'cheerio': 'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css-loader?modules!postcss-loader'
                },
                {
                    test: /\.(ttf|ico|eot|otf|svg|png|gif|woff|jpeg(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader'
                }]
        },
        resolve: {
            extensions: ['', '.js']
        }
    });

    return {
        files: [
            // not required if using PhantomJs2 - http://wallabyjs.com/docs/integration/phantomjs2.html
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            //{pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
            {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
            {pattern: 'src/**/*.css', load: false},
            {pattern: 'src/**/*.ico', load: false},
            {pattern: 'src/**/*.eot', load: false},
            {pattern: 'src/**/*.woff', load: false},
            {pattern: 'src/**/*.ttf', load: false},
            {pattern: 'src/**/*.svg', load: false},
            {pattern: 'src/**/*.otf', load: false},
            {pattern: 'src/**/*.png', load: false},
            {pattern: 'src/*.js', load: false},
            {pattern: 'src/**/*.test.js', ignore: true},
            {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false}
        ],

        tests: [
            {pattern: 'tests/*.js', load: false}
        ],
        testFramework: 'mocha',

        compilers: {
            '**/*js': wallaby.compilers.babel()
        },

        postprocessor: webpackPostprocessor,
        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
        // debug: true
    };
};
