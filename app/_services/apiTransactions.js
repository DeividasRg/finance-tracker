import supabase from "./supabase";

export async function getTransactions(filter) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - Number(filter));

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .gte("created_at", cutoffDate.toISOString())
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not receive transactions");

  return data;
}

export async function getDescriptionSum() {
  const { data, error } = await supabase.from("description_sum").select("*");

  if (error) throw new Error("Could not receive transactions");

  return data;
}

export async function deleteTransaction(id) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) throw new Error("Transaction could not be deleted");
}

export async function createTransaction(newTransaction) {
  const { error } = await supabase
    .from("transactions")
    .insert([{ ...newTransaction }]);

  if (error) throw new Error(error.message);
}
