import { useEffect, useState } from 'react';
import axios from 'axios';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    });

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            alert('Failed to delete user.');
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className='error'>{error}</p>;

    return(
        <div id='users-table'>
            <h1>Manage Users</h1>
            
            {users.length > 0 ? (
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {users.map((user) => (
                        <tr>
                            <td>{user.username}</td>
                            <td>Visitor</td>
                            <td>PROMOTE</td>
                            <td>EDIT</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </table>
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
}

export default UsersTable;