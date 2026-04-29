import chroma from "chroma-js";

const ColorTools = {
  palette(base: string, quantity: number) {
    const baseColor = chroma(base);
    const hue = baseColor.get("hsl.h") || 200;
    const step = 360 / quantity;

    return Array.from({ length: quantity }, (_, i) =>
      chroma(baseColor)
        .set("hsl.h", hue + step * i)
        .saturate(0.6)
        .brighten(0.5)
        .hex()
    );
  },
};

export default ColorTools;
