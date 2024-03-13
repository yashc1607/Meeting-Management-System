import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Signin() {
    return (
      <Link to={"/Signin"}>
            <span className='text-blue-700'>Signin </span>
      </Link>
    )
  }