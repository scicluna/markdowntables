import fs from 'fs/promises'

export async function parseMd(filePath: string){
    if (!filePath.endsWith('.md')) return null

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const fileName = filePath.split('/').pop()?.split('.')[0] ?? filePath.split('.')[0]
    const lines = fileContent.split('\n')    

    //Each line should read like this: 
    //1. Name of Encounter - Encounter Description

    /*Structure of Table:
    {
        fileName: [
            {name: 'Name of Encounter', description: 'Encounter Description'}
            {name: 'Name of Encounter', description: 'Encounter Description'}
            etc...
        ]
    }
    */

    const table: {[key: string]:{name: string, description: string}} = {}
    lines.forEach(line => {
        const [name, description] = line.split(' - ')
        table[fileName] = {name: name, description: description}
    })

    return table
}