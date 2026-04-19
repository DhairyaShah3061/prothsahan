import { DitheringShader } from '@/components/ui/dithering-shader';

export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <DitheringShader
        shape="wave"
        type="8x8"
        colorBack="#001122"
        colorFront="#ff0088"
        pxSize={3}
        speed={0.6}
        width={1200}
        height={700}
      />
    </div>
  );
}
