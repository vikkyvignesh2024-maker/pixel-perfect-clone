import kilangu from "@/assets/kilangu.jpg";
import soup from "@/assets/soup.jpg";
import chai from "@/assets/chai.jpg";
import gobi from "@/assets/gobi.jpg";
import maggi from "@/assets/maggi.jpg";
import omelette from "@/assets/omelette.jpg";
import corn from "@/assets/corn.jpg";

export type MenuItem = { name: string; category: string; desc: string; img: string; price?: string };

export const CATEGORIES = ["Signature", "Bajji", "Chilli Snacks", "Maggi", "Bread & Egg", "Corn", "Traditional", "Tea & Coffee"];

export const MENU: MenuItem[] = [
  { name: "Mudavattu Kilangu", category: "Signature", desc: "A traditional local ingredient from the Yercaud hills. Take some home.", img: kilangu, price: "₹150 / kg" },
  { name: "Mudavattu Kilangu Soup", category: "Signature", desc: "A warm, flavourful bowl, perfect for cool hill weather.", img: soup },
  { name: "Bajji Varieties", category: "Bajji", desc: "Golden, crispy batter-fried bajji, served hot.", img: chai },
  { name: "Cauliflower Chilli", category: "Chilli Snacks", desc: "Crispy cauliflower tossed in a spicy, tangy masala.", img: gobi },
  { name: "Plain Maggi", category: "Maggi", desc: "The classic hill-station comfort bowl, cooked fresh.", img: maggi },
  { name: "Egg Maggi", category: "Maggi", desc: "Hot masala Maggi loaded with scrambled egg.", img: maggi },
  { name: "Bread Omelette", category: "Bread & Egg", desc: "Toasted bread with a fluffy onion-chilli omelette.", img: omelette },
  { name: "Sweet Corn Fry", category: "Corn", desc: "Crunchy fried corn with a spicy seasoning.", img: corn },
  { name: "Boiled Sweet Corn", category: "Corn", desc: "Buttery boiled corn with masala and lemon.", img: corn },
  { name: "Onion Bakkoda", category: "Traditional", desc: "Crispy onion pakoda — a true tea-time favourite.", img: chai },
  { name: "Indian Chai", category: "Tea & Coffee", desc: "Hot, comforting tea brewed the way you love it.", img: chai },
  { name: "Coffee", category: "Tea & Coffee", desc: "A frothy cup of coffee to warm your hands.", img: chai },
];
