export default function Fieldset({ title, help, children }: { 
	title: string,
	help?: string,
	children: React.ReactNode
}) {
	return (
		<fieldset className='fieldset bg-base-100 border-neutral rounded-box border w-full max-w-full p-4 indicator'>
			<legend className='fieldset-legend'>{title}</legend>
			<div className='tooltip tooltip-left indicator-item -top-2.5 right-1 after:border after:border-info after:bg-info'>
				<div className='tooltip-content max-w-[15vw] alert alert-info alert-soft !border-info '>
					{help}
				</div>
				<span className='badge not-hover:badge-soft badge-info rounded-selector size-6 font-bold'>?</span>
			</div>

			{children}
		</fieldset>
	)
}