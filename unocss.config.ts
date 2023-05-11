import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";
import { defineConfig, presetIcons } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

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
  rules: [
    [/^h-calc-(\d+)px$/, ([, d]) => ({ height: `calc(100vh - ${d}px)` })],
    [
      /^transparent-(\d)$/,
      ([, d]) => ({ background: `rgba(255,255,255,0.${d})` }),
    ],
    [
      /^transparent-low-(\d)$/,
      ([, d]) => ({ background: `rgba(255,255,255,0.0${d})` }),
    ],
    ["text-shadow-blue-brilliant", { "text-shadow": "0px 0px 12px #4dbded" }],
  ],
  theme: {
    colors: {
      darkSurface: "#070b14",
      blueBrilliant: "#4dbded",
      button: {
        primaryBg: "#000000",
        primaryText: "#ffffff",
        secondaryBg: "#ffffff",
        secondaryText: "#000000",
      },
      input: {
        borderColor: "#33ffaa1a",
        focusBorderColor: "#33ffaa7f",
      },
    },
  },
});
