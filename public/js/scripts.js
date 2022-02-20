if(document.forms.deletarForm){
    document.querySelectorAll('form[name="deletarForm"]').forEach(i=>{
        i.addEventListener('click', (e)=>{
            const confirm = window.confirm("Tem certeza da exclusão?");
            if(!confirm){
                e.preventDefault();
            }
        })
    })
}
