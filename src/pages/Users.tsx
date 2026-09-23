import { Search, UserPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { usersList } from '../data/mockData'
import { Button } from '../components/ui/Button'
import { Field, SelectInput, TextInput } from '../components/ui/FormSection'
import { Modal } from '../components/ui/Modal'
import { StatusBadge } from '../components/ui/StatusBadge'
import { TableCard } from '../components/dashboard/shared/TableCard'

export function Users() {
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [statuses, setStatuses] = useState<Record<string, 'Active' | 'Inactive'>>({})

  const rows = useMemo(
    () => usersList.filter((u) => !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.laboratory.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  function toggleStatus(id: string, current: 'Active' | 'Inactive') {
    setStatuses((s) => ({ ...s, [id]: current === 'Active' ? 'Inactive' : 'Active' }))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or laboratory…"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <TableCard title="Users" subtitle={`${rows.length} of ${usersList.length} users`}>
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr className="bg-ink-50">
              {['Name', 'Role', 'Laboratory', 'Status', 'Last Activity', 'Assigned Evaluations', ''].map((col) => (
                <th key={col} className="whitespace-nowrap px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((u) => {
              const status = statuses[u.id] ?? u.status
              return (
                <tr key={u.id} className="transition-colors hover:bg-ink-50/70">
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-ink-900">{u.name}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-700">{u.role}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-600">{u.laboratory}</td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <StatusBadge status={status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-ink-500">{u.lastActivity}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-sm text-ink-600">{u.assignedEvaluations}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(u.id, status)}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-100 hover:text-ink-800"
                    >
                      {status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add User"
        description="Create a new WEIGHPRO account and assign a role"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Add User</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" full>
            <TextInput placeholder="e.g. Neha Kapoor" />
          </Field>
          <Field label="Role">
            <SelectInput>
              <option>System Admin</option>
              <option>Lab Manager</option>
              <option>Tester</option>
              <option>Reviewer</option>
            </SelectInput>
          </Field>
          <Field label="Laboratory">
            <SelectInput>
              <option>Regional Reference Standards Laboratory, Bengaluru</option>
              <option>National Test House, Kolkata</option>
              <option>State Reference Standards Laboratory, Pune</option>
              <option>Legal Metrology Laboratory, Chennai</option>
            </SelectInput>
          </Field>
        </div>
      </Modal>
    </div>
  )
}
