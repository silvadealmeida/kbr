import type { Metadata } from "next";
import { ReviewArea } from "@/components/review/ReviewArea";

export const metadata: Metadata = { title: "Revisão" };

export default function Page() {
  return <ReviewArea />;
}
