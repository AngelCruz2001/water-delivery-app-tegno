import { useState, useEffect, useRef } from 'react';
import { View, LayoutChangeEvent, LayoutRectangle } from 'react-native';

// Fórmula para calcular la distancia entre dos puntos
const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Tipos para las referencias y eventos de layout
type UseDistanceReturn = {
  component1Ref: React.RefObject<View>;
  component2Ref: React.RefObject<View>;
  onLayoutComponent1: (event: LayoutChangeEvent) => void;
  onLayoutComponent2: (event: LayoutChangeEvent) => void;
  distance: number | null;
};

const useDistance = (): UseDistanceReturn => {
  const [component1Layout, setComponent1Layout] = useState<LayoutRectangle | null>(null);
  const [component2Layout, setComponent2Layout] = useState<LayoutRectangle | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  
  const component1Ref = useRef<View>(null);
  const component2Ref = useRef<View>(null);

  useEffect(() => {
    if (component1Layout && component2Layout) {
      const { x: x1, y: y1 } = component1Layout;
      const { x: x2, y: y2 } = component2Layout;
      const calculatedDistance = calculateDistance(x1, y1, x2, y2);
      setDistance(calculatedDistance);
    }
  }, [component1Layout, component2Layout]);

  const onLayoutComponent1 = (event: LayoutChangeEvent) => {
    setComponent1Layout(event.nativeEvent.layout);
  };

  const onLayoutComponent2 = (event: LayoutChangeEvent) => {
    setComponent2Layout(event.nativeEvent.layout);
  };

  return {
    component1Ref,
    component2Ref,
    onLayoutComponent1,
    onLayoutComponent2,
    distance
  };
};

export default useDistance;
