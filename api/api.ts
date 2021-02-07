// const serverIp: string = 'http://10.0.2.2:4000/';
const serverIp: string = 'http://192.168.1.39:4000';

let accessToken : string = "";

//-------- utility functions --------------
interface HttpResponse<T> extends Response{
  parsedBody? : T;
}

export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    request
  );
  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {
    throw new Error("bad data");
  }

  if (!response.ok && response.parsedBody) {
    throw new Error(response.parsedBody.message);
  }
  return response;
}

export async function httpRegister(firstName: string, lastName: string,
  email: string, password:string) {
  const response = await http<{message: string}>(new Request(
    serverIp + "/users",
    {
      method: "post",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    }
  ));
  return response;
}

export async function httpLogin(email: string, password:string) {
  const req = new Request(serverIp + "/login",
    {
      method: "post",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
  });
  const response =  await http<{message: string, accessToken: string, refreshToken: string}>(req);
  return response;
}