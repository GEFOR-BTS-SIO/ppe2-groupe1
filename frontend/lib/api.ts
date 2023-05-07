import axios from "axios";

export const useApi = () => {
  const userToken =
    typeof localStorage !== "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODMzMjQ1MTksImV4cCI6MTY4MzMyODExOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiMUAxLmZyIn0.iGF_UMQ4Uo4N6uYFUmwVzGvH5sYmZ3U-LVM2MfGbJStxI9Mzf8sALor2-AD9D835ZPAtwAcBlT7HgLxf6EHfGwjDl_CdFhN22_YwqhhwjRmd2YcMkW1sTAIOov7OH6Qq9w2w4epj2PP7QlX-4jN_7a_EBU3qaJila0bXHAxTSI9Za7MRbQkkp1JFmw65tslLXuuVSUa3qtqj1vVQNDjUmK-FMeTdaXDsokopBzgyL4GT99rbs9V-8tW5m9USEbisrha-CJI0MRVOc-yigCZVlgTaCe-uslvkMMQomAOiaW6AsunsmY158EZ7Ds6thJLsSO8kJ-hrJT6I4PC6xlSTWA"
 ? localStorage.getItem("token") : "";

  const get = async <T>(url: string): Promise<T> => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  };

  const post = async <T>(url: string, body: any): Promise<T> => {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  };

  return { get, post };
};
