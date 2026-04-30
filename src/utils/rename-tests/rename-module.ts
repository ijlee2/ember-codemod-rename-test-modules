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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.callee.type !== 'Identifier' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.callee.name !== 'module'
      ) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.value.arguments.length !== 2) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.value.arguments[0].type) {
        case 'Literal': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          node.value.arguments[0] = AST.builders.literal(data.moduleName);

          break;
        }

        case 'StringLiteral': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          node.value.arguments[0] = AST.builders.stringLiteral(data.moduleName);

          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}
