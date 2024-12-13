import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Customization({ 
  color, 
  bgColor, 
  frame, 
  frameLabel,
  frameLabelPosition,
  onColorChange, 
  onBgColorChange, 
  onFrameChange,
  onFrameLabelChange,
  onFrameLabelPositionChange,
  onLogoChange
}: {
  color: string,
  bgColor: string,
  frame: string,
  frameLabel: string,
  frameLabelPosition: 'top' | 'bottom',
  onColorChange: (color: string) => void,
  onBgColorChange: (color: string) => void,
  onFrameChange: (frame: string) => void,
  onFrameLabelChange: (label: string) => void,
  onFrameLabelPositionChange: (position: 'top' | 'bottom') => void,
  onLogoChange: (logo: string) => void
}) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onLogoChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Customize Your QR Code</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color" className="dark:text-gray-300">Foreground Color</Label>
          <Input
            type="color"
            id="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="h-10"
          />
        </div>
        <div>
          <Label htmlFor="bgColor" className="dark:text-gray-300">Background Color</Label>
          <Input
            type="color"
            id="bgColor"
            value={bgColor}
            onChange={(e) => onBgColorChange(e.target.value)}
            className="h-10"
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="frame" className="dark:text-gray-300">Frame Style</Label>
        <Select value={frame} onValueChange={onFrameChange}>
          <SelectTrigger id="frame">
            <SelectValue placeholder="Choose a frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Frame</SelectItem>
            <SelectItem value="square">Square Frame</SelectItem>
            <SelectItem value="rounded">Rounded Frame</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="frameLabel" className="dark:text-gray-300">Frame Label</Label>
        <Input
          type="text"
          id="frameLabel"
          value={frameLabel}
          onChange={(e) => onFrameLabelChange(e.target.value)}
          placeholder="Enter frame label"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="frameLabelPosition" className="dark:text-gray-300">Frame Label Position</Label>
        <Select value={frameLabelPosition} onValueChange={onFrameLabelPositionChange}>
          <SelectTrigger id="frameLabelPosition">
            <SelectValue placeholder="Choose label position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="logo" className="dark:text-gray-300">Upload Logo</Label>
        <Input
          type="file"
          id="logo"
          onChange={handleLogoUpload}
          accept="image/*"
        />
      </div>
    </div>
  )
}

