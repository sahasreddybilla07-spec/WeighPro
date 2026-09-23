import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TooltipProps } from 'recharts'
import { ChartCard } from '../../ui/ChartCard'

export interface PipelineDatum {
  label: string
  count: number
  color: string
}

interface PipelineBarChartProps {
  title: string
  subtitle: string
  data: PipelineDatum[]
  delayMs?: number
  className?: string
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-popover">
      <p className="text-xs font-medium text-ink-900">{entry.payload.label}</p>
      <p className="mt-0.5 text-xs text-ink-500">
        <span className="font-mono font-semibold tabular-nums text-ink-900">{entry.value}</span> evaluations
      </p>
    </div>
  )
}

export function PipelineBarChart({ title, subtitle, data, delayMs = 150, className }: PipelineBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} delayMs={delayMs} className={className}>
      <div className="h-[268px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 0 }} barCategoryGap={14}>
            <XAxis type="number" hide domain={[0, 'dataMax + 4']} />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#3D4A4F', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip cursor={{ fill: '#F1F4F5' }} content={<ChartTooltip />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={20} animationDuration={900} animationEasing="ease-out">
              {data.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                style={{ fill: '#172126', fontSize: 12.5, fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
