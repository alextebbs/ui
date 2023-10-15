import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function IndexPage() {
  return (
    <>
      <div className="dark flex h-screen w-screen items-center justify-center bg-slate-950">
        <Input />
        <Button>The button</Button>
      </div>
    </>
  );
}
