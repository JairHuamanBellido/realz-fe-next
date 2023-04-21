import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";
import { defineConfig } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "fontshare",

      fonts: {
        satoshi: [
          {
            name: "Satoshi",
            weights: ["400", "600", "700"],
          },
        ],
      },
    }),
  ],
});
