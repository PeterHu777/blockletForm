// import { useState } from 'react';
// import reactLogo from '../assets/react.svg';
// import blockletLogo from '../assets/blocklet.svg';
// import viteLogo from '../assets/vite.svg';
import './home.css';
// import api from '../libs/api';
import UserInfoForm from './components/userInfoForm';

function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-xl w-full p-4 md:p-8 lg:p-12 text-center">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        <UserInfoForm />
      </div>
    </div>
  );
}

export default Home;
