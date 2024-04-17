import { isCI } from 'ci-info';

!isCI && (await import('husky').then((module) => module.default()));
