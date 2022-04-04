const FetchAPI = async (url: string, param: {headers:{},method:string}, setData:Function) => {
  try {
    const response = await fetch(url, param);
    if (response.status !== 200) {
      throw new Error("Something went wrong.");
    }
    const data = await response.json();
    setData(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default FetchAPI;
