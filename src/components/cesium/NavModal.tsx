import { useRef, useEffect } from 'react';
import { useCesium } from 'resium';
import { NavigationHelpButton, type Viewer } from 'cesium';

export default function Modal() {
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