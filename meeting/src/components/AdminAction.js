import React from 'react';
import { Link } from 'react-router-dom';
import UpdateUser from '../pages/UpdateUser';
import AddKeyword from '../pages/addKeyword';

export default function AdminAction() {
  return (
    <ul className="nav nav-pills navbar navbar-expand-sm p-2 bg-light">
        <li class="nav-item ">
          <a class="nav-link active" aria-current="page" href="/Admin">Admin</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Update User</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/UpdateUser">Delete User</a></li>
            {/* <li><hr class="dropdown-divider"/></li> */}
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Keyword</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/AddKeyword">Add Keyword</a></li>
            <li><a class="dropdown-item" href="/UpdateUser">Delete Keyword</a></li>
            {/* <li><hr class="dropdown-divider"/></li> */}
          </ul>
        </li>
    </ul>
  );
}
