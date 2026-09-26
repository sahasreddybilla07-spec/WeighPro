import { useAppData } from '../context/AppDataContext'
import { TableCard } from '../components/dashboard/shared/TableCard'

export function AuditHistory() {
  const { data } = useAppData()
  const auditLog = data.auditLog
  return (
    <div className="space-y-5">
      <TableCard title="Audit History" subtitle="System-wide record of who did what, and when">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Timestamp', 'User', 'Role', 'Action', 'Reference'].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {auditLog.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-ink-50/70">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{row.timestamp}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-900">{row.user}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-600">{row.role}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{row.action}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-500">{row.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  )
}
