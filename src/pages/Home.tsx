import { useState, useEffect } from 'react'
import { getUsers } from "../services/UserService"
import { User } from "../interfaces/User"

function Home() {
    // State variables for managing users, filtered users, search input, and loading state
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    // Fetches users from the API
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await getUsers()
            setUsers(response)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Handles filtering users based on search input
    const handleFilter = (search: string) => {
        setInput(search)
        if (search.trim() === '') {
            setFilteredUsers(users)
            return
        }
        const filtered = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
        setFilteredUsers(filtered)
    }

    // Resets the search and filtered users
    const handleReset = () => {
        setInput('')
        setFilteredUsers([])
        // Clear the input field
        const inputElement = document.getElementById('input') as HTMLInputElement
        if (inputElement) {
            inputElement.value = ''
        }
    }

    // Sorts users alphabetically by username
    const handleSort = () => {
        if (filteredUsers.length > 0) {
            const sorted = [...filteredUsers].sort((a, b) => a.username.localeCompare(b.username))
            setFilteredUsers(sorted)
            return
        }
        const sorted = [...users].sort((a, b) => a.username.localeCompare(b.username))
        setFilteredUsers(sorted)
    }

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            {/* Main container with search interface */}
            <div className="flex flex-col items-center justify-center mt-28 gap-y-4">
                <div className="flex gap-2 items-center">
                    <h1 className="text-6xl font-bold text-neutral-200">Search for users</h1>
                    <img src="/logo-final.webp" alt="logo" className="size-28" />
                </div>

                {/* Search input field */}
                <input id="input" onChange={(e) => handleFilter(e.target.value)} autoFocus type="text" placeholder="Search" className="placeholder:text-neutral-800 placeholder:font-semibold w-1/2 p-2 border border-gray-300 rounded bg-neutral-200 text-neutral-800 font-semibold mt-7" />

                {/* Action buttons container */}
                <div className="flex gap-2 w-1/2 justify-center">
                    <button onClick={handleSort} className="cursor-pointer w-1/2 p-2 border border-gray-300 rounded bg-neutral-200 text-neutral-800 font-semibold transition duration-300 hover:bg-neutral-300">Sort alphabetically</button>
                    <button onClick={handleReset} className="cursor-pointer w-1/2 p-2 border border-gray-300 rounded bg-neutral-200 text-neutral-800 font-semibold transition duration-300 hover:bg-neutral-300">Reset</button>
                </div>

                {/* Users display section */}
                <div className="flex flex-col gap-y-4 w-1/2 mt-10">
                    {loading && (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-22 w-22 border-t-2 border-b-2 border-orange-800"></div>
                        </div>
                    )}

                    {/* Display filtered users */}
                    {filteredUsers.length > 0 && filteredUsers.map((user: User) => {
                        return (
                            <div key={user.username} className="flex gap-2 items-center">
                                <img src={user.picture} alt={user.username} className="w-12 h-12 rounded-full" />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold">{user.username}</h2>
                                    <p className="text-gray-400">{user.email}</p>
                                    <p className="text-gray-400">{user.phone}</p>
                                </div>
                            </div>
                        )
                    })}

                    {/* Display all users when no search input */}
                    {input.length === 0 && users.map((user: User) => {
                        return (
                            <div key={user.username} className="flex gap-2 items-center">
                                <img src={user.picture} alt={user.username} className="w-12 h-12 rounded-full" />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold">{user.username}</h2>
                                    <p className="text-gray-400">{user.email}</p>
                                    <p className="text-gray-400">{user.phone}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Home