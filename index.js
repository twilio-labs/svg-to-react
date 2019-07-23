#!/usr/bin/env node

const program = require('commander');
const {prompt} = require('inquirer');
const {convertSvgToReact} = require('./dist/main');

const REACT_VERSION_BASE = '>= react 15.0.0';
const REACT_VERSION_HOOKS = '>= react 16.7.0 (react hooks)';

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'Enter component name (i.e.: TableIcon)',
  },
  {
    type: 'editor',
    name: 'svgData',
    message: 'Paste the svg contents ..',
  },
  {
    type: 'list',
    name: 'reactVersion',
    message: 'For which version of React ..',
    choices: [REACT_VERSION_BASE, REACT_VERSION_HOOKS],
    default: 0,
  },
];

program.version('0.0.1').description('The all-in-one SVG to React Component converter.');

program
  .command('convert')
  .alias('c')
  .description('Convert SVG to React Component')
  .action(() => {
    prompt(questions).then(async ({componentName, svgData, reactVersion}) => {
      let generatedComponent = '';
      try {
        generatedComponent = await convertSvgToReact(componentName, svgData, {
          useHooks: reactVersion === REACT_VERSION_HOOKS,
        });
      } catch (e) {
        console.error(`[FAIL] SVG conversion error: `, e);
        return;
      }

      console.log('\n\n\n--------------------------------');
      console.log('Here is the final component code:');
      console.log('--------------------------------\n\n\n');
      console.log(generatedComponent);
    });
  });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
