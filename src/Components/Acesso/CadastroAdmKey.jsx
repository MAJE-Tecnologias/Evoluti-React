export default function CadastroAdmKey() {
  return (
    <>
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center px-24">
        <section className="bg-white h-full w-full rounded-3xl flex items-center justify-center   ">
          <div className="w-full h-full rounded-3xl p-10 flex flex-col items-center">
            <img src="src/assets/Logo_Sem_fundo.png" alt="" className="w-1/6" />

            <div>
              <div>
                <div>
                  <label for="nomeCompleto">Nome Completo: </label>
                  <p id="nomeCompleto">Nome Completo</p>
                </div>

                <div class="label1">
                  <label for="nomeClinica">Nome da Clínica: </label>
                  <p id="nomeClinica">Nome da Clínica</p>
                </div>
              </div>

              <div class="superiorRow">
                <div class="label1">
                  <label for="nomeClinica">E-mail: </label>
                  <p id="nomeClinica">E-mail</p>
                </div>
              </div>
            </div>

        <span></span>

          </div>
        </section>
      </main>
    </>
  );
}
