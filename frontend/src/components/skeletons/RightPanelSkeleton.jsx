const RightPanelSkeleton = () => {
	return (
		<div className='flex flex-col gap-4 w-56'>
			<div className='flex gap-2 items-center'>
				<div className='skeleton w-8 h-8 rounded-full shrink-0'></div>
				<div className='flex flex-1 items-center justify-between'>
					<div className='flex flex-col gap-2'>
						<div className='skeleton h-4 w-28 rounded-full'></div>
						<div className='skeleton h-4 w-20 rounded-full'></div>
					</div>
					<div className='skeleton h-6 w-14 rounded-full'></div>
				</div>
			</div>
		</div>
	);
};
export default RightPanelSkeleton;