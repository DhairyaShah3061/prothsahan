import { InteractiveGradientBackground } from '@/components/ui/interactive-gradient-background';

export default function DemoOne() {
  return (
    <InteractiveGradientBackground intensity={1} dark>
      <div style={{ padding: '6rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>Hello</h1>
        <p>Move your mouse.</p>
      </div>
    </InteractiveGradientBackground>
  );
}
