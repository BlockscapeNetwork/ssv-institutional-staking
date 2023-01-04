import fs from 'fs';

export const fileExistsValidator = (filePath: string, message = ''): boolean | string => {
  filePath = sanitizePath(filePath);
  return fs.existsSync(filePath.trim()) ? true : message || 'File does not exists';
};

export const jsonFileValidator = (filePath: string, message = ''): boolean | string => {
  let fileContents;
  filePath = sanitizePath(filePath);
  try {
    fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });
  } catch (e) {
    return message || 'Can not read file';
  }
  try {
    JSON.parse(fileContents);
  } catch (e) {
    return message || 'File is not a JSON file';
  }
  return true;
};

/**
 * Make sure the path contains
 * @param path
 * @param regex
 */
export const sanitizePath = (path: string, regex?: RegExp): string => {
  return path.replace(regex || /\\([^a-zA-Z0-9_])/g, "$1");
};
