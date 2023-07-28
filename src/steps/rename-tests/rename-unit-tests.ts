import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { parseEntity, renameModule } from '../../utils/rename-tests/index.js';

const folderToEntityType = new Map([
  ['adapters', 'Adapter'],
  ['controllers', 'Controller'],
  ['initializers', 'Initializer'],
  ['instance-initializers', 'Instance Initializer'],
  ['mixins', 'Mixin'],
  ['models', 'Model'],
  ['routes', 'Route'],
  ['serializers', 'Serializer'],
  ['services', 'Service'],
  ['utils', 'Utility'],
]);

function getModuleName(filePath: string): string {
  let { dir, name } = parseFilePath(filePath);

  dir = dir.replace(/^tests\/unit(\/)?/, '');
  name = name.replace(/-test$/, '');

  const { entityType, remainingPath } = parseEntity(dir, folderToEntityType);
  const entityName = join(remainingPath, name);

  // a.k.a. friendlyTestDescription
  return ['Unit', entityType, entityName].join(' | ');
}

export function renameUnitTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/unit/**/*-test.{js,ts}', {
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
