import React, { useContext } from 'react';

import AccountAddForm from '../../components/AccountAddForm';
import AccountEditForm from '../../components/AccountEditForm';
import Modal from '../../components/Modal';

import PencilSvg from '../../svg/PencilSvg';
import PlusSvg from '../../svg/PlusSvg';
import TrashSvg from '../../svg/TrashSvg';

import { AppContext } from '../../contexts/AppProvider';
import useAccounts from './useAccounts';

import { Container, Filters } from './styles';

const Accounts: React.FC = () => {
  const { setModal, currentModal } = useContext(AppContext);

  const {
    accounts,
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
  } = useAccounts();

  return (
    <Container className="container">
      <div className="title">
        <h1>Contas</h1>

        <div className="tools">
          <button type="button" onClick={handleAddAccount}>
            <PlusSvg />
          </button>
        </div>
      </div>

      <Filters>
        <h3>Filtros</h3>
        <li>
          <label htmlFor="filter-group">Grupo</label>
          <select
            id="filter-group"
            name="group_id"
            value={filterData.group_id}
            onChange={handleFilterChange}
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
          <label htmlFor="filter-subgroup">Subgrupo:</label>
          <select
            id="filter-subgroup"
            name="subgroup_id"
            value={filterData.subgroup_id}
            onChange={handleFilterChange}
          >
            <option value=""></option>
            {subgroups.map((subgroup) => (
              <option value={subgroup.id} key={subgroup.id}>
                {subgroup.name}
              </option>
            ))}
          </select>
        </li>
      </Filters>

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
          <div className="card-buttons">
            <button type="button" onClick={() => handleEditAccount(account)}>
              <PencilSvg />
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => handleDeleteAccount(account.id)}
            >
              <TrashSvg />
            </button>
          </div>
        </ul>
      ))}

      {currentModal === 'add' && (
        <Modal>
          <AccountAddForm
            groups={groups}
            subgroups={subgroups}
            handleAddSubmit={handleAddSubmit}
          />
        </Modal>
      )}
      {currentModal === 'edit' && (
        <Modal>
          <AccountEditForm
            groups={groups}
            subgroups={subgroups}
            account={editAccount}
            handleEditSubmit={handleEditSubmit}
          />
        </Modal>
      )}
      {currentModal === 'delete' && (
        <Modal>
          <h2>Excluir Conta</h2>

          <form action="" onSubmit={handleDeleteSubmit}>
            <ul>
              <li className="center">Tem certeza que deseja excluir?</li>
              <li>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => setModal(false)}
                >
                  Não
                </button>
                <button type="submit" className="btn-primary">
                  Sim
                </button>
              </li>
            </ul>
          </form>
        </Modal>
      )}
    </Container>
  );
};

export default Accounts;
