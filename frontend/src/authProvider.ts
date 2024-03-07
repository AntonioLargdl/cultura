import { AuthBindings } from "@refinedev/core";
import { notification } from "antd";
import axios from "axios";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  forgotPassword: async ({ email }) => {    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/usuarios/forgot-password', { email });
      if (response.data.success) {
        notification.success({
            message: "Recuperar Contraseña",
            description: `Las instrucciones para recuperar la contraseña han sido enviadas a "${email}"`,
        });
        return { success: true };
      } else {
        return { success: false, error: { name: "Error en el Correo", message: "El correo que ingreso no es válido o no está registrado", },}
      }
    } catch (error) {
      notification.error({
        message: "Error en el servidor",
        description: `Intentelo de nuevo más tarde`,
      });
      return { success: false, error: { name: "Error", message: "Error en el servidor", },
      };
    }
  },
  updatePassword: async ({ password, id, token }) => {
    try{
      const response = await axios.post('http://localhost:8080/api/v1/usuarios/update-password', { password, id, token });
      if(response) {
        notification.success({
          message: "Nueva contraseña",
          description: `Tú contraseña ha sido actualizada con éxito, inicia sesión`,
        });
        return { success: true, redirectTo: "/login" };
      } else {
        return { success: false, error: { name: "Error ", message: "No se pudo realizar el cambio de contraseña, solicítelo de nuevo", },}
      }
    } catch (error) {
      notification.error({
        message: "Error en el servidor",
        description: `Intentelo de nuevo más tarde`,
      });
      return { success: false, error: { name: "Error", message: "Error en el servidor", },
      };
    }
  },
  login: async ({ access, password }) => {
    try {
      // Make API call to backend to login
      const response = await axios.post('http://localhost:8080/api/v1/usuarios/login', { access, password });
      // Check if login is successful
      if (response.data.success) {
        // Save user data in local storage
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        // Save user collection data in local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Return success with redirect URL
        return {
          success: true,
          redirectTo: "/",
        };
      } else {
        // Handle unsuccessful login
        return {
          success: false,
          error: { name: "LoginError", message: "Invalid username or password",},
        };
      }
    } catch (error) {
      // Handle error in API call
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Error in server",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem('user');
    if (token) {
      const user = JSON.parse(token);
      return {
        username: user.username,
        image: user.image,
        rol: user.rol
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
