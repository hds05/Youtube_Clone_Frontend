import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoArrowBack } from 'react-icons/io5'

function Search({ setSearchText }) {
    const [searchBar, setSearchBar] = useState(false)
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
        setSearchText(e.target.value)
    }

    return (
        <>
            <div className={`${searchBar ? 'hidden' : 'flex'} sm:flex`}>
                <div className='hidden sm:block'>
                    <div className='flex border border-gray-700 rounded-full overflow-hidden'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={input}
                            onChange={handleChange}
                            className='w-full px-4 py-1 bg-black outline-none'
                        />
                        <button className='p-2 px-4 bg-gray-800'>
                            <CiSearch size={18} />
                        </button>
                    </div>
                </div>

                <div className='sm:hidden'>
                    <button onClick={() => setSearchBar(true)} className='p-2 hover:bg-gray-800 rounded-full'>
                        <CiSearch size={18} />
                    </button>
                </div>
            </div>

            {searchBar && (
                <div className='fixed top-0 left-0 w-full bg-black z-50 p-2 sm:hidden'>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setSearchBar(false)}>
                            <IoArrowBack size={22} />
                        </button>

                        <input
                            type="text"
                            placeholder='Search'
                            autoFocus
                            value={input}
                            onChange={handleChange}
                            className='flex-1 px-4 py-2 bg-gray-900 rounded-full outline-none'
                        />

                        <button>
                            <CiSearch size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Search