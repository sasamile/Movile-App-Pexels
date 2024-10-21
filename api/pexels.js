import axios from "axios";

export const GetImages = async (searchTem = "4k") =>
  await axios.get(`https://api.pexels.com/v1/search?query=${searchTem}`, {
    headers: {
      Authorization: "5hJaGveD2BWSZibD2L899eFiUa4caqTihTv4EKeUsvjX8KfN2jf92gCP",
    },
  });
