import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate,Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Todo = () => {
  const [authneciated, setAuthnecated] = useState(false);
  const [description, setDescription] = useState("");
  const [task,setTask] = useState()
  const [loading, setLoading]  = useState(false)
  const [refresh, setRefresh]  = useState('ok')
  const [userName,setUserName] = useState("Guest")

  useEffect( () => {
     axios
      .get("https://arzun.onrender.com/tasks/alltask" ,{withCredentials:true})
      .then((res) =>  {setTask(res.data.alluserTask), setUserName(res.data.userData.name)})
      .catch((err) => console.log(err));
  }, [refresh]);
  

  const logout = async () => {
    await axios
      .get("https://arzun.onrender.com/users/logout", { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message), setAuthnecated(true);
      })
      .catch((err) => console.log(err));
  };



  const addTodo = async (e) => {
    setLoading(true)
    setRefresh('nk')
   e.preventDefault();
   try {
     const { data } = await axios.post(
       `https://arzun.onrender.com/tasks/addtask`,
       {
         description,
       },
       {
         withCredentials: true,
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
      setDescription('')
     toast.success(data.message);
   } catch (error) {
     console.log(error.response);
   }
   setLoading(false)
   setRefresh('dk')
 };

const deleteTodo = async(task_id)=>{
   setRefresh('tk')
   await axios.delete(`https://arzun.onrender.com/tasks/${task_id}`,{withCredentials:true})
   .then(res => toast.success(res.data.message))
   .catch(err =>  toast.error(err.response.data.message))

   setRefresh('pk')
}

function handleDrag(result)
    {
        if(result.destination == null)
       {}
  else {
      const itemCopy = Array.from(task)
     const [recoveredItem] = itemCopy.splice(result.source.index,1);
      itemCopy.splice(result.destination.index,0,recoveredItem)
     setTask(itemCopy);
  }       
    }       


  return (
    <>
      {authneciated ? (
        <>
          <Navigate to={"/login"} />
        </>
      ) : (
        <>
          <div className="flex absolute right-5 top-2 justify-center items-center  ">
          <Link to={"/userInfo"}> 
            <div className="h-11 w-11 rounded-full bg-gray-400 flex justify-center items-center">
             {userName[0].toUpperCase()}
            </div>
            </Link>
            <button className=" underline ml-2" onClick={() => logout()}>
              Logout
            </button>
          </div>

          <h1 className=" text-center mt-12 text-[50px]">{`${userName.charAt(0).toUpperCase() +userName.slice(1)} Todo's `}</h1>
          <div className="  w-full h-full flex justify-center mt-[35px]">
            <form onSubmit={addTodo}>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text "
                placeholder="Add Task . . ."
                className=" indent-2  w-[280px] h-[30px] rounded-full"
               value={description}
               disabled={loading}
              />
            </form>
          </div>
          <div className="TodoContainer flex justify-center mt-7">
          <DragDropContext onDragEnd={handleDrag}>
                        <Droppable droppableId='Todos'>
                            {(provided) => (
                                <ul {...provided.droppableProps}  ref={provided.innerRef}>
                                    {task?.map((e, index) => {
                                        return(
                                        <Draggable index={index} key={e._id} draggableId={e._id}>
                                            {(provided , snapshot) => (
                                                <li  className={ ` p-1 flex m-1 rounded-full   select-none bg-slate-400 w-[280px]  `+`${snapshot.isDragging && "dragging"}` }  {...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                                                    <span className='  grow  text-black  indent-2'> {e.description} </span> <button  className=" w-5 h-5 rounded-full bg-black  text-slate-400 mt-[2px] mr-1 hover:bg-red-600  "    onClick={()=> deleteTodo(e._id)} >X</button>
                                                </li>
                                            )}
                                        </Draggable>
                                        )
                                    })}

                                    {provided.placeholder}
                                </ul>
                            )
                            }
                        </Droppable>
                    </DragDropContext>
          </div>
        </>
      )}
    </>
  );
};

export default Todo;
