import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@refinedev/core";
import UserForm from "../../components/forms/create-users";

const CreateUsers = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const [userImage, setUserImage] = useState({ name: '', url: ''})

    const { refineCore: {onFinish, formLoading}, setValue, register, handleSubmit } = useForm({
      refineCoreProps: {
        successNotification: () => {
          return {
            message: `Usuario creado con éxito`,
            description: "¡Listo!",
            type: "success",
          };
        },
        errorNotification: () => {
          return {
            message: 'El usuario o correo ya existe',
            description: 'Error',
            type: "error",
          }
        }
      },
    });

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) => new Promise<string>
        ((resolve,reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.readAsDataURL(readFile);
        })
        reader(file).then((result:string) => setUserImage({name:file?.name, url:result }));
    }; 

    const onFinishHandler = async (data: FieldValues) => {
        if(!userImage.name) return alert(translate("forms.createUsers.alert","Por favor selecciona una imagen"))
        await onFinish({ ...data, photo: userImage.url });
        navigate('/usuarios'); 
      }

    return (
        <UserForm
        type = "Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        userImage={userImage}
        setValue={setValue}
      />
    )
}

export default CreateUsers