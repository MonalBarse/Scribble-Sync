"use client"
import React, {
    ChangeEvent,
    useEffect,
    useState
} from 'react'
import qs from "query-string"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from '@/components/ui/input'


const SearchInput = () => {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: value
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        });

        router.push(url);
    }, [value, router]);


    return (
        <div className='w-full relative flex'>
            <Search
                className='absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
            />
            <Input
                placeholder='Search...'
                className='w-full max-w-[516px] bg-transparent border border-gray-900 pl-9'
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchInput