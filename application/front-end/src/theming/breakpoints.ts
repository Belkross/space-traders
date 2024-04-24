export const breakpointsRaw = {
  xs: 400,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

type Breakpoints = keyof typeof breakpointsRaw
type PandaBreakpoints = Record<Breakpoints, string>

export const breakpoints: PandaBreakpoints = {
  xs: "400px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",

  /* "room-sm": "400px",
	"room-md": "630px",
	"room-lg": "900px", //application bar goes to the top
	"room-xl": "1300px", //add the Teams component to the layout
	"room-xxl": "1500px", */
}

/* 
Traiter des breakpoints différents pour chaque page me semble difficile
alors je vais essayer d’utiliser les breakpoints par défaut au maximum
*/
