'use server';

import { createClient } from '@/lib/supabase/server';

export async function createEvent(title: string, location: string, date: string,) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('events')
    .insert({ title, location, date })
    .select();

  if (error) {
    throw new Error('create failed');
  }
  return { success: true };
}