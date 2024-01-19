import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LocationForm from "../../components/forms/create-locations";
import DirectoryForm from "../../components/forms/create-directory";

const CreateDirectory = () => {
    const navigate = useNavigate();

    const { refineCore: {onFinish, formLoading}, setValue, register, handleSubmit, watch } = useForm({
      refineCoreProps: {
        successNotification: () => {
          return {
            message: `Perfil creado con éxito`,
            description: "¡Listo!",
            type: "success",
          };
        },
        errorNotification: () => {
          return {
            message: 'Hubo un error al crear el perfil',
            description: 'Error',
            type: "error",
          }
        }
      },
    });

    // Images
    const [photoList, setPhotoList] = useState<string[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);

    const onFileDrop = (file: File) => {
        const reader = (readFile: File) => new Promise<string>
        ((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        })
        reader(file).then((result:string) => {
            const updatedPhotos = [...photoList, result]
            setPhotoList(updatedPhotos)
            // onPhotoListChange([...photoList]);
            setValue('photos', photoList)
        });

        const newFile = file;
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    };
    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);

        // Remove from photoList
        const reader = new FileReader();
        reader.onload = () => {
            const base64Result = reader.result as string;
            const updatedPhotoList = [...photoList];
            const indexToRemove = updatedPhotoList.findIndex((photo) => photo === base64Result);
            if (indexToRemove !== -1) {
                updatedPhotoList.splice(indexToRemove, 1);
                setPhotoList(updatedPhotoList);
                setValue('photos', updatedPhotoList)
            }
        };
        reader.readAsDataURL(file);
    };

    // Finish
    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({ ...data, photos: photoList });
        navigate('/directorios'); 
    }

    return (
        <DirectoryForm
        type = "Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        setValue={setValue}
        fileRemove={fileRemove}
        onFileDrop={onFileDrop}
        fileList={fileList}
        photoList={photoList}
      />
    )
}

export default CreateDirectory