'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch('/api/blogs', {
      method: "POST",
      body: JSON.stringify(data)
    })
    const resData = await res.json()
    if (res.status === 401) {
      router.push('/signin')
      return
    }

    else if (res.status == 201) {
      alert('Blog Added Succesfully')
      reset()
      getBlogs()
    } else {
      alert(resData.mes)
    }
  };

  const getBlogs = async () => {
    const res = await fetch('/api/blogs')
    const data = await res.json()
    setBlogs(data.blogs)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <>
      <h1 className='text-white bg-pink-600 text-center text-8xl py-[40px]'>ADMIN PANEL</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'Title is required',
            })}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            {...register('subtitle', {
              required: 'subtitle is required',
            })}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>

      <div className="grid grid-cols-3 gap-8 container mx-auto py-[40px]">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer "
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

    </>
  );
}