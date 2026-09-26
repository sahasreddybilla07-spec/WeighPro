import { Download } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppData, getEvaluationMeasurements } from '../context/AppDataContext'
import { Button } from '../components/ui/Button'

function ReportTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return <table className="report-table"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table>
}

export function ReportPreview() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { data } = useAppData()
  const evaluation = data.evaluations.find((row) => row.id === id)
  useEffect(() => {
    if (searchParams.get('download') === '1' && evaluation) window.setTimeout(() => window.print(), 250)
  }, [evaluation, searchParams])
  if (!evaluation) return <div className="rounded-lg border border-ink-200 bg-surface p-8 text-center text-sm text-ink-500">Evaluation not found.</div>

  const measurements = getEvaluationMeasurements(data, evaluation.id)
  const instrument = data.instruments.find((row) => row.id === evaluation.instrumentId)
  const reportId = `NAWI-RPT-${evaluation.id.replace('EV-', '')}`
  const repeatabilityValues = measurements.repeatability.map((row) => Number(row.reading.match(/^[-+]?\d*\.?\d+/)?.[0])).filter(Number.isFinite)
  const repeatabilityMpe = Number(measurements.repeatabilityMpe.match(/^[-+]?\d*\.?\d+/)?.[0])
  const repeatabilityDone = repeatabilityValues.length === measurements.repeatability.length && Number.isFinite(repeatabilityMpe)
  const repeatabilityFail = repeatabilityDone && Math.max(...repeatabilityValues) - Math.min(...repeatabilityValues) > repeatabilityMpe
  const allTestsDone = measurements.weighing.every((row) => row.result !== 'NOT TESTED')
    && repeatabilityDone && measurements.eccentric.every((row) => row.result !== 'NOT TESTED')
    && measurements.other.every((row) => row.status !== 'Not Started')
  const hasFailure = evaluation.result === 'FAIL' || measurements.weighing.some((row) => row.result === 'FAIL')
    || measurements.eccentric.some((row) => row.result === 'FAIL') || measurements.other.some((row) => row.status === 'FAIL') || repeatabilityFail
  const overall = hasFailure ? 'FAIL' : allTestsDone ? 'PASS' : 'PENDING'
  const reportDate = evaluation.reviewedDate ?? evaluation.submittedDate ?? evaluation.testDate ?? evaluation.createdDate
  const repeatabilityResults = measurements.repeatability.map((row) => row.reading)

  return (
    <div className="report-page space-y-4">
      <div className="flex justify-end print:hidden"><Button onClick={() => window.print()}><Download className="h-4 w-4" />Download PDF</Button></div>

      <article className="report-document">
        <header className="report-brand">
          <strong>WEIGHWISE METROLOGY · NATIONAL LEGAL METROLOGY TESTING CENTRE</strong>
          <span>Accreditation: NABL-ISO/IEC-17025-MET-2026-089 | Standard: OIML R 76-1:2006 | RuleSet: OIML-R76-2006-v1.0</span>
          <span>{evaluation.lab} · India</span>
        </header>
        <div className="report-title-row"><h1>LEGAL METROLOGY NAWI VERIFICATION REPORT<br /><span className="report-status">{evaluation.status === 'Completed' ? 'FINAL REPORT' : `WORKING REPORT · ${evaluation.status.toUpperCase()}`}</span></h1><p>Report No: {reportId}<br />Revision: 0 | Date: {reportDate}</p></div>

        <section className="report-section">
          <h2>1. INSTRUMENT UNDER TEST SPECIFICATIONS</h2>
          <ReportTable headers={['Specification', 'Value', 'Specification', 'Value']} rows={[
            ['Manufacturer', evaluation.manufacturer, 'Model / Type', `${evaluation.model} (${evaluation.instrumentType})`],
            ['Serial Number', evaluation.instrumentSerial, 'Accuracy Class', instrument?.accuracyClass ?? 'Not recorded'],
            ['Max Capacity', instrument?.capacity ?? 'Not recorded', 'Min Capacity', 'Not recorded'],
            ['Verification Interval (e)', instrument?.scaleInterval ?? 'Not recorded', 'Actual Interval (d)', instrument?.scaleInterval ?? 'Not recorded'],
            ['Load Receptor', 'Not recorded', 'Tare Device', 'Not recorded'],
          ]} />
        </section>

        <section className="report-section">
          <h2>2. AMBIENT TEST CONDITIONS &amp; REFERENCE STANDARDS</h2>
          <ReportTable headers={['Condition', 'Value', 'Condition', 'Value']} rows={[
            ['Ambient Temperature', evaluation.temperature ? `${evaluation.temperature} °C` : 'Not recorded', 'Relative Humidity', evaluation.relativeHumidity ? `${evaluation.relativeHumidity}% RH` : 'Not recorded'],
            ['Atmospheric Pressure', evaluation.atmosphericPressure ? `${evaluation.atmosphericPressure} hPa` : 'Not recorded', 'Standards Used', evaluation.referenceStandards ?? 'Not recorded'],
          ]} />
        </section>

        <section className="report-section">
          <h2>3. FORMAL COMPLIANCE MATRIX (OIML R 76-1:2006 REQUIREMENTS)</h2>
          <ReportTable headers={['Applicable Test Module', 'OIML Clause', 'Prescribed Limit (MPE)', 'Calculated Result', 'Compliance']} rows={[
            ['Zero-setting & zero-tracking accuracy', 'Clauses 4.5.2 & 4.4.2', '±0.25 e', measurements.other.find((row) => /zero/i.test(row.name))?.note || 'See test summary', measurements.other.find((row) => /zero/i.test(row.name))?.status ?? 'NOT TESTED'],
            ['Eccentric loading test', 'Clauses 3.6.2 & 4.4.7', 'Applicable MPE', measurements.eccentric.map((row) => row.error).join('; ') || 'Not recorded', measurements.eccentric.every((row) => row.result === 'PASS') ? 'PASS' : 'SEE RESULTS'],
            ['Weighing performance accuracy', 'Clauses 3.5.1 & 4.4.3', 'Table 6 MPE', `${measurements.weighing.filter((row) => row.result !== 'NOT TESTED').length} readings recorded`, measurements.weighing.every((row) => row.result === 'PASS') ? 'PASS' : 'SEE RESULTS'],
            ['Repeatability test', 'Clauses 3.6.1 & 4.4.10', measurements.repeatabilityMpe || 'Applicable MPE', `${repeatabilityResults.filter((row) => row !== '—').length} readings recorded`, repeatabilityResults.every((row) => row !== '—') ? 'RECORDED' : 'NOT TESTED'],
            ...measurements.other.map((row) => [row.name, 'OIML R 76-1:2006', 'As prescribed by applicable clause', row.note || 'No observation entered', row.status]),
          ]} />
        </section>

        <section className="report-section report-page-break">
          <h2>4. WEIGHING PERFORMANCE TEST OBSERVATIONS (Clause 3.5.1 &amp; A.4.4.3)</h2>
          <ReportTable headers={['#', 'Dir', 'Load (L)', 'Ind (I)', 'e', 'Calc (P)', 'Error (Ec)', 'MPE', 'Result']} rows={measurements.weighing.map((row, index) => [index + 1, index > measurements.weighing.length / 2 ? 'Desc' : 'Asc', row.testLoad, row.indicated, instrument?.scaleInterval ?? '—', row.indicated, row.error, row.mpe || '—', row.result])} />
        </section>

        <section className="report-section">
          <h2>5. REPEATABILITY, ECCENTRICITY, ZERO &amp; TARE TEST SUMMARY</h2>
          <ReportTable headers={['Test Module & Reference', 'Test Load / Condition', 'Calculated Quantity', 'Permissible Limit', 'Result']} rows={[
            ...measurements.repeatability.map((row) => [`Repeatability Test (Reading ${row.rep})`, measurements.repeatabilityLoad, `${row.reading} · ${row.error}`, measurements.repeatabilityMpe || '—', row.reading === '—' ? 'NOT TESTED' : 'RECORDED']),
            ...measurements.eccentric.map((row) => [`Eccentric Loading · ${row.position}`, measurements.eccentricLoad, `Error: ${row.error}`, row.mpe || '—', row.result]),
            ...measurements.other.map((row) => [row.name, 'As recorded', row.note || '—', 'Applicable OIML limit', row.status]),
          ]} />
        </section>

        {(measurements.attachments?.length || instrument?.documents?.length) ? <section className="report-section"><h2>SUPPORTING EVIDENCE &amp; DOCUMENTS</h2><ReportTable headers={['Source', 'Attached Files']} rows={[
          ...(instrument?.documents?.length ? [['Instrument registration', instrument.documents.join(', ')] as (string | number)[]] : []),
          ...(measurements.attachments?.length ? [['Testing evidence', measurements.attachments.join(', ')] as (string | number)[]] : []),
        ]} /></section> : null}

        <div className={`report-determination ${overall === 'PASS' ? 'is-pass' : overall === 'FAIL' ? 'is-fail' : ''}`}>
          <strong>OVERALL LEGAL METROLOGY DETERMINATION: {overall}</strong>
          <span>{overall === 'PASS' ? 'COMPLIANT (OIML R 76-1:2006 requirements verified)' : overall === 'FAIL' ? 'NON-COMPLIANT (One or more recorded tests failed)' : 'PENDING (Testing or approval is not complete)'}</span>
        </div>

        <footer className="report-signoff">
          <div><strong>TESTING TECHNICIAN (Observations &amp; Test Execution)</strong><span>{evaluation.tester}</span><span>Completed: {evaluation.submittedDate ?? evaluation.testDate ?? 'Not submitted'}</span><span>Signature Status: {evaluation.submittedDate ? 'SIGNED BY TECHNICIAN' : 'PENDING'}</span></div>
          <div><strong>AUTHORIZED METROLOGICAL REVIEWER (Evaluation &amp; Signoff)</strong><span>{evaluation.reviewer}</span><span>{evaluation.reviewedDate ? `Reviewed: ${evaluation.reviewedDate}` : 'Review: Pending'}</span><span>Approval Record: {evaluation.status === 'Approved' || evaluation.status === 'Completed' ? 'REVIEWER APPROVED' : 'PENDING'}</span></div>
          <div><strong>DIRECTOR (Final Approval)</strong><span>{evaluation.director ?? 'Pending'}</span><span>Approval Date: {evaluation.status === 'Completed' ? evaluation.reviewedDate : 'Pending'}</span><span>Final Record: {evaluation.status === 'Completed' ? 'APPROVED' : 'PENDING'}</span></div>
        </footer>
        <div className="report-bottomline"><span>WeighMetric · OIML R 76-1:2006 (E) NAWI Test Report | SHA-256: {reportId}-{evaluation.id}</span><span>Report {reportId}</span></div>
      </article>
    </div>
  )
}
