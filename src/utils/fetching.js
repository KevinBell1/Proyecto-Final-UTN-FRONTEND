const getAuthenticateHeaders = () => {
    const access_token = sessionStorage.getItem('access_token');
    if (!access_token) {
        throw new Error('No se encontró un token válido en el almacenamiento.');
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
    };
};
export default getAuthenticateHeaders