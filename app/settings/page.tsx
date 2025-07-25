import type { Metadata } from "next"
import SettingsForm from "@/components/settings/settings-form"
import { getSystemSettings } from "@/lib/data"

export const metadata: Metadata = {
  title: "Settings | Cadient",
  description: "System settings",
}

export default async function SettingsPage() {
  const settings = await getSystemSettings()

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl font-semibold">System Settings</h1>
      </div>
      <div className="flex-1 p-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  )
}
