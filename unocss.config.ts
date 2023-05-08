import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";
import { defineConfig, presetIcons } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";
// import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        gm: () =>
          import("@iconify-json/grommet-icons/icons.json").then(
            (i) => i.default
          ),
      },
    }),
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
        clashDisplay: [
          {
            name: "Clash Display",
            weights: ["300", "400", "500", "700", "800"],
          },
        ],
      },
    }),
  ],
  rules: [[/^h-calc-(\d+)px$/, ([, d]) => ({ height: `calc(100vh - ${d}px)` })]],
  theme: {
    colors: {
      darkSurface: "#070b14",
      lightText: "#ffffff",
      buttonBg: "#122243",
      primary: "#4A6DBF",
      divider: {
        base: "rgba(255,255,255,0.2)",
      },
      button: {
        primaryBg: "#000000",
        primaryText: "#ffffff",
        secondaryBg: "#ffffff",
        secondaryText: "#000000",
      },
      input: {
        bg: "rgba(255,255,255,0.01)",
        borderColor: "#79a0f41a",
        focusBorderColor: "#3a4e77",
      },
    },
  },
});
