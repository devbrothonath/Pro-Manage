import React, { useEffect, useState } from 'react'

const Home = () => {
    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("http://localhost:5000/api/tasks")
            const json = await response.json()

            if(response.ok) {
                setTasks(json)
            }
        }

        fetchTasks()
    }, [])
  return (
    <div className='home'>
        <div className="tasks">
            {tasks && tasks.map((task) => (
                <p key={task._id}>{task.title}</p>
            ))}
        </div>
    </div>
  )
}

export default Home