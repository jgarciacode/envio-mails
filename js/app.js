document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    console.log(email)

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#CC');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');


    // Asignar eventos
    inputEmail.addEventListener('blur', validar)            // Blur, reaccion al salir de un campo
    //inputEmail.addEventListener('input', function() {     // Input, reaccion al escribir en un campo
    inputAsunto.addEventListener('blur', validar)
    inputCC.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar) 

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        
        //Reinicio del objeto
        resetFormulario();

    }) 

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(()=> {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')
            resetFormulario();
            // Creamos alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase' )
            alertaExito.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000)
    }


        function validar(e){
            if(e.target.value.trim()  === '' && e.target.id !== 'CC' ) {
                mostrarAlerta(`El campo ${e.target.id} es un campo obligatorio`, e.target.parentElement);
                email[e.target.name] = ''
                comprobarEmail();
                return;
            }

            if(e.target.id === 'email' &&  !validarEmail(e.target.value)) {
                mostrarAlerta('El email no es válido', e.target.parentElement)
                email[e.target.name] = ''
                comprobarEmail();
                return
            }

            if(e.target.id === 'CC' &&  !validarEmail(e.target.value)) {
                mostrarAlerta('El email no es válido', e.target.parentElement)
                email[e.target.name] = ''
                comprobarEmail();
                return
            }

            limpiarAlerta(e.target.parentElement)

            //Asignar valores al objeto si han pasado validación
            email[e.target.name] = e.target.value.trim().toLowerCase()

            //Comprobar el objeto rellenado de email
            comprobarEmail()
        }


        function mostrarAlerta(mensaje, referencia) {
            const alerta = referencia.querySelector('.bg-red-600')
            if (alerta) {
                alerta.remove()
            }
            console.log(alerta)
            

            //Generamos una alerta en HTML
            const error = document.createElement('P');
            error.textContent = mensaje
            error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

            // Inyectamos el error en el formulario
            referencia.appendChild(error) //Añadimos un nuevo elemento al existente
        }

        function limpiarAlerta(referencia){
            // Comprueba si ya existe una alerta
            const alerta = referencia.querySelector('.bg-red-600')
            if (alerta) {
                alerta.remove();
            }
        }

        function validarEmail(email){
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
            const resultado = regex.test(email)
            return resultado;
        }

        function comprobarEmail() {
            if(Object.values(email).includes('')) {
                    btnEnviar.classList.add('opacity-50');
                    btnEnviar.disabled = true
                    return
            }
                btnEnviar.classList.remove('opacity-50');
                btnEnviar.disabled = false
        }


        function resetFormulario() {
            email.email = ''
            email.asunto = ''
            email.mensaje = ''
    
            formulario.reset();
            comprobarEmail();
        }

        function validarCC() {

        }
    });