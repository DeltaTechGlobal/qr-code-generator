import React, { useState } from 'react'

interface DynamicFormProps {
  type: string
  onGenerate: (data: string) => void
}

export function DynamicForm({ type, onGenerate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let qrData = ''

    switch (type) {
      // ... your existing switch cases
    }

    onGenerate(qrData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... rest of your form */}
    </form>
  )
} 