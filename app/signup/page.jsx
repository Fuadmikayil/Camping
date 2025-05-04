'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async(data) => {
    const res = await fetch('/api/signup',{
      method:"POST",
      body: JSON.stringify(data)
    })
    const resData = await res.json()

    if(res.status==201){
      alert('User Added Succesfully')
      reset()
    }else{
      alert(resData.mes)
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 space-y-4"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 4, message: 'Username must be at least 4 characters' },
            maxLength: { value: 12, message: 'Username must be at most 12 characters' }
          })}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
            maxLength: { value: 16, message: 'Password must be at most 16 characters' }
          })}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
}