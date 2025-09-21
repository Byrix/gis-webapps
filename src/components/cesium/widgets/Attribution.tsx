import { useRef, useEffect, useState } from 'react';
import { useCesium } from 'resium';
import { CreditDisplay, type Viewer } from 'cesium';

export default function DataAttribution() {
  const { viewer } = useCesium();
  if (!viewer) return;
  const viewerRef = useRef<Viewer>(undefined);
  if (viewer != viewerRef.current) viewerRef.current = viewer;

  const listRef = useRef<HTMLUListElement>(undefined);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.innerHTML = "";
    listRef.current.appendChild(viewer.creditDisplay._creditList);
  }, [viewer]);

  return (
    <div tabIndex={0} className='mt-2 collapse collapse-arrow bg-base-100 border-neutral border'>
      <div className='collapse-title font-semibold'>Data Attribution</div>
      <div ref={listRef} className='collapse-content text-sm overflow-scroll'>
      </div>
    </div>
  );
}

export function AttributionSkeleton() {
  return <div className='skeleton' />
}