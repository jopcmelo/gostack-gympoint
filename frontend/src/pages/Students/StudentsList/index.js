import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Container from '~/components/Container';
import { Title, Content, Table, LoadingLine, TableFooter } from './styles';

import api from '~/services/api';

export default function StudentsList() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const response = await api.get('students', {
          params: {
            page,
          },
        });

        setStudents(response.data);
      } catch (error) {
        toast.error('Não foi possível carregar os alunos');
      }

      setLoading(false);
    }

    loadStudents();
  }, [page]);

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <Title>
        <h1>Lista de alunos</h1>

        <div>
          <Link to="/students/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
          <TextInput
            type="text"
            name="search"
            placeholder="Pesquisar por alunos"
          />
        </div>
      </Title>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>editar excluir</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Content>
      <TableFooter>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => decrementPage()}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          type="button"
          disabled={students.length < 20}
          onClick={() => incrementPage()}
        >
          Próximo
        </button>
      </TableFooter>
    </Container>
  );
}
