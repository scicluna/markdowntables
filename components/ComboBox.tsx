"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Table } from "@/types/types"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboBoxProps = {
    tables: Table[] | null
    newTable: (table: string) => void
    clearEncounter: () => void
}

export function ComboBox({tables, newTable, clearEncounter}:ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tables?.find((table) => table.fileName === value)?.fileName
            : "Select table..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No table found.</CommandEmpty>
          <CommandGroup>
            {tables?.map((table) => (
              <CommandItem
                key={table.fileName}
                value={table.fileName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  newTable(currentValue)
                  clearEncounter()
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === table.fileName ? "opacity-100" : "opacity-0"
                  )}
                />
                {table.fileName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
