import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  adminRecentActivity,
  allEvaluations,
  auditLog as seedAuditLog,
  eccentricLoadingReadings,
  instruments,
  notifications,
  oimlRuleCategories,
  repeatabilityReadings,
  usersList,
  weighingPerformanceObservations,
} from '../data/mockData'
import type {
  ActivityItem,
  AuditLogRow,
  EvaluationRecord,
  Instrument,
  Notification,
  OimlRuleCategory,
  UserRecord,
} from '../data/mockData'

const STORAGE_KEY = 'weighmetric-records-v1'

export interface EvaluationMeasurements {
  weighing: { testLoad: string; indicated: string; error: string; mpe: string; result: 'PASS' | 'FAIL' | 'NOT TESTED' }[]
  repeatability: typeof repeatabilityReadings
  eccentric: { position: string; reading: string; error: string; mpe: string; result: 'PASS' | 'FAIL' | 'NOT TESTED' }[]
  other: { name: string; status: 'Not Started' | 'Complete' | 'PASS' | 'FAIL'; note: string }[]
  repeatabilityLoad: string
  repeatabilityMpe: string
  eccentricLoad: string
  attachments?: string[]
}

export interface AppData {
  instruments: Instrument[]
  evaluations: EvaluationRecord[]
  users: UserRecord[]
  notifications: Notification[]
  activity: ActivityItem[]
  auditLog: AuditLogRow[]
  measurements: Record<string, EvaluationMeasurements>
  rules: OimlRuleCategory[]
}

export function getEvaluationMeasurements(data: AppData, evaluationId: string): EvaluationMeasurements {
  const saved = data.measurements[evaluationId]
  if (saved) return saved
  if (evaluationId === 'EV-2026-0138') return seedMeasurements()[evaluationId]
  const evaluation = data.evaluations.find((row) => row.id === evaluationId)
  const instrument = data.instruments.find((row) => row.id === evaluation?.instrumentId)
  const capacity = instrument?.capacity.match(/^\s*(\d+(?:\.\d+)?)\s*(.*)$/)
  const maxLoad = capacity ? Number(capacity[1]) : 3
  const unit = capacity?.[2] || 'kg'
  const loadAt = (percentage: number) => `${Number((maxLoad * percentage).toPrecision(4))} ${unit}`
  return {
    weighing: weighingPerformanceObservations.map((row, index) => ({ ...row, testLoad: loadAt([0.1, 0.2, 0.4, 0.6, 0.8, 1][index] ?? 1), indicated: '—', error: '—', mpe: '', result: 'NOT TESTED' as const })),
    repeatability: repeatabilityReadings.map((row) => ({ ...row, reading: '—', error: '—' })),
    eccentric: eccentricLoadingReadings.map((row) => ({ ...row, reading: '—', error: '—', mpe: '', result: 'NOT TESTED' as const })),
    other: ['Discrimination Test', 'Tare Balance Effect', 'Temperature Variation'].map((name) => ({ name, status: 'Not Started' as const, note: '' })),
    repeatabilityLoad: loadAt(0.5),
    repeatabilityMpe: '',
    eccentricLoad: loadAt(0.5),
  }
}

type NewInstrument = Omit<Instrument, 'id' | 'lastEvaluation' | 'nextVerification'> & { nextVerification?: string }
type NewEvaluation = Omit<EvaluationRecord, 'id' | 'status' | 'result' | 'submittedDate' | 'reviewedDate' | 'testsCompleted' | 'testsTotal'> & { testsTotal?: number }
type NewUser = Omit<UserRecord, 'id' | 'lastActivity' | 'assignedEvaluations'>

interface AppDataContextValue {
  data: AppData
  addInstrument: (instrument: NewInstrument) => string
  updateInstrument: (id: string, changes: Partial<Instrument>) => void
  addEvaluation: (evaluation: NewEvaluation) => string
  updateEvaluation: (id: string, changes: Partial<EvaluationRecord>) => void
  addUser: (user: NewUser) => string
  updateUser: (id: string, changes: Partial<UserRecord>) => void
  saveMeasurements: (evaluationId: string, changes: Partial<EvaluationMeasurements>) => void
  updateRule: (category: string, changes: Partial<OimlRuleCategory>) => void
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

function seedMeasurements(): Record<string, EvaluationMeasurements> {
  return {
    'EV-2026-0138': {
      weighing: weighingPerformanceObservations,
      repeatability: repeatabilityReadings,
      eccentric: eccentricLoadingReadings,
      other: [
        { name: 'Discrimination Test', status: 'Not Started', note: '' },
        { name: 'Tare Balance Effect', status: 'Not Started', note: '' },
        { name: 'Temperature Variation', status: 'Not Started', note: '' },
      ],
      repeatabilityLoad: '2.000 kg',
      repeatabilityMpe: '±0.005 kg',
    eccentricLoad: '2.000 kg',
    attachments: [],
    },
  }
}

function seedData(): AppData {
  return {
    instruments,
    evaluations: allEvaluations,
    users: usersList,
    notifications,
    activity: adminRecentActivity,
    auditLog: seedAuditLog,
    measurements: seedMeasurements(),
    rules: oimlRuleCategories,
  }
}

function readData(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<AppData>
      if (Array.isArray(parsed.instruments) && Array.isArray(parsed.evaluations) && Array.isArray(parsed.users)) {
        const seeded = seedData()
        return { ...seeded, ...parsed }
      }
    }
  } catch {
    // Start from demo records when browser storage is unavailable or invalid.
  }
  return seedData()
}

function nextId(prefix: string, rows: { id: string }[]): string {
  const max = rows.reduce((value, row) => {
    const match = row.id.match(/(\d+)$/)
    return Math.max(value, match ? Number(match[1]) : 0)
  }, 0)
  return `${prefix}${String(max + 1).padStart(4, '0')}`
}

function makeAudit(action: string, reference: string): AuditLogRow {
  const date = new Date()
  const timestamp = `${date.toISOString().slice(0, 10)} ${date.toTimeString().slice(0, 5)}`
  return { timestamp, user: 'Current user', role: 'Workspace', action, reference }
}

function makeActivity(title: string, reference: string, type: ActivityItem['type'] = 'created'): ActivityItem {
  return {
    id: `ACT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title,
    reference,
    actor: 'Current user',
    timestamp: `Today, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
  }
}

function makeNotification(title: string, detail: string): Notification {
  return { id: `NOTIF-${Date.now()}`, title, detail, timestamp: 'Just now', read: false }
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(readData)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // The workspace remains usable for this session without persistence.
    }
  }, [data])

  const value = useMemo<AppDataContextValue>(() => ({
    data,
    addInstrument: (draft) => {
      const id = nextId('INST-', data.instruments)
      const instrument: Instrument = {
        ...draft,
        id,
        lastEvaluation: null,
        nextVerification: draft.nextVerification || `${new Date().getFullYear() + 1}-${new Date().toISOString().slice(5, 10)}`,
      }
      const activity = makeActivity('Instrument registered', `${id} · ${instrument.manufacturer} ${instrument.model}`)
      setData((current) => ({ ...current, instruments: [instrument, ...current.instruments], activity: [activity, ...current.activity], auditLog: [makeAudit('Registered instrument', id), ...current.auditLog] }))
      return id
    },
    updateInstrument: (id, changes) => setData((current) => ({
      ...current,
      instruments: current.instruments.map((row) => row.id === id ? { ...row, ...changes } : row),
      evaluations: current.evaluations.map((row) => row.instrumentId !== id ? row : {
        ...row,
        instrumentSerial: changes.serial ?? row.instrumentSerial,
        instrumentType: changes.type ?? row.instrumentType,
        manufacturer: changes.manufacturer ?? row.manufacturer,
        model: changes.model ?? row.model,
        lab: changes.lab ?? row.lab,
      }),
      activity: [makeActivity('Instrument updated', id), ...current.activity],
      auditLog: [makeAudit('Updated instrument', id), ...current.auditLog],
    })),
    addEvaluation: (draft) => {
      const id = nextId(`EV-${new Date().getFullYear()}-`, data.evaluations)
      const evaluation: EvaluationRecord = {
        ...draft,
        id,
        status: 'Assigned',
        result: 'NOT TESTED',
        submittedDate: null,
        reviewedDate: null,
        testsCompleted: 0,
        testsTotal: draft.testsTotal ?? 7,
      }
      const activity = makeActivity('Evaluation created and assigned', `${id} · ${evaluation.model}`, 'assigned')
      setData((current) => ({ ...current, evaluations: [evaluation, ...current.evaluations], activity: [activity, ...current.activity], auditLog: [makeAudit('Created evaluation', id), ...current.auditLog] }))
      return id
    },
    updateEvaluation: (id, changes) => setData((current) => {
      const previous = current.evaluations.find((row) => row.id === id)
      if (!previous) return current
      const updated = { ...previous, ...changes }
      const action = changes.status && changes.status !== previous.status ? `Evaluation ${changes.status.toLowerCase()}` : 'Evaluation updated'
      const activity = makeActivity(action, `${id} · ${updated.model}`, changes.status === 'Approved' ? 'approved' : changes.status === 'Submitted' ? 'submitted' : 'assigned')
      const notification = changes.status && changes.status !== previous.status ? makeNotification(action, `${id} · ${updated.model}`) : null
      return {
        ...current,
        evaluations: current.evaluations.map((row) => row.id === id ? updated : row),
        activity: [activity, ...current.activity],
        auditLog: [makeAudit(action, id), ...current.auditLog],
        notifications: notification ? [notification, ...current.notifications] : current.notifications,
      }
    }),
    addUser: (draft) => {
      const id = nextId('USR-', data.users)
      const user: UserRecord = { ...draft, id, lastActivity: 'Just now', assignedEvaluations: 0 }
      setData((current) => ({ ...current, users: [user, ...current.users], activity: [makeActivity('User added', `${user.name} · ${user.role}`), ...current.activity], auditLog: [makeAudit('Added user', id), ...current.auditLog] }))
      return id
    },
    updateUser: (id, changes) => setData((current) => ({
      ...current,
      users: current.users.map((row) => row.id === id ? { ...row, ...changes } : row),
      activity: [makeActivity('User record updated', id), ...current.activity],
      auditLog: [makeAudit('Updated user', id), ...current.auditLog],
    })),
    saveMeasurements: (evaluationId, changes) => setData((current) => {
      const prior = getEvaluationMeasurements(current, evaluationId)
      const measurements = { ...prior, ...changes }
      const completedCategories = Number(measurements.weighing.every((row) => row.result !== 'NOT TESTED'))
        + Number(measurements.repeatability.every((row) => row.reading !== '—' && row.reading.trim() !== '') && !!measurements.repeatabilityMpe)
        + Number(measurements.eccentric.every((row) => row.result !== 'NOT TESTED'))
        + measurements.other.filter((row) => row.status !== 'Not Started').length
      const evaluation = current.evaluations.find((row) => row.id === evaluationId)
      const conditionsRecorded = Boolean(evaluation?.temperature && evaluation.relativeHumidity && evaluation.atmosphericPressure && evaluation.referenceStandards)
      return {
        ...current,
        measurements: { ...current.measurements, [evaluationId]: measurements },
        evaluations: current.evaluations.map((row) => row.id === evaluationId ? { ...row, testsCompleted: Math.max(row.testsCompleted, Math.min(row.testsTotal, completedCategories + Number(conditionsRecorded))) } : row),
        activity: [makeActivity('Test measurements saved', evaluationId, 'submitted'), ...current.activity],
        auditLog: [makeAudit('Saved test measurements', evaluationId), ...current.auditLog],
      }
    }),
    updateRule: (category, changes) => setData((current) => ({
      ...current,
      rules: current.rules.map((row) => row.category === category ? { ...row, ...changes } : row),
      auditLog: [makeAudit('Updated OIML rule', category), ...current.auditLog],
    })),
  }), [data])

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData(): AppDataContextValue {
  const value = useContext(AppDataContext)
  if (!value) throw new Error('useAppData must be used within AppDataProvider')
  return value
}
