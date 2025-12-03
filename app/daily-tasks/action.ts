'use server';

import { createClient } from '@/lib/supabase/server';

export async function createTask(title: string, task: string, date: string, done: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const userId = user.id;

  const { error } = await supabase
    .from('tasks')
    .insert({
      title,
      task,
      date,
      done,
      user_id: userId,
    })
    .select();

  if (error) {
    throw new Error('create failed');
  }
  return { success: true };
}
