"use client";

import { Button } from "@/components/Button";

import { Calendar } from "@/components/Calendar";
import { Chip } from "@/components/Chip";
import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";
import { MultiSlider } from "@/components/MultiSlider";
import { Switch } from "@/components/Switch";
import { TreeView } from "@/components/TreeView";

import { DATA as COUNTRIES, DATA } from "@/stories/mock-data/countries";
import { DATA as LOCATIONS } from "@/stories/mock-data/treeview";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default function IndexPage() {
  const [items, setItems] = useState(["one", "two", "three"]);

  const [itemToAdd, setItemToAdd] = useState("");

  const handleRemove = (itemToRemove: string) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  const handleAdd = () => {
    setItems([itemToAdd, ...items]);
  };

  return (
    <>
      <div className="dark flex h-screen w-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <div className="flex gap-4">
          <Input label="Search" onClick={handleAdd} />
          <Button onClick={handleAdd}>Search</Button>
        </div>
      </div>
    </>
  );
}
