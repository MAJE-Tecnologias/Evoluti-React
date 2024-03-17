export default function CadastroAdmKey() {
  return (
    <>
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center px-24">
        <section className="bg-white h-full w-full rounded-3xl flex items-center justify-center   ">
          <div className="w-full h-full rounded-3xl p-10 flex flex-col items-center">
            <img src="src/assets/Logo_Sem_fundo.png" alt="" className="w-1/6" />

            <div>
              <div className="flex w-full items-center justify-center gap-x-16 mt-5">
                <div className="flex gap-x-5">
                  <label className="font-bold">Nome Completo: </label>
                  <p id="nomeCompleto">Nome Completo</p>
                </div>

                <div className="flex gap-x-5">
                  <label className="font-bold">Nome da Clínica: </label>
                  <p id="nomeClinica">Nome da Clínica</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-x-16 mt-5">
                <div className="flex gap-x-5">
                  <label className="font-bold">E-mail: </label>
                  <p id="nomeClinica">E-mail</p>
                </div>
              </div>
            </div>

            <span className="w-full border bg-evolutiLightGreen rounded-3xl mt-5 mb-5"></span>

            <div className="flex w-full h-full justify-center items-center">
              <form action="" method="POST">
                <div className="flex flex-wrap flex-col w-full gap-y-5">
                  <div className="flex w-full gap-x-5 h-fit justify-between">
                    <div>
                      <label className="font-bold" htmlFor="dtNascClinica">
                        Data de nascimento
                      </label>
                      <input
                        type="date"
                        name="nasc"
                        id="dtNascClinica"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>

                    <div>
                      <label
                        className="font-bold"
                        htmlFor="cadastroGeneroClinica"
                      >
                        Gênero
                      </label>
                      <select
                        id="cadastroGeneroClinica"
                        name="genero"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      >
                        <option defaultValue="">Selecione o gênero</option>
                        <option value="1">Masculino</option>
                        <option value="2">Feminino</option>
                        <option value="3">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold" htmlFor="telefoneClinica">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="telefone"
                        id="telefoneClinica"
                        placeholder="(00) 0000-0000"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label className="font-bold" htmlFor="cadastroRGClinica">
                        RG
                      </label>
                      <input
                        type="text"
                        name="rg"
                        id="cadastroRGClinica"
                        placeholder="Digite o RG"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>

                    <div className="w-full">
                      <label className="font-bold" htmlFor="cadastroCPFClinica">
                        CPF
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        id="cadastroCPFClinica"
                        placeholder="Digite o CPF"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label
                        className="font-bold"
                        htmlFor="cadastroCNPJClinica"
                      >
                        CNPJ da clínica
                      </label>
                      <input
                        type="text"
                        name="cnpj"
                        id="cadastroCNPJClinica"
                        placeholder="Digite CNPJ"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-[calc(100%)]"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="font-bold"
                        htmlFor="cadastroEmailClinica"
                      >
                        E-mail da clínica
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="cadastroEmailClinica"
                        placeholder="Digite o E-mail"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-[calc(100%)]"
                      />
                    </div>
                  </div>

                  <div className="flex w-full h-fit justify-center items-center">
                    <input
                      type="submit"
                      name="botaoCadastroClinica"
                      id="btnCadastroClinica"
                      value="Cadastrar"
                      className="rounded-md bg-evolutiLightGreen py-3 px-5 my-2 w-auto font-bold"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
