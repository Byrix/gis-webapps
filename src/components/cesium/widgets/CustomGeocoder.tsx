import { useCesium } from 'resium';
import { type Viewer, Cartesian3 } from 'cesium';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';

import { z } from 'astro:schema';
const Suggestion = z.object({
  name: z.string(),
  osmid: z.coerce.number(),
  coords: z.object({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
  }),
})
type Suggestion = z.infer<typeof Suggestion>;



export default function Geocoder() {
  const { viewer } = useCesium();
  const [searchQuery, setQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const viewRef = useRef<Viewer>(undefined);
  const sugBox = useRef<HTMLDivElement>(undefined);

  if (!viewer) return;
  else if (viewRef.current != viewer) viewRef.current = viewer;

  const updateSuggestions = async () => {
    setIsSubmitting(true); 

    fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`, {
      method: "GET",
      headers: { 'content-type': 'application/json' }
    }).then(res => res.json())
    .then((res) => console.debug(res))
    .catch((err) => {
      var newToasts = toasts;
      newToasts.push({ type: 'error', title: 'Error', description: 'Please try again later', icon: 'material-symbols:error-outline-rounded'});
      console.error(err)
      setToasts(newToasts);
    }).finally(() => setIsSubmitting(false));
  };

  const goToOption = (index: number) => {
    const suggestion = suggestions[index];
    const { coords } = suggestion;
    const mapPoint = Cartesian3.fromDegrees(coords.lon, coords.lat);

    viewer.scene.camera.flyTo({ destination: mapPoint });
  };

  const updateQuery = (newQuery: string) => {
    // Debounce query updating
    setTimeout(() => setQuery(newQuery), 2000);
  }

  useEffect(() => { 
    if (!isSubmitting && searchQuery!="") updateSuggestions();
  }, [searchQuery]);

  useEffect(() => {
    if (toasts.length===0) return;
    const toggleToasts = setTimeout(() => {
			console.debug("Trying to shift")
      var newToasts = toasts;
      newToasts.shift();
      setToasts(newToasts);
      clearTimeout(toggleToasts);
    }, 10000);
  }, [toasts]);

  return (
    <>
      <label className='input w-full'>
        <span className='label'>
          <Icon icon='material-symbols:search' className={`size-6 ${isSubmitting ? 'hidden' : ''}`}/>
          <span className={`loading loading-spinner loading-md ${isSubmitting ? '' : 'hidden'}`} />
        </span>
        <input
          type='text'
          onChange={(e) => updateQuery(e.target.value)}
          disabled={isSubmitting}
          placeholder = 'Enter a location...'
          onFocus = {() => setShowSuggestions(true)}
          onBlur = {async () => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </label>

      <ul ref={sugBox} className={`list bg-base-100 rounded-box z-10 ${showSuggestions || 'hidden'}`}>
        {suggestions.map((suggestion, index) => (
          <li 
            key={index} 
            className='list-row'
            onClick={() => goToOption(index)}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>

      <div className={`toast toast-top toast-end`}>
        {toasts.map((toast, index) => (
          <div key={index} className={`alert alert-${toast.type}`}>
            <Icon icon={toast.icon} className='size-6' />
            <div>
              <h3 className='font-bold'>{toast.title}</h3>
              <div className='text-xs'></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
