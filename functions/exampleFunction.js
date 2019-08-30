export async function main(event) {
  return new Promise(async (resolve, reject) => {
    const data = event.queryStringParameters;

    console.info('Event Received: ', data);

    // check to make sure the data array has values
    if (!data) {
      console.error('No data to work with!');
      return resolve({
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ error: 'no data to work with' })
      });
    }

    try {
      const splitString = data.word.split("")
      const reverseArray = splitString.reverse()
      const backwardString = reverseArray.join("");

      return resolve({
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ backwardString })
      });
    } catch (error) {
      console.error('probably not a valid string');
      return resolve({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ error })
      });
    }
  });
}
