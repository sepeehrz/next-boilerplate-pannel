'use server';

import path from 'path';
import fs from 'fs/promises';

export async function getConfig(locale: 'fa' | 'en') {
  const filePath = path.join(
    process.cwd(),
    'src/config',
    `app-config.${locale}.json`
  );

  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}
