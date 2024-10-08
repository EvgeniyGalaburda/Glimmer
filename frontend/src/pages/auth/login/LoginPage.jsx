import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import glimmer from '../../../components/img/glimmer.png';

import {MdOutlineMail} from 'react-icons/md';
import { MdPassword } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password:'',
  })

  const queryClient = useQueryClient();

  const {mutate: login, isPending, isError, error} = useMutation({
    mutationFn: async ({username, password}) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password})
        });
        const data = await res.json();
        if(data.error) throw new Error(data.error);
        else {
          toast.success("Loged in successfully!");
          queryClient.invalidateQueries({queryKey: ['authUser']});
        }
        return data;
      } catch (error) {
        toast.error(error.message)
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10 '>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <img src={glimmer} className='lg:w-2/3 rounded-full' alt="" />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center animate-fade-right'>
        <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
          <img src={glimmer} className='w-24 lg:hidden rounded-full' alt="" />
          <h1 className='text-4xl font-extrabold text-white'>Let your light shine again!</h1>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdOutlineMail/>
            <input 
              type="text"
              className='grow'
              placeholder='Username'
              name='username'
              onChange={handleInputChange}
              value={formData.username} />
          </label>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdPassword/>
            <input 
              type="password"
              className='grow'
              placeholder='Password'
              name='password'
              onChange={handleInputChange}
              value={formData.password} />
          </label>
          <button className='btn rounded-full btn-primary text-white'>{isPending?'Loading..':'Login'}</button>
          {isError && <p className='text-red-500'>{error.message}</p>}
        </form>
        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-white text-lg'>Don't have an account?</p>
          <Link to='/signup'>
            <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
