import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { renameModule } from '../../utils/rename-tests/index.js';

function getModuleName(filePath: string): string {
  let { dir, name } = parseFilePath(filePath);

  dir = dir.replace(/^tests\/acceptance(\/)?/, '');
  name = name.replace(/-test$/, '');

  const entityName = join(dir, name);

  // a.k.a. friendlyTestDescription
  return ['Acceptance', entityName].join(' | ');
}

export function renameAcceptanceTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/acceptance/**/*-test.{js,ts}', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const data = {
      isTypeScript: filePath.endsWith('.ts'),
      moduleName: getModuleName(filePath),
    };

    const newFile = renameModule(oldFile, data);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
