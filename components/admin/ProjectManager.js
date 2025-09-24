"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Plus, Save, Trash2, Pencil, RefreshCcw } from "lucide-react";
import { supabase } from "../../lib/supabase";
import ProjectCard from "../sections/projects/ProjectCard";

const ADMIN_PASSWORD = "password123"; // not used for direct supabase calls now

function toCamel(project) {
  return {
    id: project.id,
    title: project.title,
    image: project.image,
    tech: project.tech,
    desc: project.description,
    gallery: project.gallery || [],
    features: project.features || [],
    techHighlights: project.tech_highlights || [],
    timeline: project.timeline,
    status: project.status,
    demoUrl: project.demo_url,
    codeUrl: project.code_url,
    videoUrl: project.video_url,
  };
}

function toSnake(project) {
  return {
    id: project.id,
    title: project.title,
    image: project.image,
    tech: project.tech,
    description: project.desc,
    gallery: project.gallery || [],
    features: project.features || [],
    tech_highlights: project.techHighlights || [],
    timeline: project.timeline,
    status: project.status,
    demo_url: project.demoUrl,
    code_url: project.codeUrl,
    video_url: project.videoUrl,
  };
}

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setProjects((data || []).map(toCamel));
    } catch (e) {
      setError(e.message || "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const startEdit = (index) => {
    setEditIndex(index);
    setForm(projects[index]);
    setError("");
    setSuccess("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setForm({});
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addProject = () => {
    const newProject = {
      id: undefined,
      title: "New Project",
      image: "/projects/placeholder.png",
      tech: "",
      desc: "",
      gallery: [],
      features: [],
      techHighlights: [],
      timeline: "",
      status: "Draft",
      demoUrl: "",
      codeUrl: "",
      videoUrl: "",
    };
    setProjects((prev) => [newProject, ...prev]);
    setEditIndex(0);
    setForm(newProject);
  };

  const deleteProject = async (index) => {
    const project = projects[index];
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    try {
      if (project.id != null) {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", project.id);
        if (error) throw error;
      }
      const next = projects.filter((_, i) => i !== index);
      setProjects(next);
      if (editIndex === index) cancelEdit();
      setSuccess("Deleted successfully");
    } catch (e) {
      setError(e.message || "Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  const saveCurrent = async () => {
    if (editIndex === null) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = toSnake(form);
      // upsert: if id exists, update; else insert and return new id
      const { data, error } = await supabase
        .from("projects")
        .upsert(payload, { onConflict: "id" })
        .select();
      if (error) throw error;
      const saved = toCamel(data[0]);
      const next = [...projects];
      next[editIndex] = saved;
      setProjects(next);
      setForm(saved);
      setSuccess("Saved successfully");
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const refreshFromDb = () => {
    cancelEdit();
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-foreground/80">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading projects…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Manager</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshFromDb}
            className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-muted/30"
          >
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-muted/30"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
          <button
            onClick={saveCurrent}
            disabled={saving || editIndex === null}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-60"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Current"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
      {success && <div className="mb-4 text-sm text-green-500">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project List */}
        <div>
          <div className="space-y-2">
            {projects.map((p, i) => (
              <div
                key={p.id ?? `new-${i}`}
                className={`flex items-center justify-between border border-border rounded p-3 ${
                  i === editIndex ? "ring-2 ring-primary/40" : ""
                }`}
              >
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-foreground/60">
                    {p.id ? `ID: ${p.id}` : "Unsaved"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(i)}
                    className="inline-flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted/30"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProject(i)}
                    className="inline-flex items-center gap-1 px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor + Visual Preview */}
        <div className="space-y-4">
          <div className="border border-border rounded p-4">
            {editIndex === null ? (
              <div className="text-foreground/60">Select a project to edit</div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Title</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.title || ""}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Image URL</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.image || ""}
                    onChange={(e) => updateField("image", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tech</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.tech || ""}
                    onChange={(e) => updateField("tech", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none min-h-[120px]"
                    value={form.desc || ""}
                    onChange={(e) => updateField("desc", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Timeline</label>
                    <input
                      className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                      value={form.timeline || ""}
                      onChange={(e) => updateField("timeline", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Status</label>
                    <input
                      className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                      value={form.status || ""}
                      onChange={(e) => updateField("status", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Demo URL</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.demoUrl || ""}
                    onChange={(e) => updateField("demoUrl", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Code URL</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.codeUrl || ""}
                    onChange={(e) => updateField("codeUrl", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Video URL</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
                    value={form.videoUrl || ""}
                    onChange={(e) => updateField("videoUrl", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveCurrent}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />{" "}
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-muted/30"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview */}
          {editIndex !== null && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <ProjectCard project={form} variants={{}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
