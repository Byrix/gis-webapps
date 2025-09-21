import { useCesium } from 'resium';
import type { Viewer } from 'cesium';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

import Fieldset from './Fieldset';

export function Filter() {
  const [showPoi, setPoi] = useState(true);
  const [showFac, setFac] = useState(true);
  const [showRest, setRest] = useState(true);
  const [showMisc, setMisc] = useState(true);
  const { viewer } = useCesium();
  const viewRef = useRef<Viewer>(undefined);

  if (!viewer) return;
	useEffect(() => {
		if (viewRef.current != viewer) viewRef.current = viewer;
	}, [viewer]);

	const toggleVisibility = (feature: string, state: boolean) => {
		if (!viewRef.current) return;
		const { dataSources } = viewRef.current.cesiumWidget;

		const matches = dataSources.getByName(feature);
		if (matches.length==0) return;
		matches[0].show = state;
	}

  useEffect(() => toggleVisibility('poi', showPoi), [showPoi]);
	useEffect(() => toggleVisibility('rest', showRest), [showRest]);
	useEffect(() => toggleVisibility('facility', showFac), [showFac]);
	useEffect(() => toggleVisibility('other', showMisc), [showMisc]);

  return (
		<Fieldset title='Data Filters' help="Click any of the layers to toggle their visibility off, press it again to turn it back on!">
      <form className='flex flex-col w-full join join-vertical'>
        <Item name='Points of Interest' show={showPoi} onUpdate={() => setPoi(!showPoi)} />
        <Item name='Facilities' show={showFac} onUpdate={() => setFac(!showFac)} />
        <Item name='Rest Spots' show={showRest} onUpdate={() => setRest(!showRest)} />
        <Item name='Other' show={showMisc} onUpdate={() => setMisc(!showMisc)} />
      </form>
		</Fieldset>
  )
}

function Item({ name, show, onUpdate }: { name: string, show: boolean, onUpdate?: any }) {
  return (
    <label className='label btn btn-primary btn-soft join-item flex'>
      <span className={`text-base-content ${show ? '' : 'line-through opacity-30 '}`}>{name}</span>
      <div className='grow' />
      <label className='swap swap-rotate'>
        <input type='checkbox' checked={show} onChange={onUpdate} />
        <Icon icon='mdi:eye-outline' className='size-5 swap-on text-base-content' />
        <Icon icon='mdi:eye-off-outline' className='size-5 swap-off text-base-content opacity-30' />
      </label>
    </label>
  );
}

export function FilterSkeleton() {
  return (
    <fieldset className='fieldset bg-base-100 border-neutral rounded-box border w-full max-w-full p-4'>
      <legend className='fieldset-legend'>Data Filters</legend>
      <form className='flex flex-col w-full join join-vertical'>
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </form>
    </fieldset>
  );
}
function ItemSkeleton() {
  return (
    <label className='label btn btn-primary btn-soft btn-disabled skeleton join-item flex'>
      <span className={`text-base-content`} />
      <div className='grow' />
      <label className='swap swap-rotate'>
        <input type='checkbox' defaultChecked />
        <Icon icon='mdi:eye-outline' className='size-5 swap-on text-base-content' />
        <Icon icon='mdi:eye-off-outline' className='size-5 swap-off text-base-content opacity-30' />
      </label>
    </label>
  );
}