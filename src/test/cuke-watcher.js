#!/usr/bin/env node
var watch = require('node-watch');
var child_process = require('child_process');
var running = false;
var options = ['./node_modules/.bin/cucumber-js',
               '-r', './step_definitions',
               '--tags', '@dev'];

watch(['../main', './step_definitions', './features'], {recursive: true}, function (event, filename) {

    if (!running && (filename.endsWith('.js') || filename.endsWith('.feature'))) {
        spawnCucumberProcess();
    }

});

function spawnCucumberProcess() {
    const cucumber = child_process.spawn('node', options)
                 .on('exit', function () {
                     running = false;
                 });

    running = true;

    cucumber.stdout.pipe(process.stdout);
    cucumber.stderr.pipe(process.stderr);
}

spawnCucumberProcess();