import { useState, useEffect } from 'react';

const useLoans = function useLoans(token) {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch(`https://api.spacetraders.io/types/loans?token=${token}`)
      .then((r) => r.json())
      .then((jsonResponse) => setLoans((l) => [...l, ...jsonResponse.loans]));
  }, [token]);

  return loans;
};

export default useLoans;
