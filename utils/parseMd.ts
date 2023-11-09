import fs from 'fs/promises'

export async function parseMd(filePath: string){

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const fileName = filePath.split('/').pop()?.split('.')[0] ?? filePath.split('.')[0]
    const lines = fileContent.split('\n').filter(line => line !== '')   

    //Each line should read like this: c
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

    const encounters: {name:string, description:string}[] = []
    lines.forEach(line => {
        const [name, description] = line.split(' - ')
        encounters.push({name, description})
    })

    const table = {
        fileName: fileName,
        encounters: encounters
    }

    return table
}