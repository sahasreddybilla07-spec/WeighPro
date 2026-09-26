import type { AppData } from '../context/AppDataContext'
import type { EvaluationRecord, Instrument } from '../data/mockData'
import { getEvaluationMeasurements } from '../context/AppDataContext'

export function isComplete(evaluation: EvaluationRecord): boolean {
  return evaluation.status === 'Approved' || evaluation.status === 'Completed'
}

export function getPipeline(data: AppData, laboratory?: string) {
  const rows = data.evaluations.filter((row) => !laboratory || row.lab === laboratory)
  const stages = [
    { label: 'Draft', statuses: ['Draft', 'Assigned'], color: '#C2CDD1' },
    { label: 'Testing', statuses: ['Testing'], color: '#245A73' },
    { label: 'Submitted', statuses: ['Submitted'], color: '#16A6B6' },
    { label: 'Under Review', statuses: ['Under Review'], color: '#C58B2A' },
    { label: 'Approved', statuses: ['Approved'], color: '#23845A' },
    { label: 'Completed', statuses: ['Completed'], color: '#173B4D' },
  ]
  return stages.map((stage) => ({ ...stage, count: rows.filter((row) => stage.statuses.includes(row.status)).length }))
}

export function getLabOverview(data: AppData) {
  const labs = new Set([...data.instruments.map((row) => row.lab), ...data.evaluations.map((row) => row.lab)])
  return [...labs].map((lab) => {
    const evaluations = data.evaluations.filter((row) => row.lab === lab)
    const pendingReviews = evaluations.filter((row) => row.status === 'Under Review').length
    return {
      lab,
      activeTests: evaluations.filter((row) => row.status === 'Testing').length,
      pendingReviews,
      completed: evaluations.filter(isComplete).length,
      status: 'Active' as const,
    }
  }).sort((a, b) => b.activeTests + b.pendingReviews - (a.activeTests + a.pendingReviews))
}

export function getWorkload(data: AppData, laboratory?: string) {
  return data.users
    .filter((user) => user.role === 'Testing Technician' && (!laboratory || user.laboratory === laboratory))
    .map((user) => {
      const evaluations = data.evaluations.filter((row) => row.tester === user.name)
      return {
        tester: user.name,
        assigned: evaluations.filter((row) => row.status === 'Assigned').length,
        inProgress: evaluations.filter((row) => row.status === 'Testing').length,
        completed: evaluations.filter(isComplete).length,
      }
    })
}

export function getReports(data: AppData) {
  return data.evaluations.map((evaluation) => {
    const measurements = getEvaluationMeasurements(data, evaluation.id)
    const repeatabilityReadings = measurements.repeatability.map((row) => Number(row.reading.match(/^[-+]?\d*\.?\d+/)?.[0])).filter(Number.isFinite)
    const repeatabilityMpe = Number(measurements.repeatabilityMpe.match(/^[-+]?\d*\.?\d+/)?.[0])
    const repeatabilityFail = repeatabilityReadings.length === measurements.repeatability.length && Number.isFinite(repeatabilityMpe)
      && Math.max(...repeatabilityReadings) - Math.min(...repeatabilityReadings) > repeatabilityMpe
    const complete = measurements.weighing.every((row) => row.result !== 'NOT TESTED')
      && repeatabilityReadings.length === measurements.repeatability.length && Number.isFinite(repeatabilityMpe)
      && measurements.eccentric.every((row) => row.result !== 'NOT TESTED')
      && measurements.other.every((row) => row.status !== 'Not Started')
    const failed = evaluation.result === 'FAIL' || measurements.weighing.some((row) => row.result === 'FAIL')
      || measurements.eccentric.some((row) => row.result === 'FAIL') || measurements.other.some((row) => row.status === 'FAIL') || repeatabilityFail
    const result = failed ? 'FAIL' as const
      : complete || evaluation.result === 'PASS' || evaluation.status === 'Approved' || evaluation.status === 'Completed' ? 'PASS' as const
      : 'PENDING' as const
    const status = evaluation.status === 'Completed' ? 'Final'
      : evaluation.status === 'Approved' ? 'Awaiting Director'
      : evaluation.status === 'Correction Required' ? 'Correction Required'
      : ['Submitted', 'Under Review'].includes(evaluation.status) ? 'Under Review' : 'In Progress'
    return {
    reportId: `RPT-${evaluation.id.replace('EV-', '')}`,
    evaluationId: evaluation.id,
    instrument: `${evaluation.manufacturer} ${evaluation.model}`,
    serial: evaluation.instrumentSerial,
    date: evaluation.reviewedDate ?? evaluation.submittedDate ?? evaluation.testDate ?? evaluation.createdDate,
    result,
    reviewer: evaluation.reviewer,
    status,
  }
  })
}

export function getSystemAlerts(data: AppData) {
  const corrections = data.evaluations.filter((row) => row.status === 'Correction Required').length
  const reviews = data.evaluations.filter((row) => row.status === 'Under Review').length
  const due = data.instruments.filter((row) => row.status !== 'Decommissioned' && new Date(`${row.nextVerification}T00:00:00`).getTime() <= Date.now() + 30 * 86400000).length
  return [
    ...(reviews ? [{ id: 'ALERT-REVIEWS', title: `${reviews} evaluation${reviews === 1 ? '' : 's'} awaiting review`, description: 'Submitted evaluations are ready for a reviewer decision.', urgency: 'due-today' as const, kind: 'review' as const }] : []),
    ...(due ? [{ id: 'ALERT-VERIFICATION', title: `${due} instrument${due === 1 ? '' : 's'} due for verification`, description: 'Verification is due within the next 30 days. Schedule the required checks.', urgency: 'attention' as const, kind: 'data' as const }] : []),
    ...(corrections ? [{ id: 'ALERT-CORRECTIONS', title: `${corrections} evaluation${corrections === 1 ? '' : 's'} need correction`, description: 'Returned evaluations need additional testing or documentation.', urgency: 'attention' as const, kind: 'correction' as const }] : []),
  ]
}

export function getInstrumentForEvaluation(instruments: Instrument[], evaluation: EvaluationRecord) {
  return instruments.find((instrument) => instrument.id === evaluation.instrumentId)
}
