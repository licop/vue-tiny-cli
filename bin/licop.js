#!/usr/bin/env node

const program = require("commander")
program.version(require('../package-lock.json').version);
program.command('console')
       .action(function() {console.log(process.argv)});

program
    .command('init <name>')
    .description('init project ')
    .action(require('../lib/init'));

program
    .command('refresh')
    .description('refresh routers an menu')
    .action(require('../lib/refresh'))

program.parse(process.argv);
