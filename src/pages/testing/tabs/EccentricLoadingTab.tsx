import { eccentricLoadingReadings } from '../../../data/mockData'
import { Button } from '../../../components/ui/Button'
import { StatusBadge } from '../../../components/ui/StatusBadge'

const POSITION_COORDS: Record<string, { x: number; y: number }> = {
  Center: { x: 110, y: 70 },
  'Front Left': { x: 40, y: 30 },
  'Front Right': { x: 180, y: 30 },
  'Rear Left': { x: 40, y: 110 },
  'Rear Right': { x: 180, y: 110 },
}

export function EccentricLoadingTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex items-center justify-center rounded-xl border border-ink-200 bg-ink-50 p-4">
          <svg width="220" height="140" viewBox="0 0 220 140">
            <rect x="20" y="10" width="180" height="120" rx="10" fill="#FFFFFF" stroke="#D7E0E3" strokeWidth="2" />
            {eccentricLoadingReadings.map((row) => {
              const coord = POSITION_COORDS[row.position]
              if (!coord) return null
              const tested = row.result !== 'NOT TESTED'
              return (
                <g key={row.position}>
                  <circle cx={coord.x} cy={coord.y} r="14" fill={tested ? '#EAF7F1' : '#F1F4F5'} stroke={tested ? '#23845A' : '#C2CDD1'} strokeWidth="2" />
                  <text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="9" fontWeight="600" fill={tested ? '#175A3D' : '#9AA9AE'}>
                    {row.position === 'Center' ? 'C' : row.position.split(' ').map((w) => w[0]).join('')}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink-50">
                {['Load Position', 'Applied Load', 'Reading', 'Error', 'MPE', 'Result'].map((col) => (
                  <th key={col} className="whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {eccentricLoadingReadings.map((row) => (
                <tr key={row.position}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-700">{row.position}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-800">2.000 kg</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-800">{row.reading}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-600">{row.error}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-600">{row.mpe}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusBadge status={row.result} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save & Continue to Other Tests</Button>
      </div>
    </div>
  )
}
