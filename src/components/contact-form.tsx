import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
const schema = z.object({ name: z.string().trim().min(2, 'Please enter your name.').max(100), email: z.string().trim().email('Please enter a valid email.').max(255), subject: z.string().trim().min(2, 'Please add a subject.').max(150), message: z.string().trim().min(10, 'Please write at least 10 characters.').max(2000) });
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (fields.get('website')) return;
    const parsed = schema.safeParse(Object.fromEntries(fields));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Please check your details.'); return; }
    setStatus('sending');
    try {
      const result = await supabase.from('contact_messages').insert(parsed.data);
      if (result.error) throw result.error;
      setStatus('sent'); form.reset();
    } catch { setError('Your message couldn’t be saved. Please try again or reach out on LinkedIn.'); setStatus('idle'); }
  }
  return <form onSubmit={submit} className="space-y-5" aria-label="Contact Welcome">
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label htmlFor="name" className="form-label">Your name</label><Input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Jane Smith" className="contact-field" /></div><div><label htmlFor="email" className="form-label">Email address</label><Input id="email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="jane@company.com" className="contact-field" /></div></div>
    <div><label htmlFor="subject" className="form-label">Subject</label><Input id="subject" name="subject" required minLength={2} maxLength={150} placeholder="Let’s talk about an opportunity" className="contact-field" /></div>
    <div><label htmlFor="message" className="form-label">Your message</label><Textarea id="message" name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Tell me a little about what you have in mind…" className="contact-field resize-y" /></div>
    <div hidden aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    {status === 'sent' ? <div role="status" className="flex items-center gap-2 text-sm text-success"><CheckCircle2 size={18} /> Message received. Thank you for reaching out! <Button type="button" variant="ghost" size="sm" onClick={() => setStatus('idle')}>Send another</Button></div> : <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? <Loader2 className="animate-spin" /> : <Send />} {status === 'sending' ? 'Sending…' : 'Send message'}</Button>}
    <p className="text-[10px] text-muted-foreground">Your details stay private and are only used to respond to your message.</p>
  </form>;
}
