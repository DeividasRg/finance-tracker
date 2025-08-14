import supabase from "./supabase";

export async function getBuyCategories() {
  const { data, error } = await supabase.from("buyCategories").select("*");

  if (error) throw new Error("Could not receive buy categorries");

  return data;
}
