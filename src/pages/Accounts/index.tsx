import React from 'react';
import PlusSvg from '../../svg/PlusSvg';

import { Container } from './styles';
import useAccounts from './useAccounts';

const Accounts: React.FC = () => {
  const {
    accounts,
    addAccountData,
    groups,
    availableSubgroups,
    addModal,
    setAddModal,
    handleAccountSubmit,
    handleInputChange,
    handleAvailableSubgroups,
    handleAvailableGroups,
  } = useAccounts();

  return (
    <Container className="container">
      <div className="title">
        <h1>Contas</h1>

        <div className="tools">
          <button type="button" onClick={() => setAddModal(true)}>
            <PlusSvg />
          </button>
        </div>
      </div>

      {accounts.map((account) => (
        <ul className="card" key={account.id}>
          <li>
            <strong>Nome:</strong>
            {account.name}
          </li>
          <li>
            <strong>Grupo:</strong>
            {account.group}
          </li>
          <li>
            <strong>Subgrupo:</strong>
            {account.subgroup}
          </li>
        </ul>
      ))}

      {addModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Conta</h2>

            <form action="" onSubmit={handleAccountSubmit}>
              <ul>
                <li>
                  <label htmlFor="add-account-name">Nome:</label>
                  <input
                    type="text"
                    id="add-account-name"
                    name="name"
                    onChange={handleInputChange}
                  />
                </li>
                <li>
                  <label htmlFor="add-account-group">Grupo:</label>
                  <select
                    value={addAccountData.group_id}
                    onChange={handleAvailableSubgroups}
                    id="add-account-group"
                    name="group_id"
                  >
                    <option value=""></option>
                    {groups.map((group) => (
                      <option value={group.id} key={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <label htmlFor="add-account-subgroup">Subgrupo:</label>
                  <select
                    value={addAccountData.subgroup_id}
                    onChange={handleAvailableGroups}
                    id="add-account-subgroup"
                    name="subgroup_id"
                  >
                    <option value=""></option>
                    {availableSubgroups.map((subgroup) => (
                      <option value={subgroup.id} key={subgroup.id}>
                        {subgroup.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setAddModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Adicionar
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Accounts;
