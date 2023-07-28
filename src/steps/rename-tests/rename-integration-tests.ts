import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { parseEntity, renameModule } from '../../utils/rename-tests/index.js';

const folderToEntityType = new Map([
  ['components', 'Component'],
  ['helpers', 'Helper'],
  ['modifiers', 'Modifier'],
]);

function getModuleName(filePath: string): string {
  let { dir, name } = parseFilePath(filePath);

  dir = dir.replace(/^tests\/integration(\/)?/, '');
  name = name.replace(/-test$/, '');

  const { entityType, remainingPath } = parseEntity(dir, folderToEntityType);
  const entityName = join(remainingPath, name);

  // a.k.a. friendlyTestDescription
  return ['Integration', entityType, entityName].filter(Boolean).join(' | ');
}

export function renameIntegrationTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/integration/**/*-test.{js,ts}', {
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
