import { useState } from 'react';
import { Icon } from '@iconify/react';
import { DayPicker } from 'react-day-picker';
import Fieldset from './Fieldset';

export function Timeline() {
  const [date, setDate] = useState<Date>(new Date(Date.now()))

  const formatDate = () =>{
    return date.toLocaleString("en-AU"); 
  }
  const resetDate = () => {
    setDate(new Date(Date.now()));
  }

  return (
    <>
			<Fieldset title='Get Rainfall'>
      {/* <fieldset className='fieldset bg-base-100 border-neutral rounded-box border w-full max-w-full p-4'>
        <legend className='fieldset-legend'>Get Rainfall</legend> */}

        <label className='input input-neutral w-full'>
          <span className='label'>
            <Icon icon="material-symbols:calendar-today-rounded" className='size-5' />
          </span>
          <input type='button' value={formatDate()} popoverTarget="rdp-popover" style={{ anchorName: "--rdp" } as React.CSSProperties} />
        </label>

        <div className='flex gap-1'>
          <label className='btn btn-secondary btn-sm btn-outline grow'>
            <input type='reset' onClick={resetDate} />
          </label>

          <label className='btn btn-primary btn-sm grow'>
            <input type='button' value="Run" />
          </label>
        </div>
      {/* </fieldset> */}
			</Fieldset>

      <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
        <DayPicker className="react-day-picker" mode="single" selected={date} onSelect={setDate} />
      </div>
    </>
  );
}

export function TimelineSkeleton() {
  return <p>wip</p>;
}