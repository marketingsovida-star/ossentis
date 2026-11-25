import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { ProdutoPage } from "@/pages/produto";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const el = hash ? document.querySelector(hash) : null;
    if (el) el.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saude-ossea-articular" element={<ProdutoPage key="c" id="capsulas" />} />
        <Route path="/gel-de-alivio" element={<ProdutoPage key="g" id="gel" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
