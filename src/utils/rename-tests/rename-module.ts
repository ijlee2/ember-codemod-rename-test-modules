/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTypeScript: boolean;
  moduleName: string;
};

export function renameModule(file: string, data: Data): string {
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
