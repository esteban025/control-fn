import Active from "@/assets/active.svg";
import Graphics from "@/assets/graphics.svg";
import Register from "@/assets/register.svg";

interface HeroCard {
  title: string;
  description: string;
  icon: any;
  colors: {
    bg: string;
    text: string;
  };
}

export const heroCards: HeroCard[] = [
  {
    title: "Control total y sencillo",
    description: "Registra tus gastos facilmente",
    icon: Register,
    colors: {
      bg: "bg-blue-50",
      text: "text-blue-400"
    }
  },
  {
    title: "Visualiza tus finanzas",
    description: "Gráficos y estadísticas",
    icon: Graphics,
    colors: {
      bg: "bg-green-50",
      text: "text-green-400"
    }
  },
  {
    title: "Acceso desde cualquier lugar",
    description: "Controla tus finanzas en línea",
    icon: Active,
    colors: {
      bg: "bg-red-50",
      text: "text-red-400"
    }
  },
] as const;