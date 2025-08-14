import supabase from "./supabase";

export async function getBuyCategories() {
  const { data, error } = await supabase
    .from("buyCategories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not receive buy categorries");

  return data;
}

export async function createBuyCategory(newBuyCategory) {
  const { error } = await supabase
    .from("buyCategories")
    .insert([{ ...newBuyCategory }]);

  if (error) throw new Error(error.message);
}

export async function deleteBuyCategory(id) {
  const { error } = await supabase.from("buyCategories").delete().eq("id", id);

  if (error) throw new Error("Buy category could not be deleted");
}
