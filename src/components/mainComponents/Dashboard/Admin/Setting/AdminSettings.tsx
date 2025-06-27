"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 gap-2 sm:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments & Fees</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Tax</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Section title="General Settings">
            <InputField label="Marketplace Name" placeholder="My Marketplace" />
            <InputField
              label="Admin Email"
              type="email"
              placeholder="admin@example.com"
            />
            <ToggleField label="Enable Maintenance Mode" />
          </Section>
        </TabsContent>

        <TabsContent value="payments">
          <Section title="Payments & Fees">
            <ToggleField label="Enable Stripe" />
            <ToggleField label="Enable SSL" />
            <InputField
              label="Commission Rate (%)"
              type="number"
              placeholder="10"
            />
          </Section>
        </TabsContent>

        <TabsContent value="shipping">
          <Section title="Shipping & Tax">
            <InputField label="Default Shipping Rate ($)" placeholder="5.00" />
            <ToggleField label="Enable Free Shipping over $50" />
            <InputField label="Tax Rate (%)" type="number" placeholder="15" />
          </Section>
        </TabsContent>

        <TabsContent value="notifications">
          <Section title="Email & Notifications">
            <InputField
              label="Admin Notification Email"
              type="email"
              placeholder="admin@example.com"
            />
            <ToggleField label="Send Email on New Order" />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Reusable form block
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
      <Button className="mt-4">Save Settings</Button>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}

function ToggleField({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <Switch />
    </div>
  );
}
