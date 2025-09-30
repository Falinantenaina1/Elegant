import type { PriceRange } from "@/types";

export const menus = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const priceRanges: PriceRange[] = [
  {
    label: "$0.00 - 19.99",
    min: 0,
    max: 19.99,
  },
  {
    label: "$20.00 - 49.99",
    min: 20,
    max: 49.99,
  },
  {
    label: "$50.00 - 99.99",
    min: 50,
    max: 99.99,
  },
  {
    label: "$100.00+",
    min: 100,
    max: Infinity,
  },
];
