export const lighten = (color: string, opacity: number): string => {
  // Verificar si el formato del color es correcto (debe ser "rgb(r, g, b)")
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const match = color.match(rgbRegex);

  if (!match) {
    throw new Error('Formato de color inválido. Debe ser "rgb(r, g, b)"');
  }

  // Extraer los valores de los componentes RGB
  const [, r, g, b] = match.map(Number);

  // Ajustar la opacidad
  const alpha = Math.min(Math.max(opacity, 0), 1);

  // Calcular los componentes RGB con la opacidad ajustada
  const newR = Math.round(r + (255 - r) * alpha);
  const newG = Math.round(g + (255 - g) * alpha);
  const newB = Math.round(b + (255 - b) * alpha);

  // Convertir los componentes RGB a formato hexadecimal
  const hex = (x: number) => {
    const hexValue = x.toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  };

  // Construir el nuevo color en formato hexadecimal

  const lightenColor = `#${hex(newR)}${hex(newG)}${hex(newB)}`;
  return lightenColor;
};

export const darken = (color: string, amount: number): string => {
  // Verificar si el formato del color es correcto (debe ser "rgb(r, g, b)")
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const match = color.match(rgbRegex);

  if (!match) {
    throw new Error('Formato de color inválido. Debe ser "rgb(r, g, b)"');
  }

  // Extraer los valores de los componentes RGB
  const [, r, g, b] = match.map(Number);

  // Calcular el factor de oscurecimiento
  const darkenFactor = 1 - amount / 10;

  // Calcular los componentes RGB oscurecidos
  const newR = Math.round(r * darkenFactor);
  const newG = Math.round(g * darkenFactor);
  const newB = Math.round(b * darkenFactor);

  // Convertir los componentes RGB a formato hexadecimal
  const hex = (x: number) => {
    const hexValue = x.toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  };

  const darkenColor = `#${hex(newR)}${hex(newG)}${hex(newB)}`;

  return darkenColor;
};
