const urlLogin = 'https://farmnext.com.br/login';

async function fetchApiLogin(email, password) {
  try {
    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const responsejson = await response.json();
    console.log('apiConect:', responsejson);
    //console.log(response);
    return responsejson;
  } catch (err) {
    console.error(err);
  }
}

export default fetchApiLogin;
