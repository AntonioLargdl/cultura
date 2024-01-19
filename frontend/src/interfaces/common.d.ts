import { UseFormWatch } from "react-hook-form";

export interface FormLocationProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    setValue: UseFormSetValue<FieldValues>;
    fileRemove: (file: File) => void;
    onFileDrop: (file: File) => void;
    fileList: File[];
    photoList: String[];
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    userImage: { name: string, url: string },
    setValue: UseFormSetValue<FieldValues>;
}

export interface FormEditProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormSetValue<FieldValues>;
}

// Usuarios
export interface UsuarioProps {
    username: string;
    email: string;
    password: string; 
    image: string;
    rol: string;
}

export interface UsuarioFetchProps {
    _id: string;
    createdAt: string;
    username: string;
    email: string;
    password: string; 
    image: string;
}

export interface UsersData {
    users: UsuarioFetchProps[];
}

type IUser = {
    username: string;
    image: string;
    rol: string;
};

export interface GeocoderProps {
    setLocation: Array,
}

export interface AddLocationProps {
    location: Array,
    setLocation: Array,
}

// Locaciones
export interface LocacionesProps {
    name: string,
    category: string,
    phone: string,
    email: string,
    address: string,
    location: {
        latitude: number,
        longitude: number,
    },
    time: string,
    services: string,
    infrastructure: string,
    seasons: string,
    access: string,
    photos: string [],
}
