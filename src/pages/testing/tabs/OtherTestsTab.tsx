import { FlaskConical } from 'lucide-react'
import { otherTestCategories } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'

export function OtherTestsTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-500">
        Additional OIML R-76 tests applicable to this instrument class. Detailed test procedures and calculations for
        these categories will be enabled in a future release.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {otherTestCategories.map((test) => (
          <div key={test.name} className="rounded-xl border border-ink-200 bg-white p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
              <FlaskConical className="h-4 w-4" strokeWidth={2} />
            </span>
            <p className="mt-3 text-sm font-semibold text-ink-900">{test.name}</p>
            <div className="mt-2">
              <StatusBadge status={test.status} />
            </div>
            <Button variant="secondary" disabled className="mt-4 w-full">
              Not Yet Available
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
