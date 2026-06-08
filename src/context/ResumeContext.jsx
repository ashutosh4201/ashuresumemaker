import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { createEmptyResume } from "../utils/defaultResume.js";
import { createResume, getResume, updateResume } from "../api/client.js";

const STORAGE_KEY = "resumeflow-data-v1";
const RESUME_ID_KEY = "resumeflow-resume-id";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(createEmptyResume);
  const [resumeId, setResumeId] = useState(() => localStorage.getItem(RESUME_ID_KEY));
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);
  const saveTimer = useRef(null);
  const skipNextSave = useRef(false);

  const loadFromApi = useCallback(async (id) => {
    try {
      const row = await getResume(id);
      const data = row.data && Object.keys(row.data).length ? row.data : createEmptyResume();
      skipNextSave.current = true;
      setResume({
        ...createEmptyResume(),
        ...data,
        template: row.template || data.template,
        accent: row.accent || data.accent,
      });
      setApiOnline(true);
    } catch {
      setApiOnline(false);
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setResume(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const urlResumeId = urlParams.get("resume");
      const storedId = urlResumeId || localStorage.getItem(RESUME_ID_KEY);
      if (storedId) {
        setResumeId(storedId);
        await loadFromApi(storedId);
      } else {
        try {
          const created = await createResume(createEmptyResume());
          localStorage.setItem(RESUME_ID_KEY, created.id);
          setResumeId(created.id);
          if (created.data) {
            skipNextSave.current = true;
            setResume({ ...createEmptyResume(), ...created.data });
          }
          setApiOnline(true);
        } catch {
          setApiOnline(false);
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setResume(JSON.parse(saved));
          } catch {
            /* ignore */
          }
        }
      }
      setLoading(false);
    })();
  }, [loadFromApi]);

  useEffect(() => {
    if (loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (!resumeId || !apiOnline) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSyncing(true);
      try {
        await updateResume(resumeId, resume);
        setApiOnline(true);
      } catch {
        setApiOnline(false);
      } finally {
        setSyncing(false);
      }
    }, 800);
  }, [resume, resumeId, loading, apiOnline]);

  const updatePersonal = (field, value) =>
    setResume((r) => ({ ...r, personal: { ...r.personal, [field]: value } }));

  const updateField = (field, value) => setResume((r) => ({ ...r, [field]: value }));

  const updateFields = (patch) => setResume((r) => ({ ...r, ...patch }));

  const updateListItem = (section, id, field, value) =>
    setResume((r) => ({
      ...r,
      [section]: r[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));

  const addListItem = (section, item) =>
    setResume((r) => ({ ...r, [section]: [...r[section], item] }));

  const removeListItem = (section, id) =>
    setResume((r) => ({ ...r, [section]: r[section].filter((i) => i.id !== id) }));

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setResume((r) =>
      r.skills.includes(trimmed) ? r : { ...r, skills: [...r.skills, trimmed] }
    );
  };

  const removeSkill = (skill) =>
    setResume((r) => ({ ...r, skills: r.skills.filter((s) => s !== skill) }));

  const resetResume = async () => {
    const fresh = createEmptyResume();
    setResume(fresh);
    if (resumeId && apiOnline) {
      try {
        await updateResume(resumeId, fresh);
      } catch {
        setApiOnline(false);
      }
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        resumeId,
        loading,
        syncing,
        apiOnline,
        updatePersonal,
        updateField,
        updateFields,
        updateListItem,
        addListItem,
        removeListItem,
        addSkill,
        removeSkill,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
