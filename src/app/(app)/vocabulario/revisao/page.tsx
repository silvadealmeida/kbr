import type { Metadata } from "next";
import { VocabReviewArea } from "@/components/vocabulary/VocabReviewArea";

export const metadata: Metadata = { title: "Revisão de vocabulário" };

export default function Page() {
  return <VocabReviewArea />;
}
