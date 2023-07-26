import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';

function renameModule(file: string): string {
  return file;
}

export function renameIntegrationTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/integration/**/*-test.{js,ts}', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = renameModule(oldFile);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
