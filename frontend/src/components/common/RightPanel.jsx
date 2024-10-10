import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
    const {data: users, isLoading} = useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/users/suggested');
                const data = await res.json();
                if(!res.ok) throw new Error(data.error)

                return data;
            } catch (error) {
                throw new Error(error)
            }
        }
    })

    const {follow, isPending} = useFollow();

    if (users?.length === 0) return <div className="lg:w-64 lg:px-2 w-0"></div>
  return (
    <div className="w-64 hidden lg:block py-4 px-2">
        <div className="bg-neutral p-4 rounded-md sticky top-4">
            <p className="font-bold">Who to follow</p>
            <div className="flex flex-col gap-4">
                {isLoading && (
                    <>
                        <RightPanelSkeleton/>
                        <RightPanelSkeleton/>
                        <RightPanelSkeleton/>
                        <RightPanelSkeleton/>
                    </>
                )}
                {!isLoading && users?.map((user) =>(
                    <Link
                        to={`/profile/${user.username}`}
                        className="flex items-center justify-between gap-4"
                        key={user.id || user.username}>
                            <div className="flex gap-2 items-center">
                                <div className="avatar">
                                    <div className="w-8 rounded-full"><img src={user.profileImg || '/avatar-placeholder.png'} alt="" /></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold tracking-tight truncate w-20">{user.fullName}</span>
                                    <span className="text-sm text-slate-400">@{user.username}</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn bg-white text-black hover:bg-secondary hover:text-white border-none rounded-full btn-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        follow(user._id);
                                    }}>
                                        {isPending? <LoadingSpinner/>:'Follow'}
                                    </button>
                            </div>
                        </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default RightPanel