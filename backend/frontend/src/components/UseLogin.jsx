import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function UseLogin  () {

  const navigate =  useNavigate()

  const goToLogin = () => navigate("/login");
 

  return {
    goToLogin,
  };
}

