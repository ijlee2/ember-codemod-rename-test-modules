import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  isTypeScript,
  parseEntity,
  renameModule,
} from '../../utils/rename-tests/index.js';

const folderToEntityType = new Map<string, string>();

function getModuleName(filePath: string): string {
  let { dir, name } = parseFilePath(filePath);

  dir = relative('tests/acceptance', dir);
  name = name.replace(/-test$/, '');

  const { entityType, remainingPath } = parseEntity(dir, folderToEntityType);
  const entityName = join(remainingPath, name).replaceAll(sep, '/');

  // a.k.a. friendlyTestDescription
  return ['Acceptance', entityType, entityName].filter(Boolean).join(' | ');
}

export function renameAcceptanceTests(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('tests/acceptance/**/*-test.{gjs,gts,js,ts}', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    let newFile = readFileSync(oldPath, 'utf8');

    const data = {
      isTypeScript: isTypeScript(filePath),
      moduleName: getModuleName(filePath),
    };

    if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
      newFile = renameModule(newFile, data);
    } else {
      newFile = updateJavaScript(newFile, (code) => {
        return renameModule(code, data);
      });
    }

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
