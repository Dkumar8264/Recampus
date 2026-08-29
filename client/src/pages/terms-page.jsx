import { ShieldCheck } from 'lucide-react';

const guidelines = [
  'Use your own verified college account and keep listing details honest.',
  'Meet in public campus locations for exchanges and avoid sharing sensitive personal details.',
  'Inspect items before paying. Recampus does not process payments or guarantee transactions.',
  'Report suspicious listings, unsafe behavior, or prohibited items so admins can review them.',
  'Do not post illegal, dangerous, counterfeit, or restricted goods.'
];

export function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-campus text-white shadow-[0_8px_18px_rgba(0,153,255,0.22)]">
          <ShieldCheck size={22} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-4xl font-black text-ink">Terms & community guidelines</h1>
          <p className="mt-1 text-sm text-stone-600">Lightweight rules for safer campus exchanges.</p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-[28px] border border-stone-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(64,43,20,0.1)]">
        {guidelines.map((guideline) => (
          <p key={guideline} className="leading-7 text-stone-700">
            {guideline}
          </p>
        ))}
      </div>

      <p className="mt-5 text-sm leading-6 text-stone-600">
        Recampus is a student coordination platform. Users are responsible for their listings,
        meetings, payments, and handoffs. Admin review tools can remove reported content, but users
        should still use judgment and meet in visible campus areas.
      </p>
    </section>
  );
}
