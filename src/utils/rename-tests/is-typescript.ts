export function isTypeScript(filePath: string): boolean {
  return filePath.endsWith('.gts') || filePath.endsWith('.ts');
}
