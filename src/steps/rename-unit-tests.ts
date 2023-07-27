/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../types/index.js';

type Data = {
  isTypeScript: boolean;
  moduleName: string;
};

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

function parseEntity(dir: string): {
  entityType: string | undefined;
  remainingPath: string;
} {
  const [folder, ...remainingPaths] = dir.split('/');
  const entityType = folderToEntityType.get(folder!);

  return {
    entityType,
    remainingPath: remainingPaths.join('/'),
  };
}

function getModuleName(filePath: string): string {
  let { dir, name } = parseFilePath(filePath);

  dir = dir.replace(/^tests\/unit(\/)?/, '');
  name = name.replace(/-test$/, '');

  const { entityType, remainingPath } = parseEntity(dir);
  const entityName = join(remainingPath, name);

  // a.k.a. friendlyTestDescription
  return ['Unit', entityType, entityName].join(' | ');
}

function renameModule(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(node) {
      if (
        node.value.callee.type !== 'Identifier' ||
        node.value.callee.name !== 'module'
      ) {
        return false;
      }

      if (node.value.arguments.length !== 2) {
        return false;
      }

      switch (node.value.arguments[0].type) {
        case 'Literal': {
          node.value.arguments[0] = AST.builders.literal(data.moduleName);

          break;
        }

        case 'StringLiteral': {
          node.value.arguments[0] = AST.builders.stringLiteral(data.moduleName);

          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
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
