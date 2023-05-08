import { useState } from "react";
import { PaginationObjType, RepoType } from "../Types";
import useApiService from "./useApiService";

const createPaginationObj = (total_count: number, page: number) => {
    const upToThousandRepos = total_count > 1000 ? 1000 : total_count;
    const lastPage = Math.ceil(upToThousandRepos / 30);
    const currentPage = page;
    return { currentPage, lastPage };
};

const useRepos = () => {
    const [pagination, setPagination] = useState<PaginationObjType>();
    const page: number = 1;
    const { getApiRequest, isLoading } = useApiService();

    const getRepos = async(topic: string, sortBy: string, order: string, forPage?: number) : Promise<RepoType[]> => {
        const headers: HeadersInit = { 'accept': 'application/vnd.github+json' };
        let url = `${process.env.REACT_APP_API_BASE_URL}/search/repositories?q=${topic}&sort=${sortBy}&order=${order}`;
        if (forPage) {
            url += `&page=${forPage}`;
        }
        const response = await getApiRequest(url, headers);
        setPagination(createPaginationObj(response.total_count, forPage ? forPage : page))

        return response.items;
    };

    const getOwnersRepo = async(owner: string, name: string) => {
        const headers: HeadersInit = { 'accept': 'application/vnd.github+json' };
        const url = `${process.env.REACT_APP_API_BASE_URL}/repos/${owner}/${name}`;
        return await getApiRequest(url, headers);
    };

    return { getRepos, getOwnersRepo, isLoading, pagination }
};

export default useRepos;