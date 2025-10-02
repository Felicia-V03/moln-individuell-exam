import axios from 'axios';

export const fetchMessage = async () => {
  const response = await axios.get('https://845m84g828.execute-api.eu-north-1.amazonaws.com/api/messages')
    .then(response => { return response; })
    .catch(error => { return error; });

  if(response.status === 200) {
    return response.data.messages || [];
  } else {
    return [];
  }
}

export const postMessage = async (data, token) => {
  const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  const response = await axios.post('https://845m84g828.execute-api.eu-north-1.amazonaws.com/api/messages', data, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json"
    }
  })
  .then(response => { return response; })
  .catch(error => { return error; });

  console.log(data, token);
  if(response.status === 200) {
    return response;
  } else {
    return [];
  }
}