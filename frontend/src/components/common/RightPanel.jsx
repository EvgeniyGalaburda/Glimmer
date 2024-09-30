import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import {USERS_FOR_RIGHT_PANEL} from '../../utils/db/dummy'

const RightPanel = () => {
    const isLoading = false;

  return (
    <div className="hidden lg:block py-4 px-2">
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
                {!isLoading && USERS_FOR_RIGHT_PANEL?.map((user) =>(
                    <Link
                        to={`/profile/${user.username}`}
                        className="flex items-center justify-between gap-4"
                        key={user.id || user.username}>
                            <div className="flex gap-2 items-center">
                                <div className="avatar">
                                    <div className="w-8 rounded-full"><img src={user.profileImg || '/avatar-placeholder.png'} alt="" /></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold tracking-tight truncate w-28">{user.fullName}</span>
                                    <span className="text-sm text-slate-400">@{user.username}</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn bg-white text-black hover:bg-secondary hover:text-white border-none rounded-full btn-sm"
                                    onClick={(e) => e.preventDefault()}>Follow</button>
                            </div>
                        </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default RightPanel