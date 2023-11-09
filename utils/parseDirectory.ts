import fs from 'fs/promises'
import { parseMd } from './parseMd'

export async function parseDirectory(directoryPath: string){
    const files = await fs.readdir(directoryPath)
    const tables: {[key: string]:{name: string, description: string}}[] = []
    
    files.forEach(async (file) => {
        const fileContent = await parseMd(file)
        if (fileContent){
            tables.push(fileContent)
        }
    })

    return tables
}       