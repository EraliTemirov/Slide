import { useEffect } from "react";
import mainApiInstance from "./mainApiInstance";
import { useParams } from "react-router-dom";

export default function DetailMore() {
    const { id } = useParams();
    console.log("salom", id)

  const fetchData = async (id: string ): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`);
      const data = response.data.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(String (id)); 
  }, [id]);

  return <div>
    salom
  </div>;
}