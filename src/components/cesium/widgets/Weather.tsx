import { useEffect, useRef, useState } from 'react';
import { WEATHER_TOKEN } from 'astro:env/client';
import Fieldset from './Fieldset';
import { Icon } from '@iconify/react';
import { DayPicker } from 'react-day-picker';
import _ from 'lodash';
import get from 'axios';
import { 
	Weather as WeatherSchema, type Weather as WeatherType,
	type Toast
} from '../../../schema';
import { useCesium } from 'resium';

const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export function Weather() {
	const [date, setDate] = useState<Date>(new Date(Date.now()))
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [weather, setWeather] = useState<WeatherType>();
	const [toasts, setToasts] = useState<Toast[]>([]);
	const { viewer } = useCesium();

	const formatDate = () => date.toLocaleDateString("en-AU");
	const reset = () => {
		setDate(new Date(Date.now()));
		setWeather(undefined);
	}

	const addErrorToast = () => {
		var newToasts = JSON.parse(JSON.stringify(toasts));
		newToasts.push({ type: 'error', title: 'Error', description: 'Please try again later', icon: 'material-symbols:error-outline-rounded'});
		setToasts(newToasts);
	}

	const getUrl = () => {
		var apiUrl;
		if (viewer?.trackedEntity?.position) {
			const posCart = viewer.trackedEntity.position.getValue();
			apiUrl = `${baseUrl}/${posCart?.y}%2C%20${posCart?.x}`;
		} else {
			// Defaults to Lilydale
			apiUrl = `${baseUrl}/-37.757549%2C%20145.350281`;
		}

		return apiUrl;
	}

	const getWeather = async () => {
		setIsFetching(true);

		const apiUrl = await getUrl();
		
		get(`${apiUrl}/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`, {
			params: {
				unitGroup: 'metric',
				include: 'days',
				key: WEATHER_TOKEN,
				contentType: 'json'
			}
		}).then((res) => 
			res.data.days[0]
		).then((conditions) => {
			console.debug(conditions);
			const newWeather = WeatherSchema.safeParse(conditions);

			if (newWeather.success) setWeather(newWeather.data);
			else {
				addErrorToast();
				console.error(newWeather.error);	
			}
		}).catch((err) => {
			addErrorToast();
			console.error(err);
		}).finally(() => setIsFetching(false));
	}

	useEffect(() => {
		if (toasts.length === 0) return;
		const toggleToasts = setTimeout(() => {
			var newToasts = _.cloneDeep(toasts);
			newToasts.shift()
			setToasts(newToasts);
			clearTimeout(toggleToasts);
		}, 5000);
	}, [toasts])

	return (<>
		<Fieldset title='Get Weather' help="Select a date and hit the button to see the weather information for your selected day! Gets the weather for the selected waypoint, otherwise for Lilydale.">
			<label className='input input-neutral w-full'>
				<span className='label'>
					<Icon icon="material-symbols:calendar-today-rounded" className='size-5' />
				</span>
				<input type='button' value={formatDate()} disabled={isFetching} popoverTarget="rdp-popover" style={{ anchorName: "--rdp" } as React.CSSProperties} />
			</label>

			<div className='flex gap-1'>
				<button 
					className='btn btn-secondary btn-sm btn-outline grow' 
					onClick={reset} 
					disabled={weather==undefined ? true : false}
				>Reset</button>
				<button 
					className='btn btn-primary btn-sm grow' 
					disabled={isFetching}
					onClick={getWeather}
				>
					{isFetching ? (<span className='loading loading-dots loading-md' />) : 'Run'}
				</button>
			</div>

			{weather==undefined ? (<></>) : (
				<div className='carousel rounded-box border border-neutral'>
					<WeatherCard icon={`wi:forecast-io-${weather.icon}`} title={weather.conditions} />
					<WeatherCard icon='wi:thermometer' title={`${weather.temp}°C`} body={`Feels like ${weather.feelslike}°C`} />
					<WeatherCard icon='wi:wu-rain' title={`${weather.precip}mm`} body={`${weather.precipprob}% chance`} />
					<WeatherCard icon='wi:sunrise' title='Sunrise' body={`${weather.sunrise} am`} />
					<WeatherCard icon='wi:sunset' title='Sunset' body={`${weather.sunset} pm`} />
				</div>
			)}
		</Fieldset>

		<div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
      <DayPicker className="react-day-picker" mode="single" selected={date} onSelect={setDate} />
    </div>

		<div className={`toast toast-top toast-end`}>
			{toasts.map((toast, index) => (
				<div key={index} className={`alert alert-error`}>
					<Icon icon={toast.icon} className='size-9' />
					<div>
						<h3 className='font-bold'>{toast.title}</h3>
						<div className='text-xs'>Please try again later</div>
					</div>
				</div>
			))}
		</div>
	</>);
}

const WeatherCard = ({ icon, title, body="" }: {
	icon: string,
	title: string,
	body?: string,
}) => {
	return (
		<div className='carousel-item card flex-col bg-base-200 border-neutral border-r rounded-none w-25'>
			<figure><Icon icon={icon} className='size-12 mt-2' /></figure>
			<div className='card-body p-4 justify-center items-center w-full'>
				<h2 className='card-title text-center'>{title}</h2>
				<p className='-mt-2 text-center'>{body}</p>
			</div>
		</div>
	)
}

export function WeatherSkeleton() {
	return <p>wip</p>;
}