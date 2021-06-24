import { useState, useEffect } from 'react';

const useUserAccounts = function useUserAccounts(token) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://api.spacetraders.io/my/account?token=${token}`)
      .then((r) => r.json())
      .then((userResponse) => setUsers((u) => [...u, userResponse.user]));
  }, [token]);

  return users;
};

export default useUserAccounts;
