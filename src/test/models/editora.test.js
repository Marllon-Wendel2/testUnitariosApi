import { describe, expect, it } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'Pernambuco',
    email: 'cdc.com',
  };

  it('Deve instaciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar editora no DB', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });
});
