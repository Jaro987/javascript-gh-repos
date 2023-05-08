import { useState } from "react";
import { RepoType } from "../Types";

const useApiService = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const request = async (
        url: string,
        method: string,
        headers: HeadersInit
    ) => {
        setIsLoading(true);
        alert(url)
        const response = await fetch(url, {
            method: method,
            headers: headers,
        });
        
        const resBody = await response.json();
        
        setIsLoading(false);
        return resBody;
        
        
    };

    type GetResponsesType = {
        total_count: number;
        incomplete_results: boolean;
        items: RepoType[];
    }
    
    const getApiRequest = async (
        url: string,
        headers: HeadersInit
        ) => {

        return await request(url, 'GET', headers);
    };

    return { getApiRequest, isLoading }
}

export default useApiService;