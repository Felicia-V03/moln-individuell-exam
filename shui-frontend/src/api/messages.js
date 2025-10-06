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
};

// Hämta meddelande via id
export const fetchMessageById = async (id) => {
  try {
    const response = await axios.get(
      `https://845m84g828.execute-api.eu-north-1.amazonaws.com/api/messages/${id}`
    );

    console.log("Raw API response:", response.data);

    if (response.status === 200) {
      // Returnera själva objektet direkt
      return response.data || null;
    } else {
      console.error("Fel statuskod:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Fel vid hämtning av meddelande:", error);
    return null;
  }
};

// Uppdatera meddelande
export const updateMessage = async (id, data, token) => {
  const authHeader = token;

  const response = await axios.put('https://845m84g828.execute-api.eu-north-1.amazonaws.com/api/messages/' + id, data, {
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
};

// Ta bort meddelande
export const deleteMessage = async (id, token) => {
  const authHeader = token;

  const response = await axios.delete('https://845m84g828.execute-api.eu-north-1.amazonaws.com/api/messages/' + id, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json"
    }
  })
  .then(response => { return response; })
  .catch(error => { return error; });

  if(response.status === 200) {
    return response.data.messages || [];
  } else {
    return [];
  }
};