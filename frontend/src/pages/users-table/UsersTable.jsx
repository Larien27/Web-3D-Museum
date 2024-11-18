function UsersTable() {
    return(
        <div id='users-table'>
            <h1>Manage Users</h1>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>userno1</td>
                    <td>Visitor</td>
                    <td>PROMOTE</td>
                    <td>EDIT</td>
                    <td>DELETE</td>
                </tr>
            </table>
        </div>
    );
}

export default UsersTable;