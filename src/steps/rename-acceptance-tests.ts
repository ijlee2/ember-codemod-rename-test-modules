import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';

export function renameAcceptanceTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/acceptance/**/*-test.{js,ts}', {
    projectRoot,
  });

  console.log(filePaths);
}
