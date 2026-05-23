import { useLenis as useReactLenis } from '@studio-freight/react-lenis';

type LenisScrollData = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
};

export function useLenis(
  callback?: (data: LenisScrollData) => void,
  deps?: React.DependencyList
) {
  return useReactLenis(callback as any, deps as any[]);
}
