import glimmer from '../img/glimmer.png';

import { MdHomeFilled } from 'react-icons/md';
import {IoNotifications} from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const queryClient = useQueryClient();
    const {mutate: logout, isError, isPending, error} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/auth/logout',{
                    method: 'POST',
                })
                const data = await res.json();

                if(data.error) return null;

                if(!res.ok) throw new Error(data.error);
                else {
                    toast.success('Loged out successfully!');
                    queryClient.invalidateQueries({queryKey: ['authUser']});    
                }
                return data;
            } catch (error) {
                toast.error(error.message)
            }
        } 
    })


    const {data} = useQuery({queryKey: ['authUser']})
    const {data: notifications} = useQuery({queryKey: ['notifications']});

  return (
    <div className='md:flex-[2-2-0]'>
        <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full p-2'>
            <Link to='/' className='flex justify-center md:justify-start'>
                <img src={glimmer} className='md:w-12 md:h-12  w-10 rounded-full' alt="" />
            </Link>
            <ul className='flex flex-col gap-3 mt-4'>
                <li className='flex justify-center md:justify-start'>
                    <Link to='/' className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-2xl duration-300 py-2 pl-2  pr-2 md:pr-4 max-w-fit cursor-pointer'>
                        <MdHomeFilled className='w-8 h-8'/>
                        <span className='text-lg hidden md:block'>Home</span>
                    </Link>
                </li>
                <li className='flex justify-center md:justify-start'>
                    <Link to='/notifications' className='relative flex gap-3 items-center hover:bg-stone-900 transition-all rounded-2xl duration-300 py-2 pl-2 pr-2 md:pr-4 max-w-fit cursor-pointer'>
                        <IoNotifications className='w-8 h-8'/>
                        <span className='text-lg hidden md:block'>Notifications</span>
                        {notifications?.length > 0 && <span className='absolute top-0 left-6 bg-primary px-1 min-w-6 flex justify-center items-center rounded-full text-base-100'>
                            {notifications.length}
                        </span>}
                    </Link>
                </li>
                <li className='flex justify-center md:justify-start'>
                    <Link to={`/profile/${data.username}`} className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-2xl duration-300 py-2 pl-2 pr-2 md:pr-4 max-w-fit cursor-pointer'>
                        <FaUser className='w-8 h-8'/>
                        <span className='text-lg hidden md:block'>Profile</span>
                    </Link>
                </li>
            </ul>
            {data && (
                <Link to={`/profile/${data.username}`}
                      className='mt-auto mb-7 flex gap-2 items-center transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'>
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'><img src={data?.profileImg || '/avatar-placeholder.png'} alt="" /></div>
                        </div>
                        <div className='flex md:justify-between justify-center items-center flex-1'>
                            <div className='hidden md:flex flex-col justify-start'>
                                <p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>
                                <p className='text-slate-500 text-xs'>@{data?.username}</p>
                            </div>
                            <BiLogOut onClick={(e) => {e.preventDefault(); logout()}} className='w-5 h-5 cursor pointer'/>
                        </div>
                </Link>
            )}
        </div>
    </div>
  )
}

export default Sidebar