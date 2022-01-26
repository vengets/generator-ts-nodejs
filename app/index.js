'use strict';
const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');
const _package = require('../package.json');
const _convertColor = require('color-convert');
const _glob = require('glob');

module.exports = class extends Generator {

    initializing() {
        const generatorName = `${_package.name} v${_package.version}`;
        this.log(
            _yosay(`${rainbow(generatorName, 100)} \n A Generator for creating a typescript nodejs project`)
        );

    }
    async prompting() {
        const { projectName} = await this.prompt([{
            name: "projectName",
            message: "What is your project name?",
            default: "untitled"
        }]);
        this.projectName = projectName;
    }
    writing() {
        this.fs.copyTpl(_glob.sync(this.templatePath('**/*'), { dot: true }), this.destinationPath(), { projectName: this.projectName });
    }
}

function rainbow(string, offset) {
    const ignoreChars = /[^!-~]/g;
    if (!string || string.length === 0) {
        return string;
    }

    const hueStep = 360 / string.replace(ignoreChars, '').length;

    let hue = 100 % offset;
    const characters = [];
    for (const character of string) {
        if (ignoreChars.test(character)) {
            characters.push(character);
        } else {
            characters.push(_chalk.hex(_convertColor.hsl.hex(hue, 100, 50))(character));
            hue = (hue + hueStep) % offset;
        }
    }

    return characters.join('');
}

