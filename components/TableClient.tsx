'use client'

import { Table } from "@/types/types"
import { ComboBox } from "./ComboBox"
import { useState } from "react"
import { Button } from "./ui/button"

type TableClientProps = {
    tables: Table[]
}

type Encounter= {
    roll: number,
    description: string
}

export default function TableClient({tables}: TableClientProps) {
    const [table, setTable] = useState('')
    const [encounter, setEncounter] = useState<Encounter | null>()
    const tableIndex = tables.findIndex((t) => t.fileName === table) ?? -1

    function newTable(table: string) {
        setTable(table)
    }

    function clearEncounter(){
        setEncounter(null)
    }

    function rollTable(){
        const table = tables[tableIndex]
        const roll = Math.ceil(Math.random() * table.encounters.length)
        setEncounter({roll:roll, description: table.encounters[roll-1].description})
    }

    return (
        <section className="flex flex-col items-center gap-2 p-4 font-mono">
            <ComboBox tables={tables} newTable={newTable} clearEncounter={clearEncounter}/>
            <div className="flex flex-col gap-5 p-4">
            {tableIndex !== -1 && (
                tables[tableIndex].encounters.map((encounter) => (
                    <p className="text-2xl" key={encounter.name}>
                        {encounter.name.replaceAll("**", "")}
                    </p>
                ))
            )}
            </div>
            <Button onClick={rollTable} className="dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">Roll</Button>
            {encounter && (
                <p className="text-2xl mt-4">
                    {encounter.roll} --- {encounter.description}
                </p>
            )}
        </section>
    )
}