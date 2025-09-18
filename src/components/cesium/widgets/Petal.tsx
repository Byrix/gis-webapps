import type { Viewer } from 'cesium';

export default function Petal({ children, tooltip, onClick }: {
  children: React.ReactElement,
  tooltip: string,
  onClick?: () => void
}) {
  return (
    <div className='fab-main-action btn btn-lg btn-circle btn-primary btn-soft tooltip tooltip-left' data-tip={tooltip} onClick={onClick}>
      {children}
    </div>
  )
}