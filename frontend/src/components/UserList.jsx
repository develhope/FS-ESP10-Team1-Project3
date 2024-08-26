// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.user_id}>{user.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default UserList;
