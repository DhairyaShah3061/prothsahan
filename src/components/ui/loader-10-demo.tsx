import { GooeyLoader } from "@/components/ui/loader-10";

export default function GooeyLoaderDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[250px]">
      <GooeyLoader
        primaryColor="#b91c1c"
        secondaryColor="#991b1b"
        borderColor="#0b0b0b"
      />
    </div>
  );
}
