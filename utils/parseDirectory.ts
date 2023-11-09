import fs from 'fs/promises';
import { parseMd } from './parseMd';

export async function parseDirectory(directoryPath: string) {
    const files = await fs.readdir(directoryPath);
    const filteredFiles = files.filter((file) => file.endsWith('.md'));
    const promises = filteredFiles.map(async (file) => {
        const fileContent = await parseMd(`./vault/${file}`);
        return fileContent;
    });

    const results = await Promise.all(promises);
    const tables = results.filter((content) => content !== null);

    return tables;
}