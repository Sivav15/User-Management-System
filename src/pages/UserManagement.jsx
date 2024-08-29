import React from 'react'
import UsersTable from '../components/UsersTable'
import NavigationBar from '../components/NavigationBar'

function UserManagement() {
    return (
        <div>
            <NavigationBar />
            <UsersTable />
        </div>
    )
}

export default UserManagement