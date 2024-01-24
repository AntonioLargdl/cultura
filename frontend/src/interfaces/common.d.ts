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
    _id: string;
    name: string;
    category: string;
    phone?: string;
    email?: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    services?: {
        water?: boolean;
        energy?: boolean;
        internet?: boolean;
        tables?: boolean;
        workStations?: boolean;
        screen?: boolean;
        cleaning?: boolean;
        basic?: boolean;
        health?: boolean;
        technic?: boolean;
        copy?: boolean;
        catering?: boolean;
        fridge?: boolean;
    };
    infrastructure?: {
        park?: boolean;
        load?: boolean;
        set?: boolean;
        backlots?: boolean;
        closet?: boolean;
        bath?: boolean;
        office?: boolean;
        security?: boolean;
        signals?: boolean;
        garden?: boolean;
        out?: boolean;
        roof?: boolean;
        pool?: boolean;
        events?: boolean;
    };
    access?: {
        privat?: boolean;
        tin?: boolean;
        rock?: boolean;
        center?: boolean;
        pav?: boolean;
        old?: boolean;
        main?: boolean;
        natural?: boolean;
    };
    photos: string[];
}

