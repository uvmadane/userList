import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error")
        }
        return response.json()
      })
      .then((data) => {
        setUser(data.data)
        setLoading(false)
      })
      .catch((error) => {
        setError("Failed to fetch")
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    user && (
      <div className="userDetailCard App">
        <img src={user.avatar} alt={user.id} className="avatar" />
        <div className="userDetails">
          <div className="userName">
            {user.first_name + " " + user.last_name}
          </div>
          <div className="userEmail">{user.email}</div>
        </div>
      </div>
    )
  )
}

export default UserDetail
