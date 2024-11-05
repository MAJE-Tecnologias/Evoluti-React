import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FaMoon, FaSun } from 'react-icons/fa';
import FancyText from '@carefully-coded/react-text-gradient';
import { login } from '../../services/authServices';  // Importar o serviço de autenticação

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [tipo, setTipo] = useState('password');
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark', modoEscuro);
  }, [modoEscuro]);

  const toggleDarkMode = () => setModoEscuro(!modoEscuro);

  const esconderSenha = () =>
    setTipo(tipo === 'password' ? 'text' : 'password');

  const passarLogin = async (e) => {
    e.preventDefault();

    if (validaLogin()) {
      try {
        const { usuario, clinica, nivel } = await login(email, senha);

        sessionStorage.setItem('idClinica', usuario.fk_clinica);
        sessionStorage.setItem('idUsuario', usuario.id);

        if (usuario.stats === false) {
          window.alert('Espere liberação de acesso de seu administrador');
        } else {
          switch (nivel) {
            case 0:
              navigate('/AdminHome');
              break;
            case 2:
              navigate('/FuncHome');
              break;
            default:
              console.log('Nível de acesso desconhecido.');
          }
        }
      } catch (error) {
        if (error.message === 'E-mail não encontrado.') {
          setEmailError(error.message);
        } else if (error.message === 'Senha incorreta.') {
          setSenhaError(error.message);
        } else {
          console.log('Error:', error);
        }
      }
    }
  };

  const validaLogin = () => {
    setEmailError('');
    setSenhaError('');

    let estaValido = true;

    if (!email.trim()) {
      setEmailError('E-mail é obrigatório');
      estaValido = false;
    } else if (!isValidEmail(email)) {
      setEmailError('E-mail inválido');
      estaValido = false;
    }

    if (!senha.trim()) {
      setSenhaError('Senha é obrigatória');
      estaValido = false;
    }

    return estaValido;
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const redirectCadastro = () => navigate('/Cadastro');

  const redirectCadastroCod = () => navigate('/CadastroCod');

  return (
    <main
      className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] transition-all bg-cover w-screen 
        h-screen flex items-center justify-center"
    >
      <img
        src="src/assets/Nova_Logo_Verde.svg"
        className="absolute w-1/12 top-0 left-0 m-5"
        alt="Logo"
      />
      <section className="flex w-full h-full">
        <div className="w-1/2 py-24 px-12 h-full rounded flex flex-col items-center justify-center gap-y-4">
          <div className="w-full">
            <div className="flex-col space-y-4 text-center">
              <h1 className="text-evolutiDarkBlueText font-semibold text-5xl mb-3 sm:text-nowrap dark:text-evolutiLightBlueText">
                Bem-vindo de volta!
              </h1>
              <span className="font-medium text-2xl md:text-nowrap dark:text-white">
                Transforme com o{' '}
                <FancyText
                  gradient={{
                    from: '#30EED6',
                    to: '#30A8EE',
                    type: 'linear',
                  }}
                  animate
                  animateDuration={1000}
                >
                  Evoluti.
                </FancyText>
              </span>
            </div>

            <div className="flex w-full justify-center gap-x-4">
              <div className="flex flex-col w-1/2 text-center gap-y-2">
                <p className="mt-10 text-nowrap dark:text-white">
                  Não possui uma clínica?
                </p>
                <button
                  onClick={redirectCadastro}
                  className="border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-full h-12 rounded font-medium 
                    transition-all hover:bg-evolutiLightGreen hover:text-white"
                >
                  Cadastre sua clínica!
                </button>
              </div>
              <div className="flex flex-col w-1/2 text-center gap-y-2">
                <p className="mt-10 dark:text-white text-nowrap">
                  Possui um código de acesso?
                </p>
                <button
                  onClick={redirectCadastroCod}
                  className="border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-full h-12 rounded font-medium 
                    transition-all hover:bg-evolutiLightGreen hover:text-white"
                >
                  Faça o primeiro acesso!
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 py-24 px-12 h-full flex flex-col items-center justify-center">
          <form
            onSubmit={passarLogin}
            className="flex flex-col w-full items-center justify-center space-y-8 md:w-2/3"
          >
            <h1 className="font-medium text-4xl text-center md:text-nowrap dark:text-white">
              Entrar
            </h1>

            <div className="w-full relative">
              <input
                type="email"
                placeholder="E-mail"
                name="emailLogin"
                className={`peer w-full placeholder-transparent bg-loginButtonsBackground 
                    border ${
                      emailError ? 'border-red-500' : 'border-evolutiLightGreen'
                    } placeholder-evolutiGreen 
                    p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <span className="text-red-500 text-xs mt-1">{emailError}</span>
              )}
              <label
                htmlFor="emailLogin"
                className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                    peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
              >
                E-mail
              </label>
            </div>

            <div className="w-full relative">
              <div className="w-full relative flex">
                <input
                  type={tipo}
                  placeholder="Insira a senha"
                  name="senhaLogin"
                  className={`peer w-full placeholder-transparent bg-loginButtonsBackground 
                    border ${
                      senhaError ? 'border-red-500' : 'border-evolutiLightGreen'
                    } placeholder-evolutiGreen 
                    p-3.5 pr-16 rounded-lg shadow-md focus:outline-evolutiGreenDarker`}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer transition-all m-[1px] 
                    border-l rounded-tr-lg rounded-br-lg border-evolutiLightGreen px-3 text-evolutiGreen
                    hover:text-evolutiGreenDarker hover:bg-gray-200"
                  onClick={esconderSenha}
                >
                  {tipo === 'password' ? (
                    <IoEyeOff
                      size={24}
                      className="cursor-pointer transition-colors"
                    />
                  ) : (
                    <IoEye
                      size={24}
                      className="cursor-pointer transition-colors"
                    />
                  )}
                </div>
                <label
                  htmlFor="senhaLogin"
                  className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                    peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                >
                  Senha
                </label>
              </div>
              {senhaError && (
                <span className="text-red-500 text-xs mt-1">{senhaError}</span>
              )}
              <div className="flex justify-end">
                <p
                  className="w-fit mt-4 text-xs cursor-pointer transition-all text-right md:text-nowrap 
                      hover:font-bold hover:underline dark:text-white"
                >
                  Esqueceu a senha?
                </p>
              </div>
            </div>

            <input
              type="submit"
              value="Entrar"
              className="bg-evolutiLightGreen text-white w-full h-12 rounded font-medium transition-all cursor-pointer hover:bg-evolutiGreenDarker hover:shadow-xl"
            />
          </form>
        </div>
        <button
          onClick={toggleDarkMode}
          className="fixed flex justify-center transition-all items-center top-0 right-0 m-5 font-bold 
            bg-gray-800 text-white px-4 py-2 rounded-full shadow-md dark:bg-white dark:text-evolutiDarkBlueText"
        >
          {modoEscuro ? (
            <>
              <FaSun className="mr-2" /> Modo Claro
            </>
          ) : (
            <>
              <FaMoon className="mr-2" /> Modo Escuro
            </>
          )}
        </button>
      </section>
    </main>
  );
}
