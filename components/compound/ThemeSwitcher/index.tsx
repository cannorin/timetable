"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const onChange = (checked: boolean) => {
    if (checked) setTheme("dark");
    else setTheme("light");
  };

  return (
    <div className="m-2 flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={resolvedTheme === "dark"}
        onCheckedChange={onChange}
      />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  );
}
