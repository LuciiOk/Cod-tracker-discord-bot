module.exports = args => (
    {method: 'GET',
    url: `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${args[0].replace('#', '%23')}/battle`,
    headers: {
    'x-rapidapi-host': process.env.HOST,
    'x-rapidapi-key': process.env.KEY
    }}
);