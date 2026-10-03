import { loadSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await loadSettings();
  return <SettingsForm settings={settings} />;
}
