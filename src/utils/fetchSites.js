// src/utils/fetchSites.js
import fs from 'fs';
import path from 'path';

export const fetchSites = () => {
  const filePath = path.join(process.cwd(), 'src', 'assets', 'data', 'sites.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
};
