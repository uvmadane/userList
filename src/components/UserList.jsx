import React, { useEffect, useState } from "react"
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=1&per_page=100`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error")
        }
        return response.json()
      })
      .then((data) => {
        setUsers(data.data)
        setLoading(false)
      })
      .catch((error) => {
        setError("Failed to fetch")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      user.email.toLowerCase().includes(search.toLocaleLowerCase())
  )

  if (loading) {
    return <div> Loading... </div>
  }

  if (error) {
    return <div> {error}</div>
  }

  return (
    <>
      <div className="userListContainer">
        <input
          type="text"
          placeholder="Search by NAME OR EMAIL"
          onChange={handleSearchChange}
          className="searchBar"
        />
        <div className="useList">
          {filteredUsers.map((user) => {
            return(
            <div className="userCard" key={user.id}>
              <img src={user.avatar} alt={user.id} className="avatar" />
              <div className="userDetails">
                <div className="userName">{user.first_name}</div>
                <div className="userEmail">{user.email}</div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default UserList


