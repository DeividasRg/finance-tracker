import supabase from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("allowedUsers").select("*");

  if (error) throw new Error("Could not receive transactions");

  return data;
}
