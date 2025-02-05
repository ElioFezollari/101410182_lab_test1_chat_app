import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/API';
import { useNavigate } from 'react-router';


function SideChat({setSelectedGroup,setSelectedUser}) {
  const [groupsOpen, setGroupsOpen] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate()
  const fetchUsers = async () => {
    try {
      const data = await getUsers(); 
      setUsers(data.data.users); 
      console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
      fetchUsers(); 
  }, []);
  return (
    <div className='side-chat'>
      <div className='rooms'>
        <h1 onClick={() => setGroupsOpen(!groupsOpen)}>Groups</h1>

        {groupsOpen && (
          <div>
            <button onClick={()=>{setSelectedGroup("Devops");setSelectedUser(null)}}><h2>DevOps</h2></button>
            <button onClick={()=>{setSelectedGroup("Cloud Computing");setSelectedUser(null)}}><h2>Cloud Computing</h2></button>
            <button onClick={()=>{setSelectedGroup("Covid 19");setSelectedUser(null)}}><h2>Covid 19</h2></button>
            <button onClick={()=>{setSelectedGroup("Sports");setSelectedUser(null)}}><h2>Sports</h2></button>
            <button onClick={()=>{setSelectedGroup("NodeJS");setSelectedUser(null)}}><h2>Node JS</h2></button>
          </div>
        )}
      </div>
      <div className='users'>
        <h1 onClick={() => setDmOpen(!dmOpen)}>Direct Message</h1>
        {dmOpen && users.length>0 && (
          <div>
            {users.length > 0 ? (
              users.map((user, index) => (
                <button key={index} onClick={()=>{setSelectedGroup(null);setSelectedUser(user.username)}}>
                  <h2>{user.username}</h2> 
                </button>
              ))
            ) : (
              <p>No users found</p> 
            )}
          </div>
        )}
        
      </div>
      <div className='log-out' onClick={()=>{localStorage.clear();navigate("/")}}>Log out</div>
    </div>
  );
}

export default SideChat;
