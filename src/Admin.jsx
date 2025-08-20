import React, { useState } from 'react';

const SENHA = 'pgn9regional';

function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');
  const [titulo, setTitulo] = useState('');
  const [link, setLink] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (senha === SENHA) {
      setAutenticado(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaEdicao = { titulo, link };

    try {
      const res = await fetch('http://localhost:3001/api/edicoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaEdicao),
      });

      if (res.ok) {
        setMensagem('✅ Edição cadastrada com sucesso!');
        setTitulo('');
        setLink('');
      } else {
        setMensagem('❌ Erro ao cadastrar edição.');
      }
    } catch (err) {
      console.error(err);
      setMensagem('❌ Erro ao conectar com o servidor.');
    }
  };

  if (!autenticado) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Área Administrativa</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-[#2c2c9c] text-white px-4 py-2 rounded w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Administração</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título da edição"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="Link para o PDF (Google Drive)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Salvar edição
        </button>
      </form>
      {mensagem && <p className="mt-4">{mensagem}</p>}
    </div>
  );
}

export default Admin;
