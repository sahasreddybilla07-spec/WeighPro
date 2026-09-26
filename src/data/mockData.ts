// Realistic mock data for the WeighMetric role-based dashboards.
// Kept separate from UI components so it can be swapped for live API data later.
// Numbers are cross-consistent: lab-level rows sum to the admin's system-wide metrics.

export interface Instrument {
  id: string
  serial: string
  manufacturer: string
  manufacturerAddress?: string
  model: string
  type: string
  status: 'Active' | 'Under Testing' | 'Due for Verification' | 'Decommissioned'
  capacity: string
  scaleInterval: string
  accuracyClass: string
  location: string
  lab: string
  owner: string
  registrationDate: string
  lastEvaluation: string | null
  nextVerification: string
  documents?: string[]
}

export const instruments: Instrument[] = [
  { id: 'INST-0031', serial: 'NW-22914', manufacturer: 'Avery Weigh-Tronix', model: 'ABC-100', type: 'Electronic Platform Scale', status: 'Active', capacity: '150 kg', scaleInterval: 'e = 0.05 kg', accuracyClass: 'Class III', location: 'Bay 2, Testing Floor', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Sri Ganesh Traders', registrationDate: '2024-02-11', lastEvaluation: '2026-09-22', nextVerification: '2027-02-11' },
  { id: 'INST-0032', serial: 'NW-23108', manufacturer: 'Precia Molen', model: 'PS-60', type: 'Industrial Bench Scale', status: 'Active', capacity: '60 kg', scaleInterval: 'e = 0.02 kg', accuracyClass: 'Class III', location: 'Bay 1, Testing Floor', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Bharat Logistics Pvt. Ltd.', registrationDate: '2023-11-04', lastEvaluation: '2026-09-21', nextVerification: '2026-11-04' },
  { id: 'INST-0033', serial: 'NW-21876', manufacturer: 'Essae Digitronics', model: 'DS-852', type: 'Retail Counter Scale', status: 'Under Testing', capacity: '30 kg', scaleInterval: 'e = 0.01 kg', accuracyClass: 'Class II', location: 'Bay 3, Testing Floor', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Fresh Mart Supermarket', registrationDate: '2024-05-19', lastEvaluation: '2026-09-20', nextVerification: '2026-11-19' },
  { id: 'INST-0034', serial: 'NW-23350', manufacturer: 'Mettler Toledo', model: 'IND236', type: 'Precision Balance', status: 'Active', capacity: '6 kg', scaleInterval: 'e = 0.001 kg', accuracyClass: 'Class I', location: 'Precision Lab, Room 4', lab: 'National Test House, Kolkata', owner: 'Konark Pharma Ltd.', registrationDate: '2023-08-22', lastEvaluation: '2026-09-19', nextVerification: '2026-12-22' },
  { id: 'INST-0035', serial: 'NW-20044', manufacturer: 'Contech Instruments', model: 'CT-100', type: 'Weighbridge', status: 'Active', capacity: '60,000 kg', scaleInterval: 'e = 20 kg', accuracyClass: 'Class III', location: 'Weighbridge Yard, Sector 4', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Highway Freight Carriers', registrationDate: '2022-06-30', lastEvaluation: '2026-09-15', nextVerification: '2026-12-30' },
  { id: 'INST-0036', serial: 'NW-22590', manufacturer: 'Sartorius', model: 'Combics CIS1', type: 'Precision Balance', status: 'Under Testing', capacity: '3 kg', scaleInterval: 'e = 0.0005 kg', accuracyClass: 'Class I', location: 'Precision Lab, Room 2', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Nova Diagnostics Pvt. Ltd.', registrationDate: '2024-01-15', lastEvaluation: null, nextVerification: '2027-01-15' },
  { id: 'INST-0037', serial: 'NW-24012', manufacturer: 'Radwag', model: 'WPT 60', type: 'Weighbridge', status: 'Due for Verification', capacity: '40,000 kg', scaleInterval: 'e = 10 kg', accuracyClass: 'Class III', location: 'Weighbridge Yard, Sector 2', lab: 'State Reference Standards Laboratory, Pune', owner: 'Deccan Warehousing Corp.', registrationDate: '2021-09-10', lastEvaluation: '2026-06-30', nextVerification: '2026-09-30' },
  { id: 'INST-0038', serial: 'NW-24107', manufacturer: 'Aczet', model: 'CTG 302', type: 'Precision Balance', status: 'Due for Verification', capacity: '320 g', scaleInterval: 'e = 0.001 g', accuracyClass: 'Class I', location: 'Precision Lab, Room 1', lab: 'Regional Reference Standards Laboratory, Bengaluru', owner: 'Sunrise Analytical Labs', registrationDate: '2022-03-02', lastEvaluation: '2026-06-15', nextVerification: '2026-09-28' },
  { id: 'INST-0039', serial: 'NW-24188', manufacturer: 'CAS Corporation', model: 'SW-05', type: 'Retail Counter Scale', status: 'Active', capacity: '15 kg', scaleInterval: 'e = 0.005 kg', accuracyClass: 'Class II', location: 'Bay 2, Testing Floor', lab: 'National Test House, Kolkata', owner: 'City Grocers Cooperative', registrationDate: '2024-07-08', lastEvaluation: '2026-08-30', nextVerification: '2027-07-08' },
  { id: 'INST-0040', serial: 'NW-24221', manufacturer: 'Toledo', model: 'Panther Plus', type: 'Electronic Platform Scale', status: 'Decommissioned', capacity: '300 kg', scaleInterval: 'e = 0.1 kg', accuracyClass: 'Class III', location: 'Storage, Bay 5', lab: 'Legal Metrology Laboratory, Chennai', owner: 'Coastal Shipping Agency', registrationDate: '2019-04-17', lastEvaluation: '2025-04-02', nextVerification: '2025-10-02' },
]

export interface Notification {
  id: string
  title: string
  detail: string
  timestamp: string
  read: boolean
}

export const notifications: Notification[] = [
  { id: 'NOTIF-1', title: 'Correction requested', detail: 'EV-2026-0141 · Essae Digitronics DS-852', timestamp: '18 min ago', read: false },
  { id: 'NOTIF-2', title: 'Evaluation approved', detail: 'EV-2026-0139 · Mettler Toledo IND236', timestamp: '2 hours ago', read: false },
  { id: 'NOTIF-3', title: 'Report generated', detail: 'EV-2026-0139 · ready for download', timestamp: '2 hours ago', read: false },
  { id: 'NOTIF-4', title: 'Legal reviewer assigned', detail: 'EV-2026-0142 · Suresh Menon', timestamp: 'Yesterday', read: true },
]

export interface ActivityItem {
  id: string
  type: 'created' | 'submitted' | 'assigned' | 'approved' | 'correction' | 'report'
  title: string
  reference: string
  actor: string
  timestamp: string
}

// ============================================================
// SYSTEM ADMIN
// ============================================================

export const adminMetrics = {
  totalLabs: 5,
  totalUsers: 68,
  totalInstruments: 128,
  activeEvaluations: 34,
  pendingReviews: 19,
  completedEvaluations: 342,
}

export const adminPipeline = [
  { label: 'Draft', count: 12, color: '#C2CDD1' },
  { label: 'Testing', count: 22, color: '#245A73' },
  { label: 'Submitted', count: 16, color: '#16A6B6' },
  { label: 'Under Review', count: 19, color: '#C58B2A' },
  { label: 'Approved', count: 27, color: '#23845A' },
  { label: 'Completed', count: 24, color: '#173B4D' },
]

export interface LabOverviewRow {
  lab: string
  activeTests: number
  pendingReviews: number
  completed: number
  status: 'Active' | 'Maintenance'
}

export const laboratoryOverview: LabOverviewRow[] = [
  { lab: 'Regional Reference Standards Laboratory, Bengaluru', activeTests: 14, pendingReviews: 5, completed: 96, status: 'Active' },
  { lab: 'National Test House, Kolkata', activeTests: 9, pendingReviews: 8, completed: 74, status: 'Active' },
  { lab: 'State Reference Standards Laboratory, Pune', activeTests: 6, pendingReviews: 3, completed: 61, status: 'Active' },
  { lab: 'Legal Metrology Laboratory, Chennai', activeTests: 3, pendingReviews: 2, completed: 45, status: 'Maintenance' },
  { lab: 'Regional Reference Standards Laboratory, Faridabad', activeTests: 2, pendingReviews: 1, completed: 66, status: 'Active' },
]

export const userOverview = {
  activeUsers: 68,
  testers: 42,
  reviewers: 18,
  labManagers: 5,
}

export interface AlertItem {
  id: string
  title: string
  description: string
  urgency: 'overdue' | 'due-today' | 'attention'
  kind: 'correction' | 'review' | 'report' | 'data'
}

export const systemAlerts: AlertItem[] = [
  {
    id: 'ALERT-1',
    title: 'Review backlog at National Test House, Kolkata',
    description: 'Pending reviews have exceeded the 7-day SLA for 8 evaluations.',
    urgency: 'overdue',
    kind: 'review',
  },
  {
    id: 'ALERT-2',
    title: '3 instruments overdue for re-verification',
    description: 'Verification scale interval expired across Bengaluru and Pune laboratories.',
    urgency: 'attention',
    kind: 'data',
  },
  {
    id: 'ALERT-3',
    title: 'Legal Metrology Laboratory, Chennai — sync delayed',
    description: 'Evaluation data has not synced with the central repository in 6 hours.',
    urgency: 'due-today',
    kind: 'correction',
  },
]

export const adminRecentActivity: ActivityItem[] = [
  { id: 'AD-1', type: 'report', title: 'Report generated', reference: 'EV-2026-0139 · Mettler Toledo IND236', actor: 'Suresh Menon', timestamp: 'Today, 09:42 AM' },
  { id: 'AD-2', type: 'approved', title: 'Evaluation approved', reference: 'EV-2026-0139 · Mettler Toledo IND236', actor: 'Suresh Menon', timestamp: 'Today, 09:10 AM' },
  { id: 'AD-3', type: 'correction', title: 'Correction requested', reference: 'EV-2026-0141 · Essae Digitronics DS-852', actor: 'Arjun Rao', timestamp: 'Yesterday, 5:52 PM' },
  { id: 'AD-4', type: 'created', title: 'New instrument registered', reference: 'NW-23412 · Radwag WPT 60', actor: 'Priya Desai', timestamp: 'Yesterday, 1:05 PM' },
]

// ============================================================
// LAB MANAGER  (Regional Reference Standards Laboratory, Bengaluru)
// ============================================================

export const managerMetrics = {
  labInstruments: 34,
  activeEvaluations: 14,
  pendingReviews: 5,
  completedTests: 96,
  passed: 88,
  failed: 8,
}

export const managerPipeline = [
  { label: 'Assigned', count: 5, color: '#C2CDD1' },
  { label: 'Testing', count: 4, color: '#245A73' },
  { label: 'Submitted', count: 3, color: '#16A6B6' },
  { label: 'Under Review', count: 2, color: '#C58B2A' },
  { label: 'Approved', count: 9, color: '#23845A' },
]

export interface TesterWorkloadRow {
  tester: string
  assigned: number
  inProgress: number
  completed: number
}

export const testerWorkload: TesterWorkloadRow[] = [
  { tester: 'Ananya Sharma', assigned: 1, inProgress: 1, completed: 23 },
  { tester: 'Rohit Verma', assigned: 2, inProgress: 1, completed: 19 },
  { tester: 'Divya Nair', assigned: 1, inProgress: 1, completed: 21 },
  { tester: 'Karthik Iyer', assigned: 1, inProgress: 1, completed: 17 },
  { tester: 'Meera Pillai', assigned: 0, inProgress: 0, completed: 16 },
]

export const instrumentStatusSummary = {
  active: 27,
  underTesting: 5,
  dueForVerification: 2,
}

// ============================================================
// SHARED: pending review queue (Lab Manager's Review Queue +
// Legal Reviewer's Pending Review Queue are the same underlying data)
// ============================================================

export interface PendingReviewRow {
  evaluationId: string
  instrument: string
  tester: string
  submitted: string
  result: 'PASS' | 'FAIL'
}

export const pendingReviewQueue: PendingReviewRow[] = [
  { evaluationId: 'EV-2026-0142', instrument: 'Electronic Platform Scale · ABC-100', tester: 'Ananya Sharma', submitted: '2026-09-22', result: 'PASS' },
  { evaluationId: 'EV-2026-0141', instrument: 'Retail Counter Scale · DS-852', tester: 'Divya Nair', submitted: '2026-09-21', result: 'FAIL' },
  { evaluationId: 'EV-2026-0139', instrument: 'Precision Balance · IND236', tester: 'Karthik Iyer', submitted: '2026-09-19', result: 'PASS' },
  { evaluationId: 'EV-2026-0137', instrument: 'Industrial Bench Scale · PS-60', tester: 'Rohit Verma', submitted: '2026-09-17', result: 'PASS' },
  { evaluationId: 'EV-2026-0135', instrument: 'Weighbridge · CT-100', tester: 'Meera Pillai', submitted: '2026-09-15', result: 'PASS' },
]

// ============================================================
// TESTER  (Ananya Sharma)
// ============================================================

export const testerMetrics = {
  assigned: 1,
  inProgress: 1,
  pendingSubmission: 1,
  completed: 23,
}

export interface MyEvaluationRow {
  evaluationId: string
  instrument: string
  progress: string
  progressFraction: number
  status: string
}

export const myEvaluations: MyEvaluationRow[] = [
  { evaluationId: 'EV-2026-0140', instrument: 'Weighbridge · CT-100', progress: '7 / 7 tests', progressFraction: 1, status: 'Draft' },
  { evaluationId: 'EV-2026-0138', instrument: 'Precision Balance · Combics CIS1', progress: '4 / 7 tests', progressFraction: 4 / 7, status: 'Testing' },
  { evaluationId: 'EV-2026-0134', instrument: 'Weighbridge · CT-100', progress: '0 / 7 tests', progressFraction: 0, status: 'Assigned' },
  { evaluationId: 'EV-2026-0129', instrument: 'Retail Counter Scale · DS-852', progress: '7 / 7 tests', progressFraction: 1, status: 'Correction Required' },
  { evaluationId: 'EV-2026-0121', instrument: 'Electronic Platform Scale · ABC-100', progress: '7 / 7 tests', progressFraction: 1, status: 'Approved' },
]

export const testingWorkflowSteps = [
  'Instrument',
  'Lab Conditions',
  'Weighing Performance',
  'Repeatability',
  'Eccentric Loading',
  'Other Tests',
  'Results',
  'Submit',
]
export const testingWorkflowCurrentIndex = 4 // currently at Eccentric Loading, for EV-2026-0138

export const testerNotifications: Notification[] = [
  { id: 'TN-1', title: 'Correction requested', detail: 'EV-2026-0129 · Retail Counter Scale DS-852', timestamp: '2 hours ago', read: false },
  { id: 'TN-2', title: 'Evaluation approved', detail: 'EV-2026-0121 · Electronic Platform Scale ABC-100', timestamp: 'Yesterday', read: false },
  { id: 'TN-3', title: 'Legal reviewer assigned', detail: 'EV-2026-0140 · Suresh Menon', timestamp: '2 days ago', read: true },
]

// ============================================================
// REVIEWER  (Suresh Menon)
// ============================================================

export const reviewerMetrics = {
  pendingReviews: 5,
  dueToday: 2,
  returned: 9,
  approved: 58,
  failed: 7,
}

export const reviewWorkflowSteps = ['Submitted', 'Under Review', 'Correction / Approved', 'Report Generated']
export const reviewWorkflowCurrentIndex = 1

export const complianceSummary = {
  pass: 58,
  fail: 7,
  correctionRequired: 9,
}

export const recentDecisions: ActivityItem[] = [
  { id: 'RD-1', type: 'approved', title: 'Evaluation approved', reference: 'EV-2026-0139 · Mettler Toledo IND236', actor: 'Suresh Menon', timestamp: 'Today, 10:15 AM' },
  { id: 'RD-2', type: 'correction', title: 'Correction requested', reference: 'EV-2026-0141 · Essae Digitronics DS-852', actor: 'Suresh Menon', timestamp: 'Yesterday, 4:40 PM' },
  { id: 'RD-3', type: 'approved', title: 'Evaluation approved', reference: 'EV-2026-0136 · Contech Instruments CT-100', actor: 'Suresh Menon', timestamp: 'Yesterday, 2:10 PM' },
  { id: 'RD-4', type: 'report', title: 'Report generated', reference: 'EV-2026-0136 · Contech Instruments CT-100', actor: 'Suresh Menon', timestamp: 'Yesterday, 2:12 PM' },
]

// ============================================================
// MASTER EVALUATION RECORDS
// Backing data for the Evaluations, Instrument History, Reports
// and Review Evaluation pages. Realistic and internally consistent;
// not reconciled unit-for-unit against the dashboard summary cards
// above (those are independent, hand-tuned aggregates).
// ============================================================

export type EvaluationStatus =
  | 'Draft'
  | 'Assigned'
  | 'Testing'
  | 'Submitted'
  | 'Under Review'
  | 'Correction Required'
  | 'Approved'
  | 'Completed'

export type EvaluationResult = 'PASS' | 'FAIL' | 'PENDING' | 'NOT TESTED'

export interface EvaluationRecord {
  id: string
  instrumentId: string
  instrumentSerial: string
  instrumentType: string
  manufacturer: string
  model: string
  lab: string
  tester: string
  reviewer: string
  status: EvaluationStatus
  result: EvaluationResult
  createdDate: string
  submittedDate: string | null
  reviewedDate: string | null
  testsCompleted: number
  testsTotal: number
  purpose?: string
  applicant?: string
  testDate?: string
  temperature?: string
  relativeHumidity?: string
  atmosphericPressure?: string
  referenceStandards?: string
  reviewerComments?: string
  director?: string
}

export const allEvaluations: EvaluationRecord[] = [
  { id: 'EV-2026-0142', instrumentId: 'INST-0031', instrumentSerial: 'NW-22914', instrumentType: 'Electronic Platform Scale', manufacturer: 'Avery Weigh-Tronix', model: 'ABC-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Under Review', result: 'PASS', createdDate: '2026-09-18', submittedDate: '2026-09-22', reviewedDate: null, testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0141', instrumentId: 'INST-0033', instrumentSerial: 'NW-21876', instrumentType: 'Retail Counter Scale', manufacturer: 'Essae Digitronics', model: 'DS-852', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Divya Nair', reviewer: 'Suresh Menon', status: 'Correction Required', result: 'FAIL', createdDate: '2026-09-16', submittedDate: '2026-09-21', reviewedDate: '2026-09-22', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0140', instrumentId: 'INST-0035', instrumentSerial: 'NW-20044', instrumentType: 'Weighbridge', manufacturer: 'Contech Instruments', model: 'CT-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Draft', result: 'NOT TESTED', createdDate: '2026-09-20', submittedDate: null, reviewedDate: null, testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0139', instrumentId: 'INST-0034', instrumentSerial: 'NW-23350', instrumentType: 'Precision Balance', manufacturer: 'Mettler Toledo', model: 'IND236', lab: 'National Test House, Kolkata', tester: 'Karthik Iyer', reviewer: 'Suresh Menon', status: 'Approved', result: 'PASS', createdDate: '2026-09-14', submittedDate: '2026-09-19', reviewedDate: '2026-09-23', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0138', instrumentId: 'INST-0036', instrumentSerial: 'NW-22590', instrumentType: 'Precision Balance', manufacturer: 'Sartorius', model: 'Combics CIS1', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Testing', result: 'PENDING', createdDate: '2026-09-19', submittedDate: null, reviewedDate: null, testsCompleted: 4, testsTotal: 7 },
  { id: 'EV-2026-0137', instrumentId: 'INST-0032', instrumentSerial: 'NW-23108', instrumentType: 'Industrial Bench Scale', manufacturer: 'Precia Molen', model: 'PS-60', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Rohit Verma', reviewer: 'Arjun Rao', status: 'Under Review', result: 'PASS', createdDate: '2026-09-12', submittedDate: '2026-09-17', reviewedDate: null, testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0136', instrumentId: 'INST-0035', instrumentSerial: 'NW-20044', instrumentType: 'Weighbridge', manufacturer: 'Contech Instruments', model: 'CT-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Meera Pillai', reviewer: 'Suresh Menon', status: 'Completed', result: 'PASS', createdDate: '2026-09-10', submittedDate: '2026-09-14', reviewedDate: '2026-09-15', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0135', instrumentId: 'INST-0035', instrumentSerial: 'NW-20044', instrumentType: 'Weighbridge', manufacturer: 'Contech Instruments', model: 'CT-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Meera Pillai', reviewer: 'Arjun Rao', status: 'Under Review', result: 'PASS', createdDate: '2026-09-09', submittedDate: '2026-09-15', reviewedDate: null, testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0134', instrumentId: 'INST-0035', instrumentSerial: 'NW-20044', instrumentType: 'Weighbridge', manufacturer: 'Contech Instruments', model: 'CT-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Assigned', result: 'NOT TESTED', createdDate: '2026-09-21', submittedDate: null, reviewedDate: null, testsCompleted: 0, testsTotal: 7 },
  { id: 'EV-2026-0129', instrumentId: 'INST-0033', instrumentSerial: 'NW-21876', instrumentType: 'Retail Counter Scale', manufacturer: 'Essae Digitronics', model: 'DS-852', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Correction Required', result: 'FAIL', createdDate: '2026-08-28', submittedDate: '2026-09-02', reviewedDate: '2026-09-04', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0121', instrumentId: 'INST-0031', instrumentSerial: 'NW-22914', instrumentType: 'Electronic Platform Scale', manufacturer: 'Avery Weigh-Tronix', model: 'ABC-100', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Ananya Sharma', reviewer: 'Suresh Menon', status: 'Approved', result: 'PASS', createdDate: '2026-08-10', submittedDate: '2026-08-14', reviewedDate: '2026-08-16', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0118', instrumentId: 'INST-0037', instrumentSerial: 'NW-24012', instrumentType: 'Weighbridge', manufacturer: 'Radwag', model: 'WPT 60', lab: 'State Reference Standards Laboratory, Pune', tester: 'Rohit Verma', reviewer: 'Arjun Rao', status: 'Completed', result: 'PASS', createdDate: '2026-06-25', submittedDate: '2026-06-29', reviewedDate: '2026-06-30', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0112', instrumentId: 'INST-0038', instrumentSerial: 'NW-24107', instrumentType: 'Precision Balance', manufacturer: 'Aczet', model: 'CTG 302', lab: 'Regional Reference Standards Laboratory, Bengaluru', tester: 'Karthik Iyer', reviewer: 'Suresh Menon', status: 'Completed', result: 'FAIL', createdDate: '2026-06-10', submittedDate: '2026-06-14', reviewedDate: '2026-06-15', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0105', instrumentId: 'INST-0039', instrumentSerial: 'NW-24188', instrumentType: 'Retail Counter Scale', manufacturer: 'CAS Corporation', model: 'SW-05', lab: 'National Test House, Kolkata', tester: 'Divya Nair', reviewer: 'Arjun Rao', status: 'Completed', result: 'PASS', createdDate: '2026-08-26', submittedDate: '2026-08-29', reviewedDate: '2026-08-30', testsCompleted: 7, testsTotal: 7 },
  { id: 'EV-2026-0098', instrumentId: 'INST-0040', instrumentSerial: 'NW-24221', instrumentType: 'Electronic Platform Scale', manufacturer: 'Toledo', model: 'Panther Plus', lab: 'Legal Metrology Laboratory, Chennai', tester: 'Meera Pillai', reviewer: 'Suresh Menon', status: 'Completed', result: 'PASS', createdDate: '2025-03-28', submittedDate: '2025-04-01', reviewedDate: '2025-04-02', testsCompleted: 7, testsTotal: 7 },
]

// ============================================================
// USERS  (Director / Lab Manager module)
// ============================================================

export interface UserRecord {
  id: string
  name: string
  role: 'Director' | 'Lab Manager' | 'Testing Technician' | 'Legal Reviewer'
  laboratory: string
  status: 'Active' | 'Inactive'
  lastActivity: string
  assignedEvaluations: number
}

export const usersList: UserRecord[] = [
  { id: 'USR-001', name: 'Rajesh Kulkarni', role: 'Director', laboratory: 'Legal Metrology Division, DoCA', status: 'Active', lastActivity: 'Today, 09:15 AM', assignedEvaluations: 0 },
  { id: 'USR-002', name: 'Priya Desai', role: 'Lab Manager', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: 'Today, 08:50 AM', assignedEvaluations: 0 },
  { id: 'USR-003', name: 'Vikram Nath', role: 'Lab Manager', laboratory: 'National Test House, Kolkata', status: 'Active', lastActivity: 'Yesterday, 4:30 PM', assignedEvaluations: 0 },
  { id: 'USR-004', name: 'Sunita Rao', role: 'Lab Manager', laboratory: 'State Reference Standards Laboratory, Pune', status: 'Active', lastActivity: '2 days ago', assignedEvaluations: 0 },
  { id: 'USR-005', name: 'Farida Sheikh', role: 'Lab Manager', laboratory: 'Legal Metrology Laboratory, Chennai', status: 'Inactive', lastActivity: '3 weeks ago', assignedEvaluations: 0 },
  { id: 'USR-006', name: 'Ananya Sharma', role: 'Testing Technician', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: 'Today, 09:40 AM', assignedEvaluations: 3 },
  { id: 'USR-007', name: 'Rohit Verma', role: 'Testing Technician', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: 'Today, 08:05 AM', assignedEvaluations: 3 },
  { id: 'USR-008', name: 'Divya Nair', role: 'Testing Technician', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: 'Yesterday, 5:52 PM', assignedEvaluations: 2 },
  { id: 'USR-009', name: 'Karthik Iyer', role: 'Testing Technician', laboratory: 'National Test House, Kolkata', status: 'Active', lastActivity: 'Yesterday, 3:20 PM', assignedEvaluations: 2 },
  { id: 'USR-010', name: 'Meera Pillai', role: 'Testing Technician', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: '2 days ago', assignedEvaluations: 0 },
  { id: 'USR-011', name: 'Suresh Menon', role: 'Legal Reviewer', laboratory: 'Regional Reference Standards Laboratory, Bengaluru', status: 'Active', lastActivity: 'Today, 10:15 AM', assignedEvaluations: 5 },
  { id: 'USR-012', name: 'Arjun Rao', role: 'Legal Reviewer', laboratory: 'State Reference Standards Laboratory, Pune', status: 'Active', lastActivity: 'Yesterday, 5:52 PM', assignedEvaluations: 3 },
  { id: 'USR-013', name: 'Kavita Rangan', role: 'Legal Reviewer', laboratory: 'National Test House, Kolkata', status: 'Inactive', lastActivity: '1 month ago', assignedEvaluations: 0 },
]

// ============================================================
// REPORTS REPOSITORY
// ============================================================

export interface ReportRecord {
  reportId: string
  evaluationId: string
  instrument: string
  serial: string
  date: string
  result: 'PASS' | 'FAIL'
  reviewer: string
  status: 'Final' | 'Draft'
}

export const reportsList: ReportRecord[] = allEvaluations
  .filter((e) => e.status === 'Approved' || e.status === 'Completed')
  .map((e) => ({
    reportId: `RPT-${e.id.replace('EV-', '')}`,
    evaluationId: e.id,
    instrument: `${e.manufacturer} ${e.model}`,
    serial: e.instrumentSerial,
    date: e.reviewedDate ?? e.submittedDate ?? e.createdDate,
    result: (e.result === 'FAIL' ? 'FAIL' : 'PASS') as 'PASS' | 'FAIL',
    reviewer: e.reviewer,
    status: e.status === 'Completed' ? 'Final' : 'Draft',
  }))

// ============================================================
// OIML R-76 RULES REFERENCE
// ============================================================

export interface OimlRuleCategory {
  category: string
  description: string
  mpeReference: string
  status: 'Active' | 'Draft'
  version: string
  lastUpdated: string
}

export const oimlRuleCategories: OimlRuleCategory[] = [
  { category: 'Weighing Performance', description: 'Accuracy of indication across the weighing range under standard test loads.', mpeReference: 'See OIML R-76-1 §3.5 (Maximum Permissible Errors) — reference table not yet digitized.', status: 'Active', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2026-01-10' },
  { category: 'Repeatability', description: 'Consistency of indication across repeated applications of the same load.', mpeReference: 'See OIML R-76-1 §3.6.2 — reference table not yet digitized.', status: 'Active', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2026-01-10' },
  { category: 'Eccentric Loading', description: 'Error introduced when a load is applied off-center on the load-receiving element.', mpeReference: 'See OIML R-76-1 §3.6.3 — reference table not yet digitized.', status: 'Active', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2026-01-10' },
  { category: 'Discrimination', description: 'Ability of the instrument to detect small changes in load.', mpeReference: 'See OIML R-76-1 §3.7 — reference table not yet digitized.', status: 'Draft', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2025-11-02' },
  { category: 'Tare Balance Effect', description: 'Effect of the tare device on indication accuracy.', mpeReference: 'See OIML R-76-1 §4.2 — reference table not yet digitized.', status: 'Draft', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2025-11-02' },
  { category: 'Temperature Variation', description: 'Instrument stability across the rated operating temperature range.', mpeReference: 'See OIML R-76-1 §5.3 — reference table not yet digitized.', status: 'Draft', version: 'R-76-1:2006 (Rev. 2020)', lastUpdated: '2025-10-18' },
]

// ============================================================
// AUDIT HISTORY  (Director)
// ============================================================

export interface AuditLogRow {
  timestamp: string
  user: string
  role: string
  action: string
  reference: string
}

export const auditLog: AuditLogRow[] = [
  { timestamp: '2026-09-23 09:42', user: 'Suresh Menon', role: 'Legal Reviewer', action: 'Generated report', reference: 'EV-2026-0139' },
  { timestamp: '2026-09-23 09:10', user: 'Suresh Menon', role: 'Legal Reviewer', action: 'Approved evaluation', reference: 'EV-2026-0139' },
  { timestamp: '2026-09-22 17:52', user: 'Arjun Rao', role: 'Legal Reviewer', action: 'Requested correction', reference: 'EV-2026-0141' },
  { timestamp: '2026-09-22 13:05', user: 'Priya Desai', role: 'Lab Manager', action: 'Registered instrument', reference: 'INST-0037' },
  { timestamp: '2026-09-21 11:20', user: 'Priya Desai', role: 'Lab Manager', action: 'Assigned evaluation', reference: 'EV-2026-0134 → Ananya Sharma' },
  { timestamp: '2026-09-20 16:15', user: 'Divya Nair', role: 'Testing Technician', action: 'Submitted evaluation', reference: 'EV-2026-0141' },
  { timestamp: '2026-09-18 10:00', user: 'Rajesh Kulkarni', role: 'Director', action: 'Updated OIML rule version', reference: 'R-76-1:2006 (Rev. 2020)' },
  { timestamp: '2026-09-15 14:12', user: 'Meera Pillai', role: 'Testing Technician', action: 'Completed evaluation', reference: 'EV-2026-0136' },
]

// ============================================================
// TESTING WORKSPACE — sample observation data for EV-2026-0138
// (Sartorius Combics CIS1, in progress). Illustrative UI data only.
// ============================================================

export const weighingPerformanceObservations = [
  { testLoad: '0.5 kg', indicated: '0.502 kg', error: '+0.002 kg', mpe: '±0.003 kg', result: 'PASS' as const },
  { testLoad: '1.0 kg', indicated: '1.001 kg', error: '+0.001 kg', mpe: '±0.003 kg', result: 'PASS' as const },
  { testLoad: '1.5 kg', indicated: '1.503 kg', error: '+0.003 kg', mpe: '±0.005 kg', result: 'PASS' as const },
  { testLoad: '2.0 kg', indicated: '2.004 kg', error: '+0.004 kg', mpe: '±0.005 kg', result: 'PASS' as const },
  { testLoad: '2.5 kg', indicated: '—', error: '—', mpe: '±0.005 kg', result: 'NOT TESTED' as const },
  { testLoad: '3.0 kg', indicated: '—', error: '—', mpe: '±0.005 kg', result: 'NOT TESTED' as const },
]

export const repeatabilityReadings = [
  { rep: 1, reading: '2.001 kg', error: '+0.001 kg' },
  { rep: 2, reading: '2.002 kg', error: '+0.002 kg' },
  { rep: 3, reading: '2.000 kg', error: '0.000 kg' },
  { rep: 4, reading: '2.002 kg', error: '+0.002 kg' },
  { rep: 5, reading: '2.001 kg', error: '+0.001 kg' },
]

export const eccentricLoadingReadings = [
  { position: 'Center', reading: '2.001 kg', error: '+0.001 kg', mpe: '±0.005 kg', result: 'PASS' as const },
  { position: 'Front Left', reading: '2.006 kg', error: '+0.006 kg', mpe: '±0.010 kg', result: 'PASS' as const },
  { position: 'Front Right', reading: '2.005 kg', error: '+0.005 kg', mpe: '±0.010 kg', result: 'PASS' as const },
  { position: 'Rear Left', reading: '2.007 kg', error: '+0.007 kg', mpe: '±0.010 kg', result: 'PASS' as const },
  { position: 'Rear Right', reading: '—', error: '—', mpe: '±0.010 kg', result: 'NOT TESTED' as const },
]

export const otherTestCategories = [
  { name: 'Discrimination Test', status: 'Not Started' as const },
  { name: 'Tare Balance Effect', status: 'Not Started' as const },
  { name: 'Temperature Variation', status: 'Not Started' as const },
]
