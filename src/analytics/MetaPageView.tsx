import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MetaPageView() {
  const loc = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [loc.pathname, loc.search, loc.hash]);

  return null;
}
