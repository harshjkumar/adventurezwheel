import { Metadata } from "next";
import { SpitiValleyClient } from "./SpitiValleyClient";
import { getAllTrips } from "@/lib/data/queries";
import { defaultTrips } from "@/lib/data/trips";

export const metadata: Metadata = {
  title: "Spiti Valley Bike Trips & Expeditions | K2K Adventurez",
  description:
    "Explore our complete collection of Spiti Valley motorcycle expeditions — cross high-altitude passes, experience pristine lakes, and discover ancient monasteries in the middle land.",
};

export const revalidate = 3600;

export default async function SpitiValleyPage() {
  let trips: any[] = [];
  const rawTrips = await getAllTrips();

  if (!rawTrips || rawTrips.length === 0) {
    trips = defaultTrips;
  } else {
    trips = rawTrips;
  }

  return <SpitiValleyClient initialTrips={trips} />;
}
