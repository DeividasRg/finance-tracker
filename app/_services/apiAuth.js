import supabase from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) throw new Error("Could not receive transactions");

  return data;
}
