import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  moduleName: string;
};

export function renameModule(file: string, data: Data): string {
  const traverse = AST.traverse(true);

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

      if (path.node.arguments[0]!.type === 'StringLiteral') {
        path.node.arguments[0] = AST.builders.stringLiteral(data.moduleName);
      }

      return false;
    },
  });

  return AST.print(ast);
}
