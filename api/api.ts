// const serverIp: string = 'http://10.0.2.2:4000/';
const serverIp: string = 'http://192.168.1.39:4000';

//-------- utility functions --------------
interface HttpResponse<T> extends Response{
  parsedBody? : T;
}

export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  // const response : HttpResponse<T> = await fetch(request);
  const chain = fetch(request).catch(_e => Promise.reject("no internet!")

  
  // try{
  //   const response : HttpResponse<T> = await fetch(request);
  //   try{
  //     response.parsedBody = await response.json();
  //     if(!response.ok){
  //       return new Error(response.parsedBody);
  //     }
  //     return response;
  //   }catch(err){
  //     return err;
  //   }
  // }
  // catch(err){
  //   // console.log(err);
  //   throw err;
  // }
}

export async function register(firstName: string, lastName: string,
  email: string, password:string) {
  return await http(new Request(
    serverIp + "/users",
    {
      method: "post",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    }
  ))
}

export async function login(email: string, password:string) {
  try {
    const response =  await http<{message: string}>(new Request(
      serverIp + "/login",
      {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    ));
  } catch (error) {
    throw error;
  }
}

export async function apiCall() {
  try {
    await login("kareem", "ali");
  } catch (error) {
    throw error; 
  }
}


export async function test() {
  const p = setTimeout(() => Promise.resolve(1), 2000);
}