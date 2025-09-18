import Petal from './Petal';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { etGoHome, toggleMapFullscreen, togglePlane } from './utils';
import { openModal } from '../../../utils';
import { useCesium } from 'resium';
import type { Viewer } from 'cesium';

export default function MapControls() {
  const { viewer } = useCesium();
  const viewerRef = useRef<Viewer>(undefined);
  if (!viewer) return;
  if (viewer != viewerRef.current) viewerRef.current = viewer;

  const [isFullscreen, setFullscreen] = useState(false);
  viewer.container.addEventListener('fullscreenchange', (e: Event) => {
    setFullscreen(!isFullscreen);
  });

  const [isPlanar, setPlanar] = useState(false);
  viewer.container.addEventListener('toggleSceneMode', (e: Event) => {
    setPlanar(!isPlanar);
  });

  return (
    <div className='fab fab-flower bottom-[6vh]'>
      <div tabIndex={0} role='button' className='btn btn-primary btn-circle btn-xl'>
        <Icon icon='material-symbols:menu' className='size-10' />
      </div>
      <button className='fab-close btn btn-primary btn-circle btn-xl'>
        <Icon icon='material-symbols:close' className='size=10' /> 
      </button>

      <Petal tooltip='Navigation instructions' onClick={() => openModal('modal-nav-info')}>
        <Icon icon='material-symbols:info' className='size-8' />
      </Petal>

      <Petal tooltip='Go to home' onClick={() => etGoHome(viewer)}>
        <Icon icon='material-symbols:home' className='size-8'/>
      </Petal>

      <Petal tooltip={`Toggle 2D/3D`} onClick={() => togglePlane(viewer)}>
        <label className={`swap ${isPlanar ? 'swap-active' : ''}`}>
          <Icon icon='material-symbols:3d-outline-rounded' className='swap-on size-8' />
          <Icon icon='material-symbols:2d-outline-rounded' className='swap-off size-8' />
        </label>
      </Petal>

      <Petal tooltip='Toggle fullscreen' onClick={toggleMapFullscreen}>
        <label className={`swap ${isFullscreen ? 'swap-active' : ''}`}>
          <Icon icon='material-symbols:fullscreen-rounded' className='swap-off size-8' />
          <Icon icon='material-symbols:fullscreen-exit-rounded' className='swap-on size-8' />
        </label>
      </Petal>
    </div>
  );
}