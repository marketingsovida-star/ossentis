import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { SacPage } from "@/pages/sac";

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
        <Route path="/sac" element={<SacPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
