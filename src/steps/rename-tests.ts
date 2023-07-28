import type { Options } from '../types/index.js';
import {
  renameAcceptanceTests,
  renameIntegrationTests,
  renameUnitTests,
} from './rename-tests/index.js';

export function renameTests(options: Options): void {
  renameAcceptanceTests(options);
  renameIntegrationTests(options);
  renameUnitTests(options);
}
