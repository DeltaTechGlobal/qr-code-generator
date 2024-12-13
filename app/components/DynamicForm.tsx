import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function DynamicForm({ type, onGenerate }: { type: string, onGenerate: (data: string) => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let qrData = ''

    switch (type) {
      case 'WiFi':
        qrData = `WIFI:S:${formData.ssid};T:${formData.encryption};P:${formData.password};;`
        break
      case 'Email':
        qrData = `mailto:${formData.to}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.body)}`
        break
      case 'Social Media':
        qrData = formData.profileOrLink
        break
      case 'Visiting Card':
        qrData = `BEGIN:VCARD
VERSION:3.0
N:${formData.name}
TEL:${formData.phone}
EMAIL:${formData.email}
URL:${formData.website}
TITLE:${formData.role}
END:VCARD`
        break
      case 'Bitcoin':
        qrData = `${formData.cryptocurrency}:${formData.address}?amount=${formData.amount}&message=${encodeURIComponent(formData.message)}`
        break
      default:
        qrData = JSON.stringify(formData)
    }

    onGenerate(qrData)
  }

  const renderFields = () => {
    switch (type) {
      case 'URL':
        return (
          <>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              placeholder="Enter URL"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      case 'WiFi':
        return (
          <>
            <Label htmlFor="ssid">Network Name (SSID)</Label>
            <Input
              id="ssid"
              name="ssid"
              placeholder="Enter network name"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="encryption">Encryption</Label>
            <Select name="encryption" onValueChange={(value) => handleInputChange({ target: { name: 'encryption', value } } as any)}>
              <SelectTrigger id="encryption">
                <SelectValue placeholder="Select encryption type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nopass">None</SelectItem>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      case 'Email':
        return (
          <>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              name="to"
              type="email"
              placeholder="Enter recipient email"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Enter email subject"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              name="body"
              placeholder="Enter email body"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      case 'Social Media':
        return (
          <>
            <Label htmlFor="profileOrLink">Profile ID or Post Link</Label>
            <Input
              id="profileOrLink"
              name="profileOrLink"
              placeholder="Enter profile ID or post link"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      case 'Visiting Card':
        return (
          <>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              placeholder="Enter website"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              placeholder="Enter role"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      case 'Bitcoin':
        return (
          <>
            <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
            <Select name="cryptocurrency" onValueChange={(value) => handleInputChange({ target: { name: 'cryptocurrency', value } } as any)}>
              <SelectTrigger id="cryptocurrency">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="bitcoincash">Bitcoin Cash</SelectItem>
                <SelectItem value="ethereum">Ether</SelectItem>
                <SelectItem value="litecoin">Litecoin</SelectItem>
                <SelectItem value="dash">Dash</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.00000001"
              placeholder="Enter amount"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="address">Receiver Bitcoin Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter Bitcoin address"
              onChange={handleInputChange}
              className="mb-4"
            />
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              name="message"
              placeholder="Enter optional message"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      case 'Plain Text':
        return (
          <>
            <Label htmlFor="text">Plain Text</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Enter your text"
              onChange={handleInputChange}
              className="mb-4"
            />
          </>
        )
      default:
        return (
          <>
            <Label htmlFor="data">Data</Label>
            <Input 
              id="data" 
              name="data" 
              placeholder="Enter data" 
              onChange={handleInputChange} 
              className="mb-4" 
            />
          </>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {renderFields()}
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Generate</Button>
    </form>
  )
}

