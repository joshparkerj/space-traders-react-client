import { useState, useEffect } from 'react';

const useUserAccount = function useUserAccount(token) {
  const [user, setUser] = useState({
    credits: 0,
    joinedAt: '',
    shipCount: 0,
    structureCount: 0,
    username: ''
  });

  useEffect(() => {
    fetch(`https://api.spacetraders.io/my/account?token=${token}`)
      .then(r => r.json())
      .then(userResponse => setUser(userResponse.user));
  }, [token]);

  return user;
}

export default useUserAccount;
