import Swal from 'sweetalert2';
import employApi from '../api/employApi';


export const uploadFile = async (file: File): Promise<number | undefined> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { status } = await employApi.post("/auth/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(status);
    if (status === 200){
      return status;
    }
  } catch (error) {
    Swal.fire("El formato debe ser PDF");
  }

}

export const downloadFile = async (name: string) => {
  try {
    await employApi.get('/auth/download/' + name);
  } catch (error) {
    Swal.fire("Error", "Curriculum no encontrado", "error");
  }
}