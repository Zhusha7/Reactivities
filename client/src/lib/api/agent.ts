import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const agent: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

agent.interceptors.request.use((config) => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(
    async (response) => {
        if (import.meta.env.DEV) await sleep(1000);
        store.uiStore.isIdle();
        return response;
    },
    async (error) => {
        if (import.meta.env.DEV) await sleep(1000);
        store.uiStore.isIdle();
        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error("unauthorised");
                break;
            case 404:
                await router.navigate("/not-found");
                break;
            case 500:
                await router.navigate("/server-error", {state: {error: data}});
                break;
            default:
                toast.error("something went wrong");
                break;
        }

        return Promise.reject(error);
    }
);

export default agent;
