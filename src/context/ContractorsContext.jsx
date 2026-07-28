import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createContractor as createContractorRequest,
  deleteContractor as deleteContractorRequest,
  getContractors,
  updateContractor as updateContractorRequest,
} from '../api/contractorsApi';

const ContractorsContext = createContext(null);

export function ContractorsProvider({ children }) {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContractors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getContractors();
      setContractors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContractors();
  }, [loadContractors]);

  const addContractor = useCallback(async (data) => {
    setError(null);

    try {
      const created = await createContractorRequest(data);
      setContractors((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateContractor = useCallback(async (id, data) => {
    setError(null);

    try {
      const updated = await updateContractorRequest(id, data);
      setContractors((prev) =>
        prev.map((contractor) => (contractor.id === id ? updated : contractor)),
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteContractor = useCallback(async (id) => {
    setError(null);

    try {
      await deleteContractorRequest(id);
      setContractors((prev) => prev.filter((contractor) => contractor.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      contractors,
      loading,
      error,
      loadContractors,
      addContractor,
      updateContractor,
      deleteContractor,
    }),
    [
      contractors,
      loading,
      error,
      loadContractors,
      addContractor,
      updateContractor,
      deleteContractor,
    ],
  );

  return (
    <ContractorsContext.Provider value={value}>
      {children}
    </ContractorsContext.Provider>
  );
}

export function useContractors() {
  const context = useContext(ContractorsContext);

  if (!context) {
    throw new Error('useContractors must be used within ContractorsProvider');
  }

  return context;
}
