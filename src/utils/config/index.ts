'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getConfig(locale: 'fa' | 'en') {
  const filePath = path.join(
    process.cwd(),
    'src/config',
    `app-config.${locale}.json`
  );

  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}
