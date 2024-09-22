import  PrometeoLLM  from './src/prometeo';


(async () => {
    const prometeo = new PrometeoLLM();
    const result = await prometeo.init({
        adapter: 'pdf',
        pdf: {
         url: 'https://web.seducoahuila.gob.mx/biblioweb/upload/el%20principito.pdf',
         query: 'de que trata el cuento?'
     }
    })

    console.log(result)
})()