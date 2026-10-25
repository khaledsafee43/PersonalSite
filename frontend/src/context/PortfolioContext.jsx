import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const PortfolioContext = createContext(null);

const defaultSite = {
  name: "Portfolio",
  role: "Full Stack Developer",
  email: "",
  github: "",
  linkedin: "",
  telegram: "",
};

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/public/site")
      .then((result) => {
        if (active) setContent(result.content || {});
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => {
    const rows = (type) => content[type] || [];
    const general = rows("general").find((item) => item.slug === "site-profile")?.data || {};
    const home = rows("home")[0]?.data || {};
    const about = rows("about")[0]?.data || {};
    const skills = rows("skills").flatMap((item) => item.data?.skills || []);
    const services = rows("services").flatMap((item) => item.data?.services || []);
    const projects = rows("projects").map((item) => ({ ...item.data, id: item._id, title: item.title || item.data?.title }));
    return {
      content,
      loading,
      error,
      site: { ...defaultSite, ...general },
      home,
      about,
      skills,
      services,
      projects,
      refresh: async () => {
        setLoading(true);
        try { const result = await api.get("/public/site"); setContent(result.content || {}); setError(""); }
        catch (err) { setError(err.message); }
        finally { setLoading(false); }
      },
    };
  }, [content, loading, error]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used inside PortfolioProvider.");
  return context;
}
