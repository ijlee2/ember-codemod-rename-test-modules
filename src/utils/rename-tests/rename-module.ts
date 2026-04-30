import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTypeScript: boolean;
  moduleName: string;
};

export function renameModule(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(path) {
      if (
        path.node.callee.type !== 'Identifier' ||
        path.node.callee.name !== 'module'
      ) {
        return false;
      }

      if (path.node.arguments.length !== 2) {
        return false;
      }

      switch (path.node.arguments[0]!.type) {
        case 'Literal': {
          path.node.arguments[0] = AST.builders.literal(data.moduleName);
          break;
        }

        case 'StringLiteral': {
          path.node.arguments[0] = AST.builders.stringLiteral(data.moduleName);
          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}
