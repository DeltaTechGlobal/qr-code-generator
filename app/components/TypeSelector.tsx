import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const types = ['URL', 'WiFi', 'Email', 'Social Media', 'Visiting Card', 'Bitcoin', 'Plain Text']

export function TypeSelector({ selectedType, onTypeChange }: { selectedType: string, onTypeChange: (type: string) => void }) {
  return (
    <div className="mb-4">
      <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Choose QR Code Type
      </label>
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger id="type-select" className="w-full">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

