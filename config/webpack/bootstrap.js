const path = require('path');
const fs = require('fs');

if (!process.env.CURRENT_DIR) {
    console.error('env.CURRENT_DIR is not defined in webpack config');
    process.exit(1);
}

if (!process.env.CONFIG_TYPE) {
    console.error('Please set webpack env.CONFIG_TYPE');
    process.exit(1);
}

const webpackDir = path.resolve(__dirname, './');
const mode = process.env.NODE_ENV || 'development';
const configType = process.env.CONFIG_TYPE;
const requireFile = `${webpackDir}/webpack.${configType}.js`;
const appConfigFile = path.join(process.env.CURRENT_DIR, 'app.config.js');

const isConfigExists = fs.existsSync(requireFile);

if (!isConfigExists) {
    // eslint-disable-next-line no-console
    console.error(`CONFIG_TYPE "${configType}" does not exists. Request file ${requireFile}`);
    process.exit(1);
}

let appConfig = {};

try {
    appConfig = require(appConfigFile);
} catch (error) {}

module.exports = {
    mode,
    requireFile,
    configType,
    webpackDir,
    appConfig,
};
