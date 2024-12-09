import { ReactNode } from 'react'

import { ReportHeader } from './report_header'

export function LayoutBorderNo({
  children,
  no,
  isReport = false,
}: {
  children: ReactNode
  no?: string
  isReport?: boolean
}) {
  return (
    <div className='border border-black section-to-print'>
      <p className='text-right font-semibold text-sm p-1'>{no ?? ''}</p>
      <div className='border border-black mx-2 mb-2'>
        {/* Header */}
        {isReport && <ReportHeader />}
        {/* Header */}

        {/* Content */}
        {children}
        {/* Content */}
      </div>
    </div>
  )
}
