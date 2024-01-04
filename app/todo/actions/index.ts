"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createTodo(title: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("todo-demo").insert({ title }).single();
  revalidatePath("/todo");

  return result;
}

export async function readTodo() {
  noStore(); //forces component to not be cached
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("todo-demo").select("*"); //the policy we have setup on supabase means we will only select those which we created
  return result;
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("todo-demo").delete().eq("id", id);
  revalidatePath("/todo");

  //return result;
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("todo-demo")
    .update({ completed })
    .eq("id", id);
  revalidatePath("/todo");
}
