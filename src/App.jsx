import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [edicoes, setEdicoes] = useState([]);
  const [contato, setContato] = useState({ nome: "", email: "" });
  const [mensagem, setMensagem] = useState("");

  // Carregar edições ordenadas pela mais recente
  useEffect(() => {
    axios
      .get("https://jornal-oregional-backend.onrender.com/edicoes")
      .then((res) => {
        const ordenadas = [...res.data].sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setEdicoes(ordenadas);
      })
      .catch((err) => console.error("Erro ao carregar edições", err));
  }, []);

  // Enviar formulário de contato
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://jornal-oregional-backend.onrender.com/contatos",
        contato
      );
      setMensagem("Cadastro realizado com sucesso!");
      setContato({ nome: "", email: "" });
    } catch (err) {
      console.error("Erro ao enviar contato", err);
      setMensagem("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="App">
      {/* Cabeçalho */}
      <header className="header">
        <h1>O Regional</h1>
        <p>Informação séria e de qualidade, toda semana.</p>
      </header>

      <main>
        {/* Edição Atual */}
        <section className="edicao-atual">
          <h2>Edição Atual</h2>
          {edicoes.length > 0 ? (
            <a
              href={edicoes[edicoes.length - 1].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {edicoes[edicoes.length - 1].nome}
            </a>
          ) : (
            <p>Nenhuma edição disponível no momento.</p>
          )}
        </section>

        {/* Podcast */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#e60026] mb-2 flex items-center">
            PQN? Podcast <span className="ml-2">🎙️</span>
          </h2>
          <p className="text-gray-700 mb-4">
            Ouça nosso podcast semanal com entrevistas, notícias e análises no
            YouTube.
          </p>
          <a
            href="https://www.youtube.com/@PGN9EditoraPraiaGrande"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#e60026] text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
          >
            ▶ Assistir no YouTube
          </a>
        </section>

        {/* Formulário de Contato */}
        <section className="contato">
          <h2>Receba por e-mail</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Seu nome"
              value={contato.nome}
              onChange={(e) =>
                setContato({ ...contato, nome: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={contato.email}
              onChange={(e) =>
                setContato({ ...contato, email: e.target.value })
              }
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
          {mensagem && <p className="sucesso">{mensagem}</p>}
        </section>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} O Regional - Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
