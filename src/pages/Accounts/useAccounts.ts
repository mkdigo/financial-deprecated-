import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../contexts/AppProvider';
import AccountApi, { IAccount, IAccountBody } from '../../api/AccountApi';
import { IGroup } from '../../api/GroupApi';
import { ISubgroup } from '../../api/SubgroupApi';

interface IUseAccounts {
  accounts: IAccount[];
  setAccounts: React.Dispatch<IAccount[]>;
  groups: IGroup[];
  subgroups: ISubgroup[];
  filterData: IFilter;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddAccount: () => void;
  handleAddSubmit: (data: IAccountBody) => void;
  editAccount: IAccountBody;
  handleEditAccount: (account: IAccount) => void;
  handleEditSubmit: (data: IAccountBody) => void;
  handleDeleteAccount: (id: number) => void;
  handleDeleteSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface IFilter {
  group_id: number | '';
  subgroup_id: number | '';
}

export default function useAccounts(): IUseAccounts {
  const { setLoading, done, setModal, setCurrentModal, handleError } =
    useContext(AppContext);

  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [subgroups, setSubgroups] = useState<ISubgroup[]>([]);
  const [filterData, setFilterData] = useState<IFilter>({
    group_id: '',
    subgroup_id: '',
  });
  const [editAccount, setEditAccount] = useState<IAccountBody>({
    id: 0,
    name: '',
    group_id: '',
    subgroup_id: '',
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    AccountApi.get(filterData.group_id, filterData.subgroup_id).then(
      (response) => {
        if (response.success && response.data) {
          setAccounts(response.data.accounts);
          setGroups(response.data.groups);
          setSubgroups(response.data.subgroups);
          setLoading(false);
        }
      }
    );
  }, [setLoading, filterData]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilterData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddAccount = (): void => {
    setCurrentModal('add');
    setModal(true);
  };

  const handleAddSubmit = (data: IAccountBody): void => {
    setLoading(true);
    AccountApi.store(data).then((response) => {
      if (response.success && response.data) {
        const newAccounts = accounts;
        newAccounts.unshift(response.data);
        setAccounts(newAccounts);
        setModal(false);
        done();
      } else {
        handleError(
          response.message ?? 'Algo de errado aconteceu. Tente novamente.'
        );
      }
      setLoading(false);
    });
  };

  const handleEditAccount = (account: IAccount): void => {
    setCurrentModal('edit');
    setModal(true);
    setEditAccount({
      id: account.id,
      name: account.name,
      group_id: account.group_id,
      subgroup_id: account.subgroup_id,
    });
  };

  const handleEditSubmit = (data: IAccountBody): void => {
    if (data.id) {
      setLoading(true);

      AccountApi.update(data.id, data).then((response) => {
        if (response.success && response.data) {
          const newAccounts = accounts.map((account) => {
            if (account.id === response.data?.id) return response.data;
            return account;
          });
          setAccounts(newAccounts);
          setModal(false);
          done();
        } else {
          handleError(
            response.message ?? 'Algo de errado aconteceu. Tente novamente.'
          );
        }
        setLoading(false);
      });
    }
  };

  const handleDeleteAccount = (id: number): void => {
    setCurrentModal('delete');
    setModal(true);
    setDeleteId(id);
  };

  const handleDeleteSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setLoading(true);

    if (deleteId) {
      AccountApi.destroy(deleteId).then((response) => {
        if (response.success) {
          const newAccounts = accounts.filter(
            (account) => account.id !== deleteId
          );
          setAccounts(newAccounts);
          setModal(false);
          done();
        } else {
          handleError(
            'Você não pode excluir essa conta! Uma conta só pode ser excluida se não houver lançamentos com ela. Exclua todos os lançamentos que usa essa conta antes.'
          );
        }
        setLoading(false);
      });
    } else {
      handleError('Nenhuma conta foi seleciona, tente novamente.');
    }
  };

  return {
    accounts,
    setAccounts,
    groups,
    subgroups,
    filterData,
    handleFilterChange,
    handleAddAccount,
    handleAddSubmit,
    editAccount,
    handleEditAccount,
    handleEditSubmit,
    handleDeleteAccount,
    handleDeleteSubmit,
  };
}
