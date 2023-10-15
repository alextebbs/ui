"use client";

import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";
import { Switch } from "@/components/Switch";
import { TreeView } from "@/components/TreeView";

import { DATA as COUNTRIES } from "@/stories/mock-data/countries";
import { DATA as LOCATIONS } from "@/stories/mock-data/treeview";

export default function IndexPage() {
  return (
    <>
      <div className="dark flex h-screen w-screen flex-col items-center justify-center gap-4 bg-slate-950">
        <Input />
        <Button>Button</Button>
        <MultiSelect name="test" options={COUNTRIES} />
        <Calendar />
        <Switch />
        <TreeView {...LOCATIONS} />
      </div>
    </>
  );
}
