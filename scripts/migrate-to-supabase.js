import { readFile } from "fs/promises";
import { supabase } from "../lib/supabase.js";
import path from "path";

async function migrateProjects() {
  try {
    console.log("🚀 Starting migration to Supabase...");

    // Read existing projects from JSON
    const dataPath = path.join(process.cwd(), "data", "projects.en.json");
    const content = await readFile(dataPath, "utf-8");
    const projects = JSON.parse(content);

    console.log(`📄 Found ${projects.length} projects to migrate`);

    // Clear existing projects in database
    console.log("🗑️  Clearing existing projects...");
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .neq("id", 0);

    if (deleteError) {
      throw deleteError;
    }

    // Map camelCase fields to snake_case for database
    const mappedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      image: project.image,
      tech: project.tech,
      description: project.desc, // desc -> description
      gallery: project.gallery,
      features: project.features,
      tech_highlights: project.techHighlights, // techHighlights -> tech_highlights
      timeline: project.timeline,
      status: project.status,
      demo_url: project.demoUrl, // demoUrl -> demo_url
      code_url: project.codeUrl, // codeUrl -> code_url
      video_url: project.videoUrl, // videoUrl -> video_url
    }));

    // Insert projects into database
    console.log("💾 Inserting projects into database...");
    const { error: insertError } = await supabase
      .from("projects")
      .insert(mappedProjects);

    if (insertError) {
      throw insertError;
    }

    console.log("✅ Migration completed successfully!");
    console.log(`📊 Migrated ${projects.length} projects to Supabase`);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

migrateProjects();
