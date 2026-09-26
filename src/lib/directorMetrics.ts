import {
  adminMetrics,
  allEvaluations,
  complianceSummary,
  instruments,
  pendingReviewQueue,
  systemAlerts,
} from '../data/mockData'

// Every number here is derived from the existing mock data set — nothing is
// invented. These are pure functions so the Director dashboard stays
// declarative and the math can be swapped for a real API later without
// touching the UI.

export function totalEvaluations(): number {
  return adminMetrics.activeEvaluations + adminMetrics.completedEvaluations
}

export function compliancePct(): number {
  const total = complianceSummary.pass + complianceSummary.fail + complianceSummary.correctionRequired
  return total === 0 ? 0 : (complianceSummary.pass / total) * 100
}

export function pendingApprovals(): number {
  return adminMetrics.pendingReviews
}

export function criticalAlertCount(): number {
  return systemAlerts.length
}

export function instrumentsDueForVerification(): number {
  return instruments.filter((i) => i.status === 'Due for Verification').length
}

export function evaluationsNeedingCorrection(): number {
  return allEvaluations.filter((e) => e.status === 'Correction Required').length
}

export function pendingReviewCount(): number {
  return pendingReviewQueue.length
}

export function completionRatePct(): number {
  const { completedEvaluations, activeEvaluations } = adminMetrics
  const total = completedEvaluations + activeEvaluations
  return total === 0 ? 0 : (completedEvaluations / total) * 100
}

// Mean of (reviewedDate - createdDate), in days, across evaluations that
// have actually been reviewed. Records still awaiting review are excluded
// rather than guessed at.
export function averageEvaluationDays(): number {
  const durations = allEvaluations
    .filter((e) => e.reviewedDate)
    .map((e) => (new Date(e.reviewedDate!).getTime() - new Date(e.createdDate).getTime()) / (1000 * 60 * 60 * 24))
  if (durations.length === 0) return 0
  return durations.reduce((sum, d) => sum + d, 0) / durations.length
}

export function todayFormatted(): string {
  return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
