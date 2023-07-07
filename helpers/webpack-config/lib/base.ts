import git from 'git-rev-sync';
import path from 'path';
import moment from 'moment';
import fs from 'fs';
import webpack from 'webpack';

/**
 * @desc Webpack/Custom Command Line Interface
 * @desc 在这里自定义变量
 */
export default class BaseDefaultConfig {
    static get argv(): Record<string, any> {
        return {
            mode: 'production',
            devtool: false,
        };
    }

    static get env(): Record<string, any> {
        return {
            // Custom environment variables
        };
    }

    static getEnvProxy(_env): Record<string, any> {
        return new Proxy(BaseDefaultConfig.env, {
            get(target, key, receiver) {
                if (_env[key] != null) return _env[key];
                return Reflect.get(target, key, receiver);
            },
        });
    }

    static getArgvProxy(_argv): Record<string, any> {
        return new Proxy(BaseDefaultConfig.argv, {
            get(target, key, receiver) {
                if (_argv[key] != null) return _argv[key];
                return Reflect.get(target, key, receiver);
            },
        });
    }

    protected readonly _envProxy: Record<string, any>;
    protected readonly _argvProxy: Record<string, any>;
    protected readonly _manifest: Record<string, any>;
    protected readonly _projectName: string;
    protected readonly _lastCompiled: string;

    constructor(_env = Object.create(null), _argv = Object.create(null), projectName = null) {
        this._envProxy = BaseDefaultConfig.getEnvProxy(_env);
        this._argvProxy = BaseDefaultConfig.getArgvProxy(_argv);
        this._manifest = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), { encoding: 'utf8' }));
        this._projectName = projectName;
        this._lastCompiled = moment().utcOffset(8).format();
    }

    get env(): Record<string, any> {
        return this._envProxy;
    }

    get argv(): Record<string, any> {
        return this._argvProxy;
    }

    get mode(): webpack.Configuration['mode'] {
        return this._argvProxy.mode;
    }

    get devtool(): webpack.Configuration['devtool'] {
        return this._argvProxy.devtool;
    }

    get name(): string {
        return this._projectName;
    }

    get version(): string {
        return this._manifest.version;
    }

    get revision(): string {
        return git.short(null, 8);
    }

    get lastCompiled(): string {
        return this._lastCompiled;
    }

    get preamble(): string {
        // prettier-ignore
        return `/*! @metadata ${this.name}: ${this.version}-${this.revision} (${this.lastCompiled}) */`;
    }

    get production(): boolean {
        return this._argvProxy.mode === 'production';
    }
}
