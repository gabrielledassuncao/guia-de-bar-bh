import { Suspense } from "react";
import ExplorarClient from "./ExplorarClient";

export default function ExplorarPage() {
  return (
    <Suspense fallback={<p>Carregando bares...</p>}>
      <ExplorarClient />
    </Suspense>
  );
}
