import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UserList.css"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleUserClick = (id) => {
    navigate(`/user/${id}`)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="userListContainer App">
      <input
        type="text"
        placeholder="Search by NAME OR EMAIL"
        onChange={handleSearchChange}
        className="searchBar"
      />
      <div className="useList">
        {filteredUsers.map((user) => (
          <div
            className="userCard"
            key={user.id}
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.id} className="avatar" />
            <div className="userDetails">
              <div className="userName">
                {user.first_name + " " + user.last_name}
              </div>
              <div className="userEmail">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
