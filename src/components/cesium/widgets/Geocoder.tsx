import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useCesium } from 'resium'; 
import { Geocoder, GoogleGeocoderService, type Viewer } from 'cesium'; 

const moveSearch = (geocoder: Geocoder) => {
  const cSearch = geocoder.container.firstChild;
  const gcIcon = document.getElementById('gc-icon');
  if (!cSearch || !gcIcon) return;

  cSearch.classList.add('input', 'input-neutral', 'w-full');

  cSearch.removeChild(cSearch.lastChild);
  
  gcIcon.classList.remove('hidden');
  gcIcon.classList.add('me-0!');
  cSearch.insertBefore(gcIcon, cSearch.firstChild);

  cSearch.lastChild?.classList.remove('cesium-geocoder-input');
  cSearch.lastChild?.classList.add('pl-1');
}

const moveSuggestions = (geocoder: Geocoder) => {
  const suggEl = geocoder.searchSuggestionsContainer;
  suggEl?.firstChild?.classList.add('join', 'join-vertical', 'bg-base-100', 'z-10', 'rounded-box', 'w-full', 'text-lg', '*:btn', '*:btn-ghost');
}

export function CustomGeocoder() {
  const { viewer } = useCesium();
  const viewerRef = useRef<Viewer>(undefined);
  if ( viewer != viewerRef.current) viewerRef.current = viewer;

  const geocoderRef = useRef<HTMLDivElement>(undefined);

  useEffect(() => {
    if (!viewer || !geocoderRef.current ) return;
    const gc = viewer.geocoder;
		gc.container = geocoderRef.current;

    moveSearch(gc);
    moveSuggestions(gc);
  }, []);

  return (
    <>
      <div ref={geocoderRef} className='w-full' />
      <span id='gc-icon' className='label hidden'><Icon icon='material-symbols:search' className='size-6'/></span>
    </>
  );
}

export function GeocoderSkeleton() {
  return (
    <label className='input'>
      <span className='label'><Icon icon='material-symbols:search' className='size-6'/></span>
      <input type='text' />
    </label>
  );
}
