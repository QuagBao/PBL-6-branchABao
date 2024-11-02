<template>
  <div class="user-management">
    <h2>User Management</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Country</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.salary }}</td>
          <td>{{ user.country }}</td>
          <td>{{ user.city }}</td>
          <td>
            <button class="action-button edit-button" @click="editUser(user)">
              Edit
            </button>
            <button
              class="action-button delete-button"
              @click="removeUser(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="update-profile-button">Update Profile</button>
    <!-- Form for adding/editing user can go here -->
  </div>
</template>

<script>
import {
  fetchUsers,
  createUser,
  modifyUser,
  removeUser,
} from "@/controllers/UserManagementController";

export default {
  data() {
    return { users: fetchUsers() };
  },
  methods: {
    removeUser(id) {
      removeUser(id);
      this.users = fetchUsers();
    },
    editUser(user) {
      // Logic to edit user
    },
  },
};
</script>

<style scoped>
.user-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; /* Light background for the entire section */
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

h2 {
  margin-bottom: 20px;
  color: #333; /* Darker color for better readability */
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; /* Space between the table and buttons */
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.user-table tr:hover {
  background-color: #f1f1f1; /* Light hover effect on rows */
}

.action-button {
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
  transform: scale(1.05); /* Slight scale effect on hover */
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
  transform: scale(1.05); /* Slight scale effect on hover */
}

.update-profile-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
}

.update-profile-button:hover {
  background-color: #218838;
  transform: scale(1.05); /* Slight scale effect on hover */
}
</style>
