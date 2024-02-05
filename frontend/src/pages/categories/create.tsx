import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoriaForm from "../../components/forms/create-categoria";

const CreateCategoria = () => {
    const navigate = useNavigate();

    const { refineCore: {onFinish, formLoading}, setValue, register, handleSubmit, control } = useForm({
      refineCoreProps: {
        successNotification: () => {
          return {
            message: `Categoría creada con éxito`,
            description: "¡Listo!",
            type: "success",
          };
        },
        errorNotification: () => {
          return {
            message: 'La categoría ya existe',
            description: 'Error',
            type: "error",
          }
        }
      },
    });

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({ ...data });
        navigate('/categorias'); 
      }

    return (
        <CategoriaForm
        type = "Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        setValue={setValue}
      />
    )
}

export default CreateCategoria