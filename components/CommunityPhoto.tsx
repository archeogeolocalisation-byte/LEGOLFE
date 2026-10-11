'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CommunityPhoto({ path, alt, className }: { path: string; alt: string; className?: string }) {
  const [source, setSource] = useState<{ path: string; url: string }>();
  useEffect(() => {
    let active = true;
    let generation = 0;
    async function refresh() {
      const ticket = ++generation;
      const { data } = await supabase.storage.from('community-photos').createSignedUrl(path, 300);
      if (active && ticket === generation) setSource(data ? { path, url: data.signedUrl } : undefined);
    }
    void refresh();
    const timer = setInterval(() => void refresh(), 240000);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { setSource(undefined); void refresh(); });
    return () => { active = false; clearInterval(timer); subscription.unsubscribe(); };
  }, [path]);
  const src = source?.path === path ? source.url : undefined;
  return src ? <img src={src} alt={alt} className={className} /> : <div className={className} role="img" aria-label={alt} />;
}
