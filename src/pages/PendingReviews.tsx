import { PendingReviewTable } from '../components/dashboard/shared/PendingReviewTable'

export function PendingReviews() {
  return (
    <div className="space-y-5">
      <PendingReviewTable title="Pending Reviews" subtitle="All evaluations awaiting your review" />
    </div>
  )
}
