"use client";

import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";
import { MultiSlider } from "@/components/MultiSlider";
import { Switch } from "@/components/Switch";
import { TreeView } from "@/components/TreeView";

import { DATA as COUNTRIES } from "@/stories/mock-data/countries";
import { DATA as LOCATIONS } from "@/stories/mock-data/treeview";
import { BiSearch } from "react-icons/bi";

export default function IndexPage() {
  return (
    <>
      <div className="dark flex h-screen w-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <div className="flex gap-4">
          <MultiSlider
            min={0}
            max={100}
            step={10}
            label={"Price Range"}
            showLabel={true}
            leftRightContain={true}
            minSelectableRange={30}
            maxLabel={"Maximum Price"}
            minLabel={"Minimum Price"}
            format={(val) => `$${val}`}
          />
          <Input label="Search" />
        </div>
      </div>
    </>
  );
}
