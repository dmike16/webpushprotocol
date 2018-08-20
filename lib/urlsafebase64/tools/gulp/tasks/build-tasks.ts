
import { minimalCompiler } from '@urlbase64/process';
import { ModuleKind } from 'typescript';
import { GULP_ENV } from '@urlbase64/config';

export async function commonjs() {
  await minimalCompiler(GULP_ENV.tsconfig, { outDir: GULP_ENV.out.cmj , module: ModuleKind.CommonJS});
}

export async function esnext() {
  await minimalCompiler(GULP_ENV.tsconfig, { outDir: GULP_ENV.out.es2015, module: ModuleKind.ESNext});
}

export async function es2015() {
  await minimalCompiler(GULP_ENV.tsconfig, { outDir: GULP_ENV.out.es2015, module: ModuleKind.ES2015});
}

export async function umd() {
  await minimalCompiler(GULP_ENV.tsconfig, { outDir: GULP_ENV.out.umd, module: ModuleKind.UMD});
}