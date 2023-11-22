import path from 'path';
import { fileURLToPath } from 'url';
export const __project_dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../');
export const __raw_src_dir = path.join(__project_dir, 'build');
export const __front_src_dir = path.join(__project_dir, 'build/client');
export const __public_dir = path.join(__project_dir, 'build/client');
export const __data_dir = path.join(__project_dir, 'data');
export const __url = 'http://localhost:8080';
//# sourceMappingURL=config.js.map