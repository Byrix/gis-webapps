import { useRef } from 'react';
import { useCesium } from 'resium';
import type { Viewer } from 'cesium';
import { Icon } from '@iconify/react';
import { 
  Geocoder, GeocoderSkeleton,
  DataAttribution, AttributionSkeleton,
  DataFilter, FilterSkeleton,
  Weather, WeatherSkeleton
} from './widgets';

export function Sidebar() {
  const context = useCesium();
  const { viewer } = context;
  const viewerRef = useRef<Viewer>(undefined);
  if (viewer != viewerRef.current) viewerRef.current = viewer;

  return (
    <div className='absolute left-[1vw] top-[8vh] w-1/5 min-w-70 h-fit max-h-[85vh] bg-base-200 border-neutral border-2 rounded-box z-1 p-3 flex flex-col justify-start items-center gap-3 overflow-scroll'>
      <h3 className='text-primary text-2xl font-bold text-center'>Lilydale to Warburton Rail Trail</h3>
      <p className='text-center'>Explore some of the iconic stops along the Lilydale-Warburton Rail Trail.</p>

      <div className='divider m-[0.5rem]'>
        <Icon icon='material-symbols:directions-bike-rounded' className='size-10 opacity-20' />
      </div>

      {/* <CustomGeocoder /> */}
      <DataFilter />
      <Weather />
      <DataAttribution />
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className='absolute left-[1vw] top-[7vh] w-1/5 h-fit bg-base-200 border-neutral border-2 rounded-box z-1 p-3 flex flex-col justify-center items-center gap-3 overflow-scroll'>
      <h3 className='text-primary text-2xl font-bold text-center'>Lilydale to Warburton Rail Trail</h3>
      <p>Description here</p>

      <div className='divider m-[0.5rem]'>
        <Icon icon='material-symbols:directions-bike-rounded' className='size-10 opacity-20' />
      </div>

      <GeocoderSkeleton />
      <FilterSkeleton />
      <WeatherSkeleton />
      <AttributionSkeleton />
    </div>
  );
}