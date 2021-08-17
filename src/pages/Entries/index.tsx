import React from 'react';

import EntryAdd from '../../components/EntryAdd';
import EntryEdit from '../../components/EntryEdit';
import Modal from '../../components/Modal';

import PencilSvg from '../../svg/PencilSvg';
import PlusSvg from '../../svg/PlusSvg';
import SearchSvg from '../../svg/SearchSvg';
import TrashSvg from '../../svg/TrashSvg';

import { numberFormat } from '../../helpers';
import useAppContext from '../../hooks/useAppContext';
import useEntries from './useEntries';

import { Container } from './styles';

const Entries: React.FC = () => {
  const {
    search,
    accounts,
    handleSetCurrentModal,
    entries,
    handleSetEntries,
    handleSearchSubmit,
    handleSearchInputChange,
    editEntry,
    handleEditModal,
    handleDeleteModal,
    handleDeleteSubmit,
  } = useEntries();

  const { setModal, currentModal } = useAppContext();

  return (
    <Container className="container">
      <div className="title">
        <h1>Lançamentos</h1>

        <div className="tools">
          <button type="button" onClick={() => handleSetCurrentModal('add')}>
            <PlusSvg />
          </button>
        </div>
      </div>

      <section className="filters">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={search}
            onChange={handleSearchInputChange}
            placeholder="Busca"
          />
          <button type="submit">
            <SearchSvg />
          </button>
        </form>
      </section>

      <section className="data">
        {entries.map((entry) => (
          <ul className="card" key={entry.id}>
            <li>
              <strong>Data:</strong>
              {entry.date}
            </li>
            <li>
              <strong>Débito:</strong>
              {entry.debit_name}
            </li>
            <li>
              <strong>Crédito:</strong>
              {entry.credit_name}
            </li>
            <li>
              <strong>Valor:</strong>
              {numberFormat(entry.value)}
            </li>
            <li>
              <strong>Notas:</strong>
              <span style={{ whiteSpace: 'pre' }}>{entry.note}</span>
            </li>
            <div className="card-buttons">
              <button type="button" onClick={() => handleEditModal(entry)}>
                <PencilSvg />
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => handleDeleteModal(entry.id)}
              >
                <TrashSvg />
              </button>
            </div>
          </ul>
        ))}
      </section>

      {currentModal === 'add' && (
        <Modal>
          <EntryAdd accounts={accounts} handleSetEntries={handleSetEntries} />
        </Modal>
      )}

      {currentModal === 'edit' && editEntry && (
        <Modal>
          <EntryEdit
            accounts={accounts}
            handleSetEntries={handleSetEntries}
            entry={editEntry}
          />
        </Modal>
      )}

      {currentModal === 'delete' && (
        <Modal>
          <h2>Excluir Lançamento</h2>

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

export default Entries;
