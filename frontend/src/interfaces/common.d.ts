import { Control, FieldValue, FieldValues, UseFormWatch } from "react-hook-form";

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


interface Semblanza {
    es: string;
    en: string;
    fr: string;
  }
  
interface Services {
    script: boolean;
    rights: boolean;
    translators: boolean;
    creative: boolean;
    casting: boolean;
    academies: boolean;
    actors: boolean;
    voice: boolean;
    models: boolean;
    production: boolean;
    direction: boolean;
    photography: boolean;
    design: boolean;
    makeup: boolean;
    technicalServices: boolean;
    productionHouses: boolean;
    catering: boolean;
    studios: boolean;
    insurance: boolean;
    locations: boolean;
    generalServices: boolean;
    postProduction: boolean;
    visualEffects: boolean;
    labs: boolean;
    sound: boolean;
    advertising: boolean;
    distribution: boolean;
    }
  
export interface DirectorioProps {
    _id: string;
    type: string;
    name: string;
    photos: string[];
    semblanza: Semblanza;
    services: Services;
    age: string;
    height: string;
    weight: string;
    phone: string;
    email: string;
    youtube: string;
    linkedin: string;
    web: string;
    fb: string;
    ig: string;
    tiktok?: string;
}

// Cartelera
export interface FormCarteleraProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    userImage: { name: string, url: string },
    setValue: UseFormSetValue<FieldValues>,
    control: Control<FieldValues>;
}

export interface CarteleraProps {
    _id: string,
    date: string,
    begin: string,
    end: string,
    image: string,
    name: string,
    location: string,
}

// Portafolio

export interface FormPortafolioProps {
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

interface SemblanzaPortfolio {
    es: string;
    en: string;
    fr: string;
}

interface Cv {
    es: string;
    en: string;
    fr: string;
}

interface Social {
    ig?: string;
    fb?: string;
    tiktok?: string;
    youtube?: string;
    pdf?: string;
    web?: string;
    spotify?: string;
    apple?: string;
    amazon?: string;
}

export interface PortafolioProps {
    name: string;
    type: string;
    gender: string;
    semblanza: SemblanzaPortfolio;
    cv: Cv;
    phone?: string;
    email?: string;
    video?: string;
    social?: Social;
    photos?: string[];
}
