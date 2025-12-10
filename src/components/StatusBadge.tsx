import { Badge } from '@/components/ui/badge';

type Status = 'submitted' | 'generating' | 'review' | 'variations_requested' | 'approved' | 'stencil_ready' | 'completed';

const statusConfig = {
  submitted: { label: 'Submitted', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  generating: { label: 'Generating', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse' },
  review: { label: 'In Review', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  variations_requested: { label: 'Variations Requested', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  approved: { label: 'Approved', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  stencil_ready: { label: 'Stencil Ready', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  completed: { label: 'Completed', className: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
