const formNewHero = document.getElementById('form-new-hero');

formNewHero.addEventListener('submit', (e) => createNewHero(e));

function createNewHero(e){
    e.preventDefault();
    
    const data = {
        'username': formNewHero[0].value,
        'classe': formNewHero[1].value
    }

    localStorage.setItem('user', JSON.stringify({
        'name': 'teste',
        'email': 'teste@email.com'
    }))
    localStorage.setItem('hero', JSON.stringify(data));
    

    window.location.replace('src/pages/dashboard.html');
}