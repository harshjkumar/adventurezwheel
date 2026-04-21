import { Metadata } from "next";
import { TermsClient } from "@/components/sections/policies/TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | K2K Adventurez",
  description: "Read our terms and conditions before booking your expedition with K2K Adventurez.",
};

export default function TermsPage() {
  return <TermsClient />;
}
