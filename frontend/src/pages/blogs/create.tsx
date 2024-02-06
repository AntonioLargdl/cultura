import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@refinedev/core";
import BlogForm from "../../components/forms/create-blog";

const CreateBlog = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const [userImage, setUserImage] = useState({ name: '', url: ''})

    const { refineCore: {onFinish, formLoading}, setValue, register, handleSubmit } = useForm({
      refineCoreProps: {
        successNotification: () => {
          return {
            message: `Blog creado con éxito`,
            description: "¡Listo!",
            type: "success",
          };
        },
        errorNotification: () => {
          return {
            message: 'Error al crear el blog',
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
        navigate('/blog'); 
      }

    return (
        <BlogForm
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

export default CreateBlog