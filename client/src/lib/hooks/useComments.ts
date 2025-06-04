import {useLocalObservable} from "mobx-react-lite";
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {toast} from "react-toastify";
import {useEffect, useRef} from "react";
import {observable, runInAction} from "mobx";

export const useComments = (activityId?: string) => {
    const created = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: observable.array<ChatComment>([]),
        hubConnection: null as HubConnection | null,

        createHubConnection(activityId: string) {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_COMMENT_URL}?activityId=${activityId}`, {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

            this.hubConnection.start().catch(error => {
                console.log("Error while establishing connection: ", error.toString());
                toast.error("Error while establishing connection");
            });
            this.hubConnection.on("LoadComments", comments => {
                    runInAction(() => {
                        this.comments.replace(comments);
                    })
                }
            );
            this.hubConnection.on("ReceiveComment", comment => {
                runInAction(() => {
                    this.comments.unshift(comment);
                })
            })

        },

        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error => {
                    console.log("Error while stopping connection: ", error.toString());
                    toast.error("Error while stopping connection");
                });
            }
        }
    }));

    useEffect(() => {
        if (activityId && !created.current) {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }
        return () => {
            commentStore.stopHubConnection()
            commentStore.comments.clear();
        }
    }, [activityId, commentStore]);

    return {
        commentStore,
    }
}