import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../../app';

let server;
const port = 3000;
server = app.listen(port);

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;
describe('POST em /editoras', () => {
  it('Deve retornar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Pernambuco',
        email: 's@s.com',
      })
      .expect(201);
    idResposta = resposta.body.content.id;
  });
  it('Deve não adicionar nada ao passa body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET em /editoras/id', () => {
  it('Deve retorna o recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /editoras/id', () => {
  it.each([
    ['nome', { nome: 'Casa do codigo' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com'}],
  ])('Deve alterar o campo %s', async (cheve, param) => {
    await request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);
  });
});

describe('Delete em /editoras', () => {
  it('Delete o recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
