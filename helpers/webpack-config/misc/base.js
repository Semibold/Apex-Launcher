const git = require('git-rev-sync');
const path = require('path');
const moment = require('moment');

/**
 * @desc Webpack/Custom Command Line Interface
 * @desc 在这里自定义变量
 */
exports.BaseDefaultConfig = class BaseDefaultConfig {
    static get argv() {
        return {
            mode: 'production',
            devtool: false,
        };
    }

    static get env() {
        return {
            // Custom environment variables
        };
    }

    static getEnvProxy(_env) {
        return new Proxy(BaseDefaultConfig.env, {
            get(target, key, receiver) {
                if (_env[key] != null) return _env[key];
                return Reflect.get(target, key, receiver);
            },
        });
    }

    static getArgvProxy(_argv) {
        return new Proxy(BaseDefaultConfig.argv, {
            get(target, key, receiver) {
                if (_argv[key] != null) return _argv[key];
                return Reflect.get(target, key, receiver);
            },
        });
    }

    constructor(_env = Object.create(null), _argv = Object.create(null), projectName = null) {
        this._envProxy = BaseDefaultConfig.getEnvProxy(_env);
        this._argvProxy = BaseDefaultConfig.getArgvProxy(_argv);
        this._manifest = require(path.resolve(process.cwd(), 'package.json'));
        this._projectName = projectName;
        this._lastCompiled = moment().utcOffset(8).format();
    }

    get mode() {
        return this._argvProxy.mode;
    }

    get devtool() {
        return this._argvProxy.devtool;
    }

    get name() {
        return this._projectName;
    }

    get version() {
        return this._manifest.version;
    }

    get revision() {
        return git.short(null, 8);
    }

    get lastCompiled() {
        return this._lastCompiled;
    }

    get preamble() {
        // prettier-ignore
        return `/*! @Metadata ${this.name}: ${this.version}-${this.revision} (${this.lastCompiled}) */`;
    }

    get production() {
        return this._argvProxy.mode === 'production';
    }
};
