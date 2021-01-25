import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import api from '../../api';
import { AppContext } from '../../AppProvider';
import { IAccount, IAccountRequest, IGroup, ISubroup } from '../../interfaces';

interface IUseAccounts {
  accounts: IAccount[];
  groups: IGroup[];
  addAccountData: IAccountRequest;
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  availableSubgroups: ISubroup[];
  handleAccountSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvailableSubgroups: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleAvailableGroups: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function useAccounts(): IUseAccounts {
  const { setLoading, setError, setErrorMessage } = useContext(AppContext);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [subgroups, setSubgroups] = useState<ISubroup[]>([]);
  const [availableSubgroups, setAvailableSubgroups] = useState<ISubroup[]>([]);

  const [addModal, setAddModal] = useState<boolean>(false);
  const [addAccountData, setAccountData] = useState<IAccountRequest>({
    name: '',
    group_id: '',
    subgroup_id: '',
  });

  const handleCloseAllModals = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') setAddModal(false);
  };

  useEffect(() => {
    window.addEventListener('keyup', handleCloseAllModals);

    return () => {
      window.removeEventListener('keyup', handleCloseAllModals);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    api.accounts().then((response) => {
      if (response.success) {
        setAccounts(response.data.accounts);
        setGroups(response.data.groups);
        setSubgroups(response.data.subgroups);
        setLoading(false);
      }
    });
  }, [setLoading]);

  const handleAvailableSubgroups = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      const group: number = parseInt(event.target.value);
      const availables = subgroups.filter(
        (subgroup) => subgroup.group_id === group
      );
      setAvailableSubgroups(availables);
      setAccountData((prev) => ({ ...prev, group_id: group, subgroup_id: '' }));
    } else {
      setAvailableSubgroups([]);
      setAccountData((prev) => ({ ...prev, group_id: '', subgroup_id: '' }));
    }
  };

  const handleAvailableGroups = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      const subgroup: number = parseInt(event.target.value);

      setAccountData((prev) => ({
        ...prev,
        subgroup_id: subgroup,
      }));
    } else {
      setAccountData((prev) => ({
        ...prev,
        subgroup_id: '',
      }));
    }
  };

  const handleAccountSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    api.accountStore(addAccountData).then((response) => {
      if (response.success) {
        setAccounts((prev) => [...prev, response.data]);
        setAddModal(false);
      } else {
        setError(true);
        setErrorMessage(response.errors);
      }
      setLoading(false);
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAccountData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    accounts,
    groups,
    addAccountData,
    addModal,
    setAddModal,
    availableSubgroups,
    handleAccountSubmit,
    handleInputChange,
    handleAvailableGroups,
    handleAvailableSubgroups,
  };
}
