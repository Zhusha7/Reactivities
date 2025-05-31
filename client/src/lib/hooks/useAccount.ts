import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { LoginSchema } from "../schemas/loginSchema";
import { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            navigate(location.state?.from?.pathname || "/");
        },
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post("/account/register", creds);
        },
        onSuccess: () => {
            toast.success("Register successful - you can login now");
            navigate("/login");
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post("/account/logout");
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["user"] });
            const prevUser = queryClient.getQueryData<User>(["user"]);
            queryClient.removeQueries({ queryKey: ["user"] });
            queryClient.removeQueries({ queryKey: ["activities"] });
            queryClient.removeQueries({ queryKey: ["activity"] });
            navigate("/");
            return { prevUser };
        },
        onError: (error, _, context) => {
            console.log(error);
            toast.error("Logout failed - please try again later.");
            if (context?.prevUser) {
                queryClient.setQueryData(["user"], context.prevUser);
            }
        }
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await agent.get<User>("/account/user-info");
            return response.data;
        },
        enabled: !queryClient.getQueryData(["user"]),
    });

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
    };
};
