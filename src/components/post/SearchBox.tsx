'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'



export default function SearchBox() {
    const [ search, setSearch ] = useState('')
    const [ debouncedSearch, setDebouncedSearch ] = useState('')
    const router = useRouter()

    //debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }
        , 500)
        return () => clearTimeout(timer)
    }, [search])
    //execute search when debouncedSearch changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            //const encodedSearch = encodeURIComponent(debouncedSearch.trim())
            router.push(`/?search=${debouncedSearch.trim()}`)
        } else {
            router.push('/')
        }

    }, [debouncedSearch, router])

  return (
    <>
    <div>
      <Input placeholder="Search..." className="w-[200px]" value={search}
      onChange={(e) => setSearch(e.target.value)}/>
    </div></>
  )
}
