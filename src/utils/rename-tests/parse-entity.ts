import { sep } from 'node:path';

export function parseEntity(
  dir: string,
  folderToEntityType: Map<string, string>,
): {
  entityType: string | undefined;
  remainingPath: string;
} {
  const [folder, ...remainingPaths] = dir.split(sep);
  const entityType = folderToEntityType.get(folder!);

  if (entityType === undefined) {
    return {
      entityType,
      remainingPath: dir,
    };
  }

  return {
    entityType,
    remainingPath: remainingPaths.join(sep),
  };
}
