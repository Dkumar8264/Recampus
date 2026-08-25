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
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-campus text-white">
          <ShieldCheck size={22} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-ink">Terms & community guidelines</h1>
          <p className="mt-1 text-sm text-stone-600">Lightweight rules for safer campus exchanges.</p>
        </div>
      </div>

      <div className="mt-6 space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
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
