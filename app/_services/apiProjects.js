import supabase from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("project_with_totals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not receive projects");

  return data;
}
