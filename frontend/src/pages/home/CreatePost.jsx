import {CiImageOn} from 'react-icons/ci';
import {BsEmojiSmileFill} from 'react-icons/bs';
import {useRef, useState} from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState();

  const imgRef = useRef(null);

  const isPending = false;
  const isError = false;
  const data = {
    profileImg: '/avatars/boy1.png'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Post created successfully');
  }

  const handleImage = (e) =>{
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className='flex p-4 items-start gap-4 border-b border-gray-700'>
      <div className='avatar'>
        <div className='w-8 rounded-full'><img src={data.profileImg || '/avatar-placeholder.png'}/></div>
      </div>
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <textarea
          className='textarea w-full p-0 text-lg resize-none border-none'
          placeholder='What is happening?'
          value={text}
          onChange={(e) => setText(e.target.value)}/>
          {img && (
            <div className='relative w-72 mx-auto'>
              <IoCloseSharp
                className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                onClick={() => {setImg(null); imgRef.current.value=null}}
                />
                <img src={img} className='w-full mx-auto h-72 object-contain rounded' alt="" />
            </div>
          )}

          <div className='flex justify-between border-t py-2 border-gray-700'>
            <div className='flex gap-2 items-center'>
              <CiImageOn
                className='fill-secondary w-6 h-6 cursor-pointer'
                onClick={() => imgRef.current.click()}/>
                <BsEmojiSmileFill className='fill-secondary w-5 h-5 cursor-pointer'/>
            </div>
            <input type="file" accept='image/*' hidden ref={imgRef} onChange={handleImage} />
            <button className='btn btn-secondary rounded-full btn-sm text-base-100 px-4'>
              {isPending? 'Posting...':"Post"}
            </button>
          </div>
          {isError && <div className='text-error'>Something went wrong</div>}
      </form>
    </div>
  )
}

export default CreatePost