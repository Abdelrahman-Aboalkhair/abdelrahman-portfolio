import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

const ADMIN_PASSWORD = "password123";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    // Map snake_case fields back to camelCase for frontend
    const mappedData = data.map((project) => ({
      id: project.id,
      title: project.title,
      image: project.image,
      tech: project.tech,
      desc: project.description, // description -> desc
      gallery: project.gallery,
      features: project.features,
      techHighlights: project.tech_highlights, // tech_highlights -> techHighlights
      timeline: project.timeline,
      status: project.status,
      demoUrl: project.demo_url, // demo_url -> demoUrl
      codeUrl: project.code_url, // code_url -> codeUrl
      videoUrl: project.video_url, // video_url -> videoUrl
    }));

    return NextResponse.json({ ok: true, data: mappedData });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const headerPassword = request.headers.get("x-admin-password");

    if (headerPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload: expected array of projects" },
        { status: 400 }
      );
    }

    // Clear existing projects and insert new ones
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .neq("id", 0); // Delete all rows

    if (deleteError) {
      throw deleteError;
    }

    // Map camelCase fields to snake_case for database
    const mappedProjects = body.map((project) => ({
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

    // Insert new projects
    const { error: insertError } = await supabase
      .from("projects")
      .insert(mappedProjects);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
