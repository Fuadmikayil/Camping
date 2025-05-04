'use client'
import { useEffect, useState } from "react"

export default function HomePage() {

  const [blogs,setBlogs] = useState([])

  const getBlogs = async() => {
    const res = await fetch('/api/blogs')
    const data = await res.json()
    setBlogs(data.blogs)
  }

  useEffect(() => {
    getBlogs()
  }, [])


  return (
    <main className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">MY AMAZING BLOG!</h1>
      <div className="grid grid-cols-3 gap-4">
        {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.subtitle}</p>
              </div>
            </article>
          ))}
      </div>
    </main>
  );
}