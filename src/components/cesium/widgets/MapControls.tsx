import Petal from './Petal';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { etGoHome, toggleMapFullscreen, togglePlane } from './utils';
import { openModal } from '../../../utils';
import { useCesium } from 'resium';
import { NavigationHelpButton, type Viewer } from 'cesium';

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

  return (<>
    <div className='fab fab-flower bottom-[7vh]'>
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

		<Modal />
  </>);
}

export function Modal() {
	const { viewer } = useCesium();
	const viewerRef = useRef<Viewer>(undefined);
	if (!viewer) return;
	if (viewer != viewerRef.current) viewerRef.current = viewer;

	const mouseRef = useRef<HTMLDivElement>(undefined);
	const touchRef = useRef<HTMLDivElement>(undefined);

	useEffect(() => {
		if (!mouseRef.current || !touchRef.current!) return;
		const navHelp = new NavigationHelpButton({ container: 'nav-void' });

		const container = navHelp.container.firstChild?.lastChild;
		mouseRef.current.innerHTML = container?.querySelector('.cesium-click-navigation-help').innerHTML;
		touchRef.current.innerHTML = container?.querySelector('.cesium-touch-navigation-help').innerHTML;
	}, []);



	return (
		<>
			<dialog id='modal-nav-info' className='modal'>
				<div className='modal-box'>
					<form method='dialog'>
						<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>x</button>
					</form>
					<div className='tabs tabs-lift'>
						<input type='radio' name='nav-info-tab' className='tab' aria-label='Mouse' defaultChecked />
						<div ref={mouseRef} className='tab-content bg-base-100 border-base-300 p-6'>
							Mouse instructions
						</div>

						<input type='radio' name='nav-info-tab' className='tab' aria-label='Touch' />
						<div ref={touchRef} className='tab-content bg-base-100 border-base-300 p-6'>
							Touchscreen instructions
						</div>
					</div>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button>close</button>
				</form>
			</dialog>
			<div id='nav-void' className='hidden' />
		</>
	);
}