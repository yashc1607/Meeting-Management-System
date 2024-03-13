import React from 'react'
import { Link } from 'react-router-dom'

export default function header() {
    return (
      <header className='bg-slate-200'>
          <div >
              <h1> 
                  
                    <div className='text-3xl font-semibold text-center lh-lg'>Meeting Management System</div>
                
              </h1>
          </div>
      </header>
    )
  }