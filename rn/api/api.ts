import { cos } from "react-native-reanimated";
import { AuthStack } from "../stacks/authStack/AuthStack";

// const serverIp: string = 'http://10.0.2.2:4000/';
const serverIp: string = 'http://192.168.1.38:4000';

//-------- utility functions --------------
interface HttpResponse<T> extends Response{
  parsedBody? : T;
}

export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  // const fetchResponse = fetch(request)
  // .catch(e => {throw e})
  // .then((response : HttpResponse<T> )=> 
  //   response.json()
  //   .catch(e => {throw e})
  //   .then(parsedBody => { 
  //     response.parsedBody = parsedBody;
  //     if(!response.ok){
  //       throw new Error(response.parsedBody);
  //       return response;
  //     }
  //   }))
  try {
    const response: HttpResponse<T> = await fetch(request);
    const parsedBody = await response.json()
    response.parsedBody = parsedBody;
    if (!response.ok && response.parsedBody) {
        throw new Error(response.parsedBody.message);
    }
    return response;
  }
  catch (error) {
    throw error; 
  }
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

export async function httpLogout(refreshToken: string) {
  const req = new Request(serverIp + "/logout",
    {
      method: "delete",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
  });
  return await http<{}>(req);
}


export async function httpToken(refreshToken: string) {
  const req = new Request(serverIp + "/token",
    {
      method: "post",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
  });
  const response =  await http<{message: string, accessToken: string, refreshToken: string}>(req);
  return response;
}