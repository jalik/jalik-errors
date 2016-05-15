Package.describe({
    name: 'jalik:errors',
    version: '0.1.0',
    author: 'karl.stein.pro@gmail.com',
    summary: 'Efficient error helper',
    homepage: 'https://github.com/jalik/jalik-errors',
    git: 'https://github.com/jalik/jalik-errors.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.2.4');
    api.use('ecmascript');
    api.use('mongo');
    api.use('underscore');
    api.mainModule('errors.js');
});

