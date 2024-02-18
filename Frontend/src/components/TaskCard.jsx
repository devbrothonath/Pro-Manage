import React from 'react'

const TaskCard = ({task}) => {
  return (
    <div className="TaskCard">
        <span>{task.priority} priority</span>
        <h4>{task.title}</h4>
        {task.tasklist && (
            <>
                {task.tasklist.map((task) => (
                    <div>
                        <input 
                            type="text"
                            value={task.value} />
                    </div>
                ))}
            </>
        )}
    </div>
  )
}

export default TaskCard