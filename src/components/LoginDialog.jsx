import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';

const LoginDialog = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginauth, setLoginauth,setIsLoginDialogOpen,isLoginDialogOpen } = useContext(UserContext);

  const handleLogin = async () => {
    try {
    //   setLoginauth(`${username}:${password}`);
      setIsLoginDialogOpen(!isLoginDialogOpen);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('logincred', `${username}:${password}`);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center bg-gray-300 bg-opacity-45">
  <div className="bg-white rounded-lg overflow-hidden shadow-xl mt-10">
    <div className="p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Login</h3>
      <div className="mt-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
    <div className="px-4 py-3 bg-gray-50 flex justify-end">
      <button
        onClick={handleLogin}
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login
      </button>
    </div>
  </div>
</div>

  );
};

export default LoginDialog;
