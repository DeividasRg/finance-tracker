import supabase from "./supabase";

export async function getProjectsView() {
  const { data, error } = await supabase
    .from("project_with_totals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not receive projects");

  return data;
}

export async function getProject(id) {
  const { data, error } = await supabase
    .from("project_with_totals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Could not receive project");

  return data;
}

export async function getProjectTransactions(id) {
  const { data, error } = await supabase
    .from("projectTransactions")
    .select("*")
    .eq("projectId", id)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not receive project transactions");

  return data;
}

export async function createProjectTransaction(newTransaction) {
  const { error } = await supabase
    .from("projectTransactions")
    .insert([{ ...newTransaction }]);

  if (error) throw new Error("failed", error.message);
}

export async function deleteProjectTransaction(id) {
  const { error } = await supabase
    .from("projectTransactions")
    .delete()
    .eq("id", id);

  if (error) throw new Error("failed", error.message);
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw new Error("failed", error.message);
}

export async function createProject(project) {
  const { error } = await supabase.from("projects").insert([{ ...project }]);

  if (error) throw new Error("failed", error.message);
}
